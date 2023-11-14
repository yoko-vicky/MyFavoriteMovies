import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/base/Button';
import { UserIcon } from '@/components/base/UserIcon';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { UserProfileEditModal } from '@/components/modals/UserProfileEditModal';
import { defaultOg } from '@/constants';
import { copyToClipboard } from '@/lib/copyToClipboard';
import { infoToastify } from '@/lib/toast';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import { logger } from '@/utils/logger';
import _ from 'lodash';
import { BsFillPencilFill } from 'react-icons/bs';
import { IoCopySharp } from 'react-icons/io5';
import styles from './ProfileOverview.module.scss';
import { SocialLinks } from '../SocialLinks';

export const ProfileOverview = () => {
  const {
    user,
    isMyProfile,
    isEditModalOpen,
    openEditModal,
    isUpdatingProfile,
  } = useUserProfilePageContext();

  const handleCopyBtnClick = (userId: string) => {
    copyToClipboard(`${defaultOg.url}profile/${userId}`);
    infoToastify('Copied!');
  };

  return (
    <>
      <div className={styles.overview}>
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <UserIcon
              userName={user?.name || ''}
              imageSrc={user?.image || ''}
              size="md"
            />
          </div>
        </div>
        <div className={styles.right}>
          {isUpdatingProfile ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className={styles.name}>{user?.name}</div>
              {!!user?.bio && (
                <div className={styles.bio}>{_.unescape(user.bio)}</div>
              )}
              {!!user && <SocialLinks user={user} />}
            </>
          )}
        </div>
        <div>
          {isMyProfile && !!user && (
            <div className={styles.btns}>
              <Button
                variant={'simpleOutlined'}
                label={'Edit Profile'}
                className={clsx(styles.btn, styles.editBtn)}
                onClick={() => {
                  openEditModal();
                  logger.log('OpenEditModal clicked', isEditModalOpen);
                }}
                Icon={BsFillPencilFill}
                iconSize="sm"
              />
              <Button
                variant={'simple'}
                label={'Copy my profile link'}
                className={clsx(styles.btn, styles.copyBtn)}
                onClick={() => handleCopyBtnClick(user.id)}
                Icon={IoCopySharp}
                iconSize="sm"
              />
            </div>
          )}
        </div>
      </div>
      {isMyProfile && isEditModalOpen && <UserProfileEditModal />}
    </>
  );
};

export default ProfileOverview;
