import React from 'react';
import uuid from '@/lib/uuid';
import { UserRateType } from '@/types';
import styles from './Stars.module.scss';
import { Star } from '../Star';

interface StarsPropsType {
  isActiveStars: boolean[];
  onClickStar: (rate: UserRateType) => void;
  onHoverStar: (rate: UserRateType) => void;
}

export const Stars = ({
  isActiveStars,
  onClickStar,
  onHoverStar,
}: StarsPropsType) => {
  return (
    <div className={styles.stars}>
      {isActiveStars.map((isActiveStar, index) => (
        <Star
          key={uuid()}
          active={isActiveStar}
          rate={(index + 1) as UserRateType}
          onClick={onClickStar}
          onHover={onHoverStar}
        />
      ))}
    </div>
  );
};

export default Stars;
