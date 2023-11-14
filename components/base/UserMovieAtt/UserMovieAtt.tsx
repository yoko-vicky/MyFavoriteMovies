import React, { useMemo } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import useModal from '@/hooks/useModal';
import useUserMovieState from '@/hooks/useUserMovieState';
import uuid from '@/lib/uuid';
import { MovieState } from '@/types/movies';
import { AiFillStar } from 'react-icons/ai';
import styles from './UserMovieAtt.module.scss';
import { StatusIcon } from '../StatusIcon';

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
  const { isModalOpen, closeModal, openModal } = useModal();

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

  const variant = useMemo(() => {
    if (listed && !watched) {
      return 'listed';
    }

    return 'watched';
  }, [listed, watched]);

  const handleOpenConfirmModal = () => openModal();

  return (
    <>
      <div className={styles.container}>
        {showStatus && (
          <div className={styles.status}>
            {listed && !watched && (
              <StatusIcon
                variant={'listed'}
                onClick={handleOpenConfirmModal}
                isUpdating={isUpdatingListed}
              />
            )}
            {watched && (
              <StatusIcon
                variant={'watched'}
                onClick={handleOpenConfirmModal}
                isUpdating={isUpdatingWatched}
              />
            )}
          </div>
        )}
        {!hideStars && watched && !!stars && <Stars stars={stars} />}
      </div>
      {isModalOpen && (
        <ConfirmModal
          closeModal={closeModal}
          handleBtnClick={
            variant === 'watched'
              ? handleWatchedButtonClick
              : handleListedButtonClick
          }
          variant={variant}
        />
      )}
    </>
  );
};

export default UserMovieAtt;
