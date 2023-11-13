import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import { MovieState } from '@/types/movies';
import { logger } from '@/utils/logger';
import styles from './CollectionPageContent.module.scss';
import Pagenation from '../../base/Pagenation/Pagenation';

interface CollectionPageContentPropsType {
  movies: MovieState[];
  title: string;
  currentPage: number | null;
  totalPages: number | null;
  pathToPage: string;
}

export const CollectionPageContent = ({
  movies,
  title,
  currentPage,
  totalPages,
  pathToPage,
}: CollectionPageContentPropsType) => {
  logger.log({ currentPage, totalPages });
  return (
    <div className={styles.container}>
      <div>
        {title && <h2 className={styles.title}>{title}</h2>}
        <MoviesList movies={movies} />
        {currentPage && totalPages && (
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            pathToPage={pathToPage}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPageContent;
