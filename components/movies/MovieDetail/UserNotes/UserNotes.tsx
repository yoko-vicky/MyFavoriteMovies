import React, { useState } from 'react';
import { Button } from '@/components/base/Button';
import {
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiOutlinePaperClip,
} from 'react-icons/ai';
import styles from './UserNotes.module.scss';

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
          activeColor="yellow"
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

      <div>⭐️⭐️⭐️⭐️⭐️</div>
      <input type="textarea" placeholder="So nice!" />
    </div>
  );
};

export default UserNotes;
