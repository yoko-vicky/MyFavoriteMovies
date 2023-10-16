import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { imageAlt } from '@/constants';
import DummyImage from '@/public/images/profile.jpg';
import { logger } from '@/utils/logger';
import styles from './UserIcon.module.scss';

interface UserIconPropsType {
  imageSrc?: string;
  userName?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}

export const UserIcon = ({
  imageSrc,
  userName,
  onClick,
  href,
  active,
}: UserIconPropsType) => {
  const alt = userName ? `${userName} ${imageAlt.profile}` : imageAlt.profile;
  logger.log({ imageSrc });
  return href ? (
    <Link
      href={href}
      className={clsx(styles.image, active ? styles.active : '')}
    >
      <Image src={imageSrc ?? DummyImage} alt={alt} fill />
    </Link>
  ) : (
    <div
      className={clsx(styles.image, active ? styles.active : '')}
      onClick={onClick}
    >
      <Image src={imageSrc ?? DummyImage} alt={alt} fill />
    </div>
  );
};

export default UserIcon;
