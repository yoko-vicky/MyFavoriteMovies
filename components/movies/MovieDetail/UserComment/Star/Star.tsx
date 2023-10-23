import React from 'react';
import clsx from 'clsx';
import { UserRateType } from '@/types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styles from './Star.module.scss';

interface StarPropsType {
  active: boolean;
  rate: UserRateType;
  onClick: ((rate: UserRateType) => void) | undefined;
  onHover: ((rate: UserRateType) => void) | undefined;
  onlyToShow?: boolean;
  size?: 'sm' | 'md';
}

export const Star = ({
  active,
  rate,
  onClick,
  onHover,
  onlyToShow = false,
  size = 'md',
}: StarPropsType) => {
  return (
    <div
      className={clsx(
        styles.star,
        active ? styles.active : '',
        !onlyToShow ? styles.interactive : '',
        styles[size],
      )}
      onClick={() => !onlyToShow && onClick && onClick(rate)}
      onMouseEnter={() => !onlyToShow && onHover && onHover(rate)}
      onMouseLeave={() => !onlyToShow && onHover && onHover(0)}
    >
      <AiOutlineStar className={styles.outlineStar} />
      <AiFillStar className={styles.fillStar} />
    </div>
  );
};

export default Star;
