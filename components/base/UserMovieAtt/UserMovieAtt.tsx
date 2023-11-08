import React from 'react';
import useUserMovieState from '@/hooks/useUserMovieState';
import uuid from '@/lib/uuid';
import { MovieState, UserMovieListedWatchedState } from '@/types/movies';
import { AiFillStar } from 'react-icons/ai';
import { StatusIcon } from './StatusIcon';
import styles from './UserMovieAtt.module.scss';

interface UserMovieAttPropsType {
  showStatus?: boolean;
  hideStars?: boolean;
  movie: MovieState;
  stars: number;
}

const Stars = ({ stars }: { stars: number }) => {
  const starSvgs: boolean[] = [];

  for (let i = 0; i < stars; i++) {
    starSvgs.push(true);
  }

  if (starSvgs.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.stars}>
      {starSvgs.map(() => (
        <AiFillStar key={uuid()} />
      ))}
    </div>
  );
};

export const UserMovieAtt = ({
  showStatus = true,
  hideStars = false,
  movie,
  stars,
}: UserMovieAttPropsType) => {
  const {
    state: watched,
    handleButtonClick: handleWatchedButtonClick,
    isUpdating: isUpdatingWatched,
  } = useUserMovieState({
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

  const handleClickIcon = (variant: UserMovieListedWatchedState) => {
    variant === 'watched'
      ? handleWatchedButtonClick()
      : handleListedButtonClick();
  };

  return (
    <div className={styles.container}>
      {showStatus && (
        <div className={styles.status}>
          {listed && !watched && (
            <StatusIcon
              variant={'listed'}
              onClick={handleClickIcon}
              isUpdating={isUpdatingListed}
            />
          )}
          {watched && (
            <StatusIcon
              variant={'watched'}
              onClick={handleClickIcon}
              isUpdating={isUpdatingWatched}
            />
          )}
        </div>
      )}
      {!hideStars && <Stars stars={stars} />}
    </div>
  );
};

export default UserMovieAtt;
