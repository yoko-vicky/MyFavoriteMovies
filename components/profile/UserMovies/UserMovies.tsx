import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import styles from './UserMovies.module.scss';

export const UserMovies = () => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {/* watched:false */}
        <div className={styles.title}>Yoko&apos;s List</div>
        <MoviesList />
      </div>
      <div className={styles.list}>
        {/* watched:true */}
        <div className={styles.title}>Yoko&apos;s Watched Movies</div>
        <MoviesList />
      </div>
    </div>
  );
};

export default UserMovies;
