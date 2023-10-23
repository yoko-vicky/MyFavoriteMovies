import React from 'react';
import { Button } from '@/components/base/Button';
import { commentsData } from '@/constants';
import useUserRate from '@/hooks/useUserRate';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { UserRateType } from '@/types';
import { AiFillCaretUp } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import styles from './UserCommentDetail.module.scss';
import { Stars } from '../Stars';

export const UserCommentDetail = () => {
  const { targetUserMovie, toggleShowForm, isShowForm } =
    useMovieDetailContext();

  // const stars = use
  const { isActiveStars } = useUserRate(
    (targetUserMovie?.stars as UserRateType) || 0,
  );

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>{commentsData.detail.title}</div>
      </div>
      <div className={styles.stars}>
        <Stars
          isActiveStars={isActiveStars}
          onClickStar={undefined}
          onHoverStar={undefined}
          onlyToShow={true}
        />
      </div>
      {!!targetUserMovie?.comment && (
        <div className={styles.comment}>{targetUserMovie.comment}</div>
      )}
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
      />
    </div>
  );
};

export default UserCommentDetail;
