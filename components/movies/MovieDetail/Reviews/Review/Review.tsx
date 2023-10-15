import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ReviewState } from '@/types/movies';
import { excerptText } from '@/utils';
import { BiSolidUserCircle } from 'react-icons/bi';
import { ImQuotesLeft } from 'react-icons/im';
import styles from './Review.module.scss';

interface ReviewPropsType {
  review: ReviewState;
  updateDate: Date;
}

export const Review = ({ review, updateDate }: ReviewPropsType) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <div className={styles.author}>
          {review.author_details.avatar_path ? (
            <div className={styles.authorImageWrapper}>
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_AUTHOR_IMAGE_URL}${review.author_details.avatar_path}`}
                alt={review.author}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
              />
            </div>
          ) : (
            <BiSolidUserCircle className={styles.authorIcon} />
          )}
          <div className={styles.authorName}>{review.author}</div>
        </div>
        <div
          className={styles.date}
        >{`${updateDate.getFullYear()}/${updateDate.getMonth()}`}</div>
      </div>
      <div
        className={styles.message}
        onClick={() => setShowFull((prev) => !prev)}
      >
        <ImQuotesLeft className={clsx(styles.quoteIcon, styles.open)} />
        <span className={styles.messageContent}>
          {showFull ? review.content : excerptText(review.content, 80)}
        </span>
      </div>
    </div>
  );
};

export default Review;
