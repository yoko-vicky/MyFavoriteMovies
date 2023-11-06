import React from 'react';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserListPageContext } from '@/store/UserListPageContext';
import styles from './MyListContent.module.scss';

export const MyListContent = () => {
  const { userMovies } = useUserListPageContext();
  return (
    <div className={styles.container}>
      <div>
        <button>unwatched</button>
        <button>watched</button>
        <button>all</button>
      </div>
      <div>
        <select name="" id="">
          <option value="1960">1960</option>
          <option value="1960">1970</option>
          <option value="1960">1980</option>
          <option value="1960">1990</option>
          <option value="1960">2000</option>
        </select>
      </div>
      <MoviesList userMovies={userMovies} />
    </div>
  );
};

export default MyListContent;
