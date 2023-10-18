import React from 'react';
import styles from './ProfileContent.module.scss'
import { ProfileOverview } from '../ProfileOverview';
import { UserMovies } from '../UserMovies';

export const ProfileContent = () => {
  return (
    <div className={styles.container}>
      <ProfileOverview />
      <UserMovies />
    </div>
  );
};

export default ProfileContent;
