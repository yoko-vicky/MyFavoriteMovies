import React from 'react';
import { Button } from '@/components/base/Button';
import { commentsData } from '@/constants';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import styles from './UserCommentForm.module.scss';
import { Stars } from '../Stars';

export const UserCommentForm = () => {
  const {
    isActiveStars,
    onClickStar,
    onHoverStar,
    userNoteInputRef,
    handleFormSubmit,
    handleResetBtnClick,
  } = useMovieDetailContext();

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.title}>{commentsData.form.title}</div>
      <Stars
        isActiveStars={isActiveStars}
        onClickStar={onClickStar}
        onHoverStar={onHoverStar}
      />

      <textarea ref={userNoteInputRef} className={styles.textarea} />

      <div className={styles.btns}>
        <Button variant={'simpleOutlined'} label={'Save'} type="submit" />
        <Button
          variant={'simple'}
          label={'Reset'}
          type="reset"
          onClick={handleResetBtnClick}
        />
      </div>
    </form>
  );
};

export default UserCommentForm;
