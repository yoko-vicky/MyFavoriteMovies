import { useEffect, useState } from 'react';
import { updateUserMovie } from '@/lib/axios';
import { errorToastify } from '@/lib/toast';
import { useMovieCommonDataContext } from '@/store/MovieCommonDataContext';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import {
  MovieGenreState,
  MovieState,
  UpdateUserMovieState,
} from '@/types/movies';
import { logger } from '@/utils/logger';

const useUserMovieState = ({
  movie,
  key,
}: {
  movie: MovieState;
  key: 'watched' | 'listed';
}) => {
  const movieId = movie.id;
  const { genres: allGenres } = useMovieCommonDataContext();
  const { updateSession, sessionUser, sessionUserMovies } =
    useUserSessionDataContext();

  const targetUserMovie = sessionUserMovies?.find(
    (um) => um.movieId === movieId,
  );

  // logger.log({ targetUserMovie });
  const [state, setState] = useState<boolean>(
    targetUserMovie ? targetUserMovie[key] : false,
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateState = async (
    state: UpdateUserMovieState,
    signal?: AbortSignal,
  ) => {
    logger.log('Run updateUserMovie', key, state);
    if (!sessionUser) return;

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
        setIsUpdating(false);
      }, 1000);
    }
  };

  const handleButtonClick = () => {
    setIsUpdating(true);
    logger.log({
      movieGenreIds: movie.genre_ids,
      genres: movie.genres,
      allGenres,
    });
    const movieWithGenres: MovieState =
      !!movie.genres && !!movie.genres.length
        ? movie
        : {
            ...movie,
            genres: movie.genre_ids.map((id) => {
              const genre = allGenres.find((gen) => gen.id === id);
              return genre;
            }) as MovieGenreState[],
          };
    const newStateObj = { status: { [key]: !state }, movie: movieWithGenres };
    logger.log({ movieWithGenres });
    updateState(newStateObj);
  };

  useEffect(() => {
    if (!targetUserMovie) return;

    setState(targetUserMovie[key]);
  }, [key, targetUserMovie]);

  return {
    state,
    updateState,
    isUpdating,
    handleButtonClick,
  };
};

export default useUserMovieState;
