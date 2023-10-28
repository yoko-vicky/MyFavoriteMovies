import { useEffect, useRef, useState } from 'react';
import { updateUserMovie } from '@/lib/axios';
import { errorToastify } from '@/lib/toast';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { MovieState, UpdateUserMovieState } from '@/types/movies';

import { logger } from '@/utils/logger';

const useUserMovieState = ({
  movie,
  key,
}: {
  movie: MovieState;
  key: 'watched' | 'listed';
}) => {
  const movieId = movie.id;
  const { updateSession, sessionUser, sessionUserMovies } =
    useUserSessionDataContext();

  const targetUserMovie = sessionUserMovies?.find(
    (um) => um.movieId === movieId,
  );
  const [state, setState] = useState<boolean>(false);

  const isUpdatingRef = useRef<boolean>(false);

  const updateState = async (
    state: UpdateUserMovieState,
    signal?: AbortSignal,
  ) => {
    logger.log('Run updateUserMovie', key, state);
    if (!sessionUser) return;

    isUpdatingRef.current = true;

    try {
      const res = await updateUserMovie({
        movieId,
        userId: sessionUser.id,
        state,
        signal,
      });
      logger.log({ res });

      if (res.status === 200) {
        setTimeout(() => {
          updateSession();
        }, 1000);

        setState((prev) => !prev);
      } else {
        errorToastify();
      }
    } catch (error) {
      logger.error(error);
      errorToastify();
    } finally {
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 1000);
    }
  };

  const handleButtonClick = () => {
    const newStateObj = { status: { [key]: !state }, movie };
    updateState(newStateObj);
  };

  useEffect(() => {
    if (!targetUserMovie) return;

    setState(targetUserMovie[key]);
  }, [key, targetUserMovie]);

  useEffect(() => {
    isUpdatingRef.current = false;
  }, []);

  return {
    state,
    updateState,
    isUpdatingRef,
    handleButtonClick,
  };
};

export default useUserMovieState;
