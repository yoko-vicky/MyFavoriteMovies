import React from 'react';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import styles from './ProfileContent.module.scss';
import { ProfileOverview } from '../ProfileOverview';
import { UserMovies } from '../UserMovies';

export const ProfileContent = () => {
  const { user, isMyProfile } = useUserProfilePageContext();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isMyProfile ? 'My Profile' : `${user?.name}'s Profile`}
      </h2>
      <ProfileOverview />
      <UserMovies />
    </div>
  );
};

export default ProfileContent;
