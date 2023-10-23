import React from 'react';
import { Button } from '@/components/base/Button';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import {
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiOutlinePaperClip,
} from 'react-icons/ai';
import styles from './UserComment.module.scss';
import { UserCommentDetail } from './UserCommentDetail';
import { UserCommentForm } from './UserCommentForm';

export const UserComment = () => {
  const {
    listed,
    watched,
    handleListedStatus,
    handleWatchedStatus,
    isShowForm,
    isShowUserComment,
  } = useMovieDetailContext();

  return (
    <div className={styles.comment}>
      <div className={styles.btns}>
        <Button
          variant={'outlined'}
          label={listed ? 'Added to my List' : 'Add this movie to my List'}
          onClick={handleListedStatus}
          Icon={AiOutlinePaperClip}
          activeColor="pink"
          activeFlag={listed}
        />
        <Button
          variant={'outlined'}
          label={watched ? 'Watched' : 'Unwatched'}
          onClick={handleWatchedStatus}
          Icon={watched ? AiFillCheckSquare : AiOutlineCheckSquare}
          activeColor="green"
          activeFlag={watched}
        />
      </div>

      {isShowUserComment && <UserCommentDetail />}
      {isShowForm && <UserCommentForm />}
    </div>
  );
};

export default UserComment;
