import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserListPageContext } from '@/store/UserListPageContext';
import styles from './MyListContent.module.scss';
import { Filter } from '../Filter';

export const MyListContent = () => {
  const { userMovieMovies } = useUserListPageContext();
  return (
    <div className={styles.container}>
      <Filter />
      <MoviesList movies={userMovieMovies} />
    </div>
  );
};

export default MyListContent;
