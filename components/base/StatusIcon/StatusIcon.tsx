import React from 'react';
import clsx from 'clsx';
import { UserMovieListedWatchedState } from '@/types/movies';
import { AiFillCheckSquare, AiOutlinePaperClip } from 'react-icons/ai';
import styles from './StatusIcon.module.scss';
import { Spinner } from '../loading/Spinner';

interface StatusIconPropsType {
  variant: UserMovieListedWatchedState;
  onClick?: (variant: UserMovieListedWatchedState) => void;
  isUpdating?: boolean;
}

export const StatusIcon = ({
  variant,
  onClick,
  isUpdating,
}: StatusIconPropsType) => {
  const handleOnClick = () => {
    onClick && onClick(variant);
  };

  return (
    <div
      className={clsx(styles.icon, styles[variant])}
      onClick={!isUpdating ? handleOnClick : undefined}
    >
      {isUpdating ? (
        <Spinner size="xsm" />
      ) : variant === 'watched' ? (
        <AiFillCheckSquare className={styles.active} />
      ) : variant === 'listed' ? (
        <AiOutlinePaperClip className={styles.active} />
      ) : (
        <AiOutlinePaperClip />
      )}
    </div>
  );
};

export default StatusIcon;
