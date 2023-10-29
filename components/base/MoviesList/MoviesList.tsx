import React from 'react';
import uuid from '@/lib/uuid';
import { MovieState } from '@/types/movies';
// import { logger } from '@/utils/logger';
import styles from './MoviesList.module.scss';
import { MoviesListItem } from '../MoviesListItem';
import { SubTitle } from '../SubTitle';

export const MoviesList = ({
  movies,
  title,
}: {
  movies: MovieState[];
  title?: string;
}) => {
  // logger.log({ movies });
  return (
    <div className={styles.container}>
      {!!title && <SubTitle title={title} tag={'div'} />}
      <div className={styles.movies}>
        {movies.map((movie) => (
          <MoviesListItem key={uuid()} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
