import React from 'react';
import { Button } from '@/components/base/Button';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import {
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiOutlinePaperClip,
} from 'react-icons/ai';
import styles from './UserComment.module.scss';
import { UserCommentForm } from './UserCommentForm';

export const UserComment = () => {
  const { cliped, watched, handleClipedStatus, handleWatchedStatus } =
    useMovieDetailContext();

  return (
    <div className={styles.comment}>
      <div className={styles.btns}>
        <Button
          variant={'outlined'}
          label={'Clip this movie'}
          onClick={handleClipedStatus}
          Icon={AiOutlinePaperClip}
          activeColor="pink"
          activeFlag={cliped}
        />
        <Button
          variant={'outlined'}
          label={'Watched'}
          onClick={handleWatchedStatus}
          Icon={watched ? AiFillCheckSquare : AiOutlineCheckSquare}
          activeColor="green"
          activeFlag={watched}
        />
      </div>

      {watched && <UserCommentForm />}
    </div>
  );
};

export default UserComment;
