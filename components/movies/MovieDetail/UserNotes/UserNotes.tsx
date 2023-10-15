import React, { useState } from 'react';
import { Button } from '@/components/base/Button';
import {
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiOutlinePaperClip,
} from 'react-icons/ai';
import styles from './UserNotes.module.scss';
import { Stars } from '../Stars';

export const UserNotes = () => {
  const [watched, setWacthed] = useState<boolean>(false);
  const [cliped, setCliped] = useState<boolean>(false);

  const handleClipedStatus = () => {
    setCliped((prev) => !prev);
  };
  const handleWatchedStatus = () => {
    setWacthed((prev) => !prev);
  };
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
          activeColor="blue"
          activeFlag={watched}
        />
      </div>

      <Stars />
      <input type="textarea" placeholder="So nice!" />
    </div>
  );
};

export default UserNotes;
