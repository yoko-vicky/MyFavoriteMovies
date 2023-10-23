import React from 'react';
import uuid from '@/lib/uuid';
import { UserRateType } from '@/types';
import styles from './Stars.module.scss';
import { Star } from '../Star';

interface StarsPropsType {
  isActiveStars: boolean[];
  onClickStar: ((rate: UserRateType) => void) | undefined;
  onHoverStar: ((rate: UserRateType) => void) | undefined;
  onlyToShow?: boolean;
  size?: 'sm' | 'md';
}

export const Stars = ({
  isActiveStars,
  onClickStar,
  onHoverStar,
  onlyToShow = false,
  size = 'md',
}: StarsPropsType) => {
  return (
    <div className={styles.stars}>
      {isActiveStars.map((isActiveStar, index) => (
        <Star
          key={uuid()}
          active={isActiveStar}
          rate={(index + 1) as UserRateType}
          onClick={onlyToShow ? undefined : onClickStar}
          onHover={onlyToShow ? undefined : onHoverStar}
          onlyToShow={onlyToShow}
          size={size}
        />
      ))}
    </div>
  );
};

export default Stars;
