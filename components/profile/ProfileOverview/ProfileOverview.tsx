import React from 'react';
import { UserIcon } from '@/components/base/UserIcon';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import styles from './ProfileOverview.module.scss';
import { SocialLinks } from '../SocialLinks';

export const ProfileOverview = () => {
  const { user } = useUserProfilePageContext();

  return (
    <div className={styles.overview}>
      <div className={styles.imageWrapper}>
        <UserIcon
          userName={user?.name || ''}
          imageSrc={user?.image || ''}
          size="md"
        />
      </div>
      <div className={styles.name}>{user?.name}</div>
      {user?.bio && <div className={styles.bio}>{user.bio}</div>}
      {user && <SocialLinks user={user} />}
    </div>
  );
};

export default ProfileOverview;
