/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { UserMovieState, UserState } from '@/types/user';
import { logger } from '@/utils/logger';

// import { logger } from '@/utils/logger';

interface UserSessionDataContextType {
  sessionData: Session | null;
  updateSession: (data?: any) => void;
  getNewSessionToUpdateUserData: () => void;
  sessionUserMovies: UserMovieState[] | undefined;
  sessionUser: UserState | undefined;
}

const UserSessionDataContext = createContext<UserSessionDataContextType>({
  sessionData: null,
  updateSession: () => undefined,
  getNewSessionToUpdateUserData: () => undefined,
  sessionUserMovies: undefined,
  sessionUser: undefined,
});

export const UserSessionDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: originSessionData, update } = useSession();
  const getSessionTimer = useRef<any>(null);
  const [sessionData, setSessionData] = useState<Session | null>(null);

  const sessionUser: UserState | undefined = sessionData?.user;
  const sessionUserMovies: UserMovieState[] | undefined =
    sessionUser?.userMovies?.filter((um) => um.watched || um.listed);

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

  const context: UserSessionDataContextType = {
    sessionData,
    updateSession,
    getNewSessionToUpdateUserData,
    sessionUserMovies,
    sessionUser,
  };

  // logger.log({ heroMovie, allMovies });

  return (
    <UserSessionDataContext.Provider value={context}>
      {children}
    </UserSessionDataContext.Provider>
  );
};

export default UserSessionDataContext;
export const useUserSessionDataContext = () =>
  useContext(UserSessionDataContext);
