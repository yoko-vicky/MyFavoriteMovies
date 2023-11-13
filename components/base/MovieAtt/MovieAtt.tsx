import React from 'react';
import useUserMovieState from '@/hooks/useUserMovieState';
import { MovieState } from '@/types/movies';
import styles from './MovieAtt.module.scss';
import { StatusIcon } from '../StatusIcon';

interface UserMovieAttPropsType {
  movie: MovieState;
}

export const UserMovieAtt = ({ movie }: UserMovieAttPropsType) => {
  const { state: watched } = useUserMovieState({
    movie,
    key: 'watched',
  });
  const {
    state: listed,
    handleButtonClick: handleListedButtonClick,
    isUpdating: isUpdatingListed,
  } = useUserMovieState({
    movie,
    key: 'listed',
  });

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {!listed && !watched && (
          <StatusIcon
            variant={'unlisted'}
            onClick={handleListedButtonClick}
            isUpdating={isUpdatingListed}
          />
        )}
      </div>
    </div>
  );
};

export default UserMovieAtt;
