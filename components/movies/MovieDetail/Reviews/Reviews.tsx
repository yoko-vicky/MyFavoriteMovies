import React, { useMemo, useState } from 'react';
import uuid from '@/lib/uuid';
import { ReviewState } from '@/types/movies';
import { logger } from '@/utils/logger';
import styles from './Reviews.module.scss';
import { Review } from '../Review';

export const Reviews = ({ reviews }: { reviews: ReviewState[] }) => {
  const [showFullReviews, setShowFullReviews] = useState<boolean>(false);

  const sortedReviews = useMemo(() => {
    return reviews.sort((a, b) => {
      const updateA = new Date(a.updated_at);
      const updateB = new Date(b.updated_at);

      return updateA > updateB ? -1 : 1;
    });
  }, [reviews]);

  const reviewsToShow = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return [];
    }
    return showFullReviews
      ? sortedReviews.slice(0, 10)
      : sortedReviews.slice(0, 3);
  }, [reviews, showFullReviews, sortedReviews]);

  logger.log({ sortedReviews });

  if (!reviews || reviews.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.reviews}>
      <div className={styles.subtitle}>Reviews</div>
      {reviewsToShow.map((review) => {
        const updateDate = new Date(review.updated_at);
        return <Review key={uuid()} review={review} updateDate={updateDate} />;
      })}

      <button onClick={() => setShowFullReviews((prev) => !prev)}>
        {showFullReviews ? 'See less reviews' : 'See More Reviews'}
      </button>
    </div>
  );
};

export default Reviews;
