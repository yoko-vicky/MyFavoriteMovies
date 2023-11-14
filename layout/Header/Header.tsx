import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import LogoImage from '@/public/images/logo.png';
import { CiSearch } from 'react-icons/ci';
import styles from './Header.module.scss';
import { UserNav } from '../UserNav';

export enum HeaderVariantType {
  FIXED = 'fixed',
  DEFAULT = 'relative',
}
interface HeaderPropsType {
  variant?: HeaderVariantType;
}

export const Header = ({
  variant = HeaderVariantType.DEFAULT,
}: HeaderPropsType) => {
  return (
    <header className={clsx(styles.header, styles[variant])}>
      <div className={styles.container}>
        <Link href={'/'} className={styles.logo}>
          <Image
            src={LogoImage}
            fill
            style={{ objectFit: 'contain' }}
            alt={'Moviees'}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
          />
        </Link>

        <div className={styles.right}>
          <Link href={'/search'} className={styles.searchLink}>
            <CiSearch />
            <span>Search</span>
          </Link>
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
