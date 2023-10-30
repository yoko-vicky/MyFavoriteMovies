import React from 'react';
import { Button } from '@/components/base/Button';
import { commentsData } from '@/constants';
import useUserRate from '@/hooks/useUserRate';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { UserRateType } from '@/types';
import { formatDate } from '@/utils';
import { AiFillCaretUp, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import styles from './UserCommentDetail.module.scss';
import { Stars } from '../Stars';

export const UserCommentDetail = () => {
  const { targetUserMovie, toggleShowForm, isShowForm, isUpdatingReview } =
    useMovieDetailContext();

  // const stars = use
  const { isActiveStars } = useUserRate(
    (targetUserMovie?.stars as UserRateType) || 0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.reviewHeader}>
        <div className={styles.title}>{commentsData.detail.title}</div>
        <div className={styles.publicStatus}>
          {targetUserMovie?.isPublicReview ? (
            <AiFillEye />
          ) : (
            <AiFillEyeInvisible />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.stars}>
          <Stars
            isActiveStars={isActiveStars}
            onClickStar={undefined}
            onHoverStar={undefined}
            onlyToShow={true}
            size={'sm'}
          />
        </div>
        {!!targetUserMovie?.comment && (
          <div className={styles.comment}>{targetUserMovie.comment}</div>
        )}
      </div>
      {targetUserMovie?.updatedAt && (
        <div className={styles.date}>
          <span className={styles.dateTitle}>Updated at:</span>
          <span className={styles.updatedAt}>
            {formatDate(targetUserMovie?.updatedAt)}
          </span>
        </div>
      )}

      {!isUpdatingReview && (
        <div className={styles.btnWrapper}>
          <Button
            variant={'simple'}
            label={
              isShowForm
                ? commentsData.detail.buttons.closeForm
                : commentsData.detail.buttons.showForm
            }
            Icon={isShowForm ? AiFillCaretUp : BsFillPencilFill}
            iconSize="sm"
            onClick={toggleShowForm}
            className={styles.button}
          />
        </div>
      )}
    </div>
  );
};

export default UserCommentDetail;
