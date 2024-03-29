import React from 'react';
import { Button } from '@/components/base/Button';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { commentsData } from '@/constants';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { AiFillCheckSquare } from 'react-icons/ai';
import { BiSquare } from 'react-icons/bi';
import styles from './UserCommentForm.module.scss';
import { Stars } from '../Stars';

export const UserCommentForm = () => {
  const {
    isActiveStars,
    onClickStar,
    onHoverStar,
    handleResetBtnClick,
    handleFormSubmit,
    review,
    isUpdatingReview,
    handleChangeReview,
    isPublicReview,
    toggleIsPublicReview,
  } = useMovieDetailContext();

  if (isUpdatingReview) {
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
      <label className={styles.publicCheckbox}>
        <input
          type={'checkbox'}
          // defaultChecked={isPublicReview || false}
          checked={isPublicReview}
          onChange={toggleIsPublicReview}
        />
        <span className={styles.publicIcon}>
          {isPublicReview ? <AiFillCheckSquare /> : <BiSquare />}
        </span>
        <span className={styles.publicLabel}>
          {commentsData.form.publicReview.makeReviewPublic}
        </span>
      </label>
      <p className={styles.publicNotes}>
        {commentsData.form.publicReview.makeReviewPublicNotes}
      </p>
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
