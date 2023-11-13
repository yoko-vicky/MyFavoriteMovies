import React from 'react';
import uuid from '@/lib/uuid';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { MovieState } from '@/types/movies';
import styles from './MoviesList.module.scss';
import { MoviesListItem } from '../MoviesListItem';
import { SubTitle } from '../SubTitle';

export const MoviesList = ({
  movies = [],
  title,
}: {
  movies: MovieState[];
  title?: string;
}) => {
  const { getTargetUserMovie } = useUserSessionDataContext();

  return (
    <div className={styles.container}>
      {!!title && <SubTitle title={title} tag={'div'} />}
      <div className={styles.movies}>
        {!!movies &&
          movies.map((movie) => {
            const targetUserMovie = getTargetUserMovie(movie.id);

            return (
              <MoviesListItem
                key={uuid()}
                movie={movie}
                userMovie={targetUserMovie}
              />
            );
          })}
        {!movies?.length && <div>No Movies to display.</div>}
      </div>
    </div>
  );
};

export default MoviesList;
