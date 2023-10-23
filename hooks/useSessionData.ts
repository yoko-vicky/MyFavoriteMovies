/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';

const useSessionData = () => {
  const { data: originSessionData, update } = useSession();
  const getSessionTimer = useRef<any>(null);
  const [sessionData, setSessionData] = useState<Session | null>(null);

  const sessionUserMovies = sessionData?.user.userMovies;

  const updateSession = async (data?: any) => {
    try {
      const newSession = await update(data);
      if (newSession) {
        logger.log('update Session', { newSession });
        setSessionData({ ...newSession });
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const getNewSessionToUpdateUserData = async () => {
    try {
      const session = await getSession();
      if (session) {
        // logger.log('GET new Session', { session });
        setSessionData(session);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const getTargetUserMovie = (movieId: number) =>
    sessionUserMovies?.find((um) => um.movieId === movieId);

  useEffect(() => {
    if (!originSessionData) return;
    setSessionData(originSessionData);
  }, [originSessionData]);

  useEffect(() => {
    if (!originSessionData) {
      return;
    }

    getSessionTimer.current = setTimeout(() => {
      getNewSessionToUpdateUserData();
    }, 3000);

    () => clearTimeout(getSessionTimer.current);
  }, [originSessionData]);

  useEffect(() => {
    if (sessionData || !originSessionData) return;
    setSessionData(originSessionData);
  }, [originSessionData, sessionData]);

  return {
    sessionData,
    updateSession,
    getNewSessionToUpdateUserData,
    sessionUserMovies,
    getTargetUserMovie,
  };
};

export default useSessionData;
