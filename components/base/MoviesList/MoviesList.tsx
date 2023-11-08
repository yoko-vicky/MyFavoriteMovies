import React from 'react';
import uuid from '@/lib/uuid';
// import { logger } from '@/utils/logger';
import { MovieState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import styles from './MoviesList.module.scss';
import { MoviesListItem } from '../MoviesListItem';
import { SubTitle } from '../SubTitle';

export const MoviesList = ({
  movies = [],
  title,
  userMovies,
}: {
  movies: MovieState[];
  title?: string;
  userMovies?: UserMovieState[];
}) => {
  // logger.log({ movies });
  return (
    <div className={styles.container}>
      {!!title && <SubTitle title={title} tag={'div'} />}
      <div className={styles.movies}>
        {!!userMovies &&
          userMovies.map((um) => (
            <MoviesListItem key={uuid()} movie={um.movie} userMovie={um} />
          ))}
        {!!movies &&
          !userMovies &&
          movies.map((movie) => (
            <MoviesListItem key={uuid()} movie={movie} userMovie={undefined} />
          ))}
        {!userMovies?.length && !movies.length && (
          <div>No Movies to display.</div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
