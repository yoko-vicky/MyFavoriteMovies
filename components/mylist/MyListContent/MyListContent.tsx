import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserListPageContext } from '@/store/UserListPageContext';
import styles from './MyListContent.module.scss';

export const MyListContent = () => {
  const { userMovies } = useUserListPageContext();
  return (
    <div className={styles.container}>
      <MoviesList userMovies={userMovies} />
    </div>
  );
};

export default MyListContent;
