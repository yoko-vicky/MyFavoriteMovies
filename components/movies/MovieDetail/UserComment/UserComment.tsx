import React from 'react';
import { Button } from '@/components/base/Button';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { AiFillCheckSquare, AiOutlinePaperClip } from 'react-icons/ai';
import { BiSquare } from 'react-icons/bi';
import styles from './UserComment.module.scss';
import { UserCommentDetail } from './UserCommentDetail';
import { UserCommentForm } from './UserCommentForm';

export const UserComment = () => {
  const {
    listed,
    watched,
    handleListedButtonClick,
    handleWatchedButtonClick,
    isShowForm,
    isShowUserComment,
    isUpdatingWatched,
    isUpdatingListed,
  } = useMovieDetailContext();

  return (
    <div className={styles.comment}>
      <div className={styles.btns}>
        <Button
          variant={'outlined'}
          label={'Add to my List'}
          onClick={handleListedButtonClick}
          Icon={AiOutlinePaperClip}
          activeColor="pink"
          activeFlag={listed}
          isLoading={isUpdatingListed}
        />
        <Button
          variant={'outlined'}
          label={'Watched'}
          onClick={handleWatchedButtonClick}
          Icon={watched ? AiFillCheckSquare : BiSquare}
          activeColor="green"
          activeFlag={watched}
          isLoading={isUpdatingWatched}
        />
      </div>

      {isShowUserComment && <UserCommentDetail />}
      {isShowForm && <UserCommentForm />}
    </div>
  );
};

export default UserComment;
