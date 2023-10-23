import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { imageAlt } from '@/constants';
import { logger } from '@/utils/logger';
import { FaUserAlt } from 'react-icons/fa';
import styles from './UserIcon.module.scss';

interface UserIconPropsType {
  imageSrc?: string;
  userName?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  size?: 'sm' | 'md';
}

export const UserIcon = ({
  imageSrc,
  userName,
  onClick,
  href,
  active,
  size = 'sm',
}: UserIconPropsType) => {
  const alt = userName ? `${userName} ${imageAlt.profile}` : imageAlt.profile;
  // logger.log({ imageSrc });
  return href ? (
    <Link
      href={href}
      className={clsx(
        styles.image,
        active ? styles.active : '',
        imageSrc ? '' : styles.iconWrap,
        styles[size],
      )}
    >
      {imageSrc ? <Image src={imageSrc} alt={alt} fill /> : <FaUserAlt />}
    </Link>
  ) : (
    <div
      className={clsx(
        styles.image,
        active ? styles.active : '',
        imageSrc ? '' : styles.iconWrap,
        styles[size],
      )}
      onClick={onClick}
    >
      {imageSrc ? <Image src={imageSrc} alt={alt} fill /> : <FaUserAlt />}
    </div>
  );
};

export default UserIcon;
