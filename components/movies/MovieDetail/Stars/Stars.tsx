import React from 'react';
import useUserRate from '@/hooks/useUserRate';
import uuid from '@/lib/uuid';
import { UserRateType } from '@/types';
import styles from './Stars.module.scss';
import { Star } from '../Star';

export const Stars = () => {
  const { isActiveStars, onClickStar, onHoverStar } = useUserRate();

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
