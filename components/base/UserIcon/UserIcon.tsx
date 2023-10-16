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
      className={clsx(
        styles.image,
        active ? styles.active : '',
        imageSrc ? '' : styles.iconWrap,
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
      )}
      onClick={onClick}
    >
      {imageSrc ? <Image src={imageSrc} alt={alt} fill /> : <FaUserAlt />}
    </div>
  );
};

export default UserIcon;
