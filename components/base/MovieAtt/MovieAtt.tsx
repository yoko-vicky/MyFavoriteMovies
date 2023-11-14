import React from 'react';
import { signIn } from 'next-auth/react';
import useUserMovieState from '@/hooks/useUserMovieState';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { MovieState } from '@/types/movies';
import styles from './MovieAtt.module.scss';
import { StatusIcon } from '../StatusIcon';

interface UserMovieAttPropsType {
  movie: MovieState;
}

export const UserMovieAtt = ({ movie }: UserMovieAttPropsType) => {
  const { sessionUser } = useUserSessionDataContext();

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

  const handleSignIn = () => {
    signIn();
  };

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {!listed && !watched && (
          <StatusIcon
            variant={'unlisted'}
            onClick={sessionUser ? handleListedButtonClick : handleSignIn}
            isUpdating={isUpdatingListed}
          />
        )}
      </div>
    </div>
  );
};

export default UserMovieAtt;
