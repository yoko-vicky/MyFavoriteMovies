import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { MovieDetail } from '@/components/movies/MovieDetail';
import { getMovieById } from '@/lib/tmdb';
import { errorToastify } from '@/lib/toast';
import { useMoviesContext } from '@/store/MoviesContext';
import { MovieState } from '@/types/movies';
import { logger } from '@/utils/logger';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { allMovies } = useMoviesContext();
  const [movie, setMovie] = useState<MovieState | null>(null);
  const requestedOnce = useRef<boolean>(false);

  const getTargetMovie = async (id: number) => {
    try {
      const res = await getMovieById(id);

      if (res) {
        setMovie(res);
      }
    } catch (error) {
      logger.log({ error });
      errorToastify();
    }
  };

  useEffect(() => {
    if (movie || requestedOnce.current) return;

    const mov = allMovies.find((mv) => mv.id === +id);
    if (mov) {
      setMovie(mov);
      return;
    }

    if (!requestedOnce.current) {
      getTargetMovie(+id);
      requestedOnce.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies, id, movie, requestedOnce.current]);

  logger.log({ requestedOnce: requestedOnce.current });

  if (!movie) {
    // redirect('/404');
    console.log('Movie not found');
  }

  logger.log({ movie });
  return <div>{movie && <MovieDetail movie={movie} />}</div>;
};

export default MovieDetailPage;
