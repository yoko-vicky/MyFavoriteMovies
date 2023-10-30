import React from 'react';
import { IconButton } from '@/components/base/IconButton';
import { UserState } from '@/types/user';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './SocialLinks.module.scss';

export const SocialLinks = ({ user }: { user: UserState }) => {
  if (!user) {
    return <></>;
  }

  return (
    <div className={styles.links}>
      {!!user.twitter && (
        <IconButton Icon={FaXTwitter} href={user.twitter} iconSize="lg" />
      )}
      {!!user.facebook && (
        <IconButton Icon={BsFacebook} href={user.facebook} iconSize="lg" />
      )}
      {!!user.instagram && (
        <IconButton Icon={BsInstagram} href={user.instagram} iconSize="lg" />
      )}
    </div>
  );
};

export default SocialLinks;
