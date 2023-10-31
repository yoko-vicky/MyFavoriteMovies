import React from 'react';
import uuid from '@/lib/uuid';
// import { logger } from '@/utils/logger';
import { UserMovieState } from '@/types/user';
import styles from './MoviesList.module.scss';
import { MoviesListItem } from '../MoviesListItem';
import { SubTitle } from '../SubTitle';

export const MoviesList = ({
  userMovies,
  title,
}: {
  userMovies: UserMovieState[];
  title?: string;
}) => {
  // logger.log({ movies });
  return (
    <div className={styles.container}>
      {!!title && <SubTitle title={title} tag={'div'} />}
      <div className={styles.movies}>
        {userMovies.map((um) => (
          <MoviesListItem key={uuid()} userMovie={um} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
