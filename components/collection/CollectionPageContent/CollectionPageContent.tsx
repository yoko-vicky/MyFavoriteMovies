import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import { MovieState } from '@/types/movies';
import styles from './CollectionPageContent.module.scss';

export const CollectionPageContent = ({
  movies,
  title,
}: {
  movies: MovieState[];
  title: string;
}) => {
  return (
    <div className={styles.container}>
      <div>
        {title && <h2 className={styles.title}>{title}</h2>}
        <MoviesList movies={movies} />
      </div>
    </div>
  );
};

export default CollectionPageContent;
