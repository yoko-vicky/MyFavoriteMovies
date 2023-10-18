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
      {!!user.twitter && <IconButton Icon={FaXTwitter} href={user.twitter} />}
      {!!user.facebook && <IconButton Icon={BsFacebook} href={user.facebook} />}
      {!!user.instagram && (
        <IconButton Icon={BsInstagram} href={user.instagram} />
      )}
    </div>
  );
};

export default SocialLinks;
