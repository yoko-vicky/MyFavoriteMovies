import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { imageAlt } from '@/constants';
import DummyImage from '@/public/images/profile.jpg';
import styles from './UserIcon.module.scss';

interface UserIconPropsType {
  imageSrc?: string;
  userName?: string;
  onClick?: () => void;
  href?: string;
}

export const UserIcon = ({
  imageSrc,
  userName,
  onClick,
  href,
}: UserIconPropsType) => {
  const alt = userName ? `${userName} ${imageAlt.profile}` : imageAlt.profile;

  return href ? (
    <Link href={href} className={styles.image}>
      <Image src={DummyImage} alt={alt} fill />
    </Link>
  ) : (
    <div className={styles.image} onClick={onClick}>
      <Image src={DummyImage} alt={alt} fill />
    </div>
  );
};

export default UserIcon;
