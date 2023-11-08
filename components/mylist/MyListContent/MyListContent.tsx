import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/base/Button';
import { MoviesList } from '@/components/base/MoviesList';
import { useUserListPageContext } from '@/store/UserListPageContext';
import { AiFillCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import styles from './MyListContent.module.scss';
import { Filter } from '../Filter';

export const MyListContent = () => {
  const { userMovieMovies, userMovies } = useUserListPageContext();
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Movie&apos;s List</h2>
      <Button
        variant={'simple'}
        label={showFilter ? 'Hide Filter' : 'Show Filter'}
        className={clsx(styles.button, showFilter ? '' : styles.hide)}
        onClick={() => setShowFilter((prev) => !prev)}
        Icon={showFilter ? AiFillCaretUp : AiOutlineCaretDown}
        iconSize="sm"
      />
      {showFilter && <Filter />}
      <MoviesList movies={userMovieMovies} userMovies={userMovies} />
    </div>
  );
};

export default MyListContent;
