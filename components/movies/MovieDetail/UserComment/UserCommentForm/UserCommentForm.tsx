import React from 'react';
import { Button } from '@/components/base/Button';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { commentsData } from '@/constants';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import styles from './UserCommentForm.module.scss';
import { Stars } from '../Stars';

export const UserCommentForm = () => {
  const {
    isActiveStars,
    onClickStar,
    onHoverStar,
    handleResetBtnClick,
    handleFormSubmit,
    isUpdatingUserMovieRef,
    review,
    handleChangeReview,
  } = useMovieDetailContext();

  if (isUpdatingUserMovieRef?.current) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.title}>{commentsData.form.title}</div>
      <Stars
        isActiveStars={isActiveStars}
        onClickStar={onClickStar}
        onHoverStar={onHoverStar}
      />
      <textarea
        className={styles.textarea}
        value={review}
        onChange={handleChangeReview}
      />
      <div className={styles.btns}>
        <Button
          variant={'simpleOutlined'}
          label={commentsData.form.buttons.submit}
          type="submit"
        />
        <Button
          variant={'simple'}
          label={commentsData.form.buttons.reset}
          type="reset"
          onClick={handleResetBtnClick}
        />
      </div>
    </form>
  );
};

export default UserCommentForm;
