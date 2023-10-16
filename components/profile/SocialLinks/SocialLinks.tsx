import React from 'react';
import { IconButton } from '@/components/base/IconButton';
import { UserState } from '@/types/user';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { ImInstagram } from 'react-icons/im';
import styles from './SocialLinks.module.scss';

export const SocialLinks = ({ user }: { user: UserState }) => {
  if (!user) {
    return <></>;
  }

  return (
    <div className={styles.links}>
      {user.twitter && (
        <IconButton Icon={FaSquareXTwitter} href={user.twitter} />
      )}
      {user.facebook && (
        <IconButton Icon={FaFacebookSquare} href={user.facebook} />
      )}
      {user.instagram && (
        <IconButton Icon={ImInstagram} href={user.instagram} />
      )}
    </div>
  );
};

export default SocialLinks;
