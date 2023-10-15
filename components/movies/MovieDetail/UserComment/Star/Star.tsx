import React from 'react';
import clsx from 'clsx';
import { UserRateType } from '@/types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styles from './Star.module.scss';

interface StarPropsType {
  active: boolean;
  rate: UserRateType;
  onClick: (rate: UserRateType) => void;
  onHover: (rate: UserRateType) => void;
}

export const Star = ({ active, rate, onClick, onHover }: StarPropsType) => {
  return (
    <div
      className={clsx(styles.star, active ? styles.active : '')}
      onClick={() => onClick(rate)}
      onMouseEnter={() => onHover(rate)}
      onMouseLeave={() => onHover(0)}
    >
      <AiOutlineStar className={styles.outlineStar} />
      <AiFillStar className={styles.fillStar} />
    </div>
  );
};

export default Star;
