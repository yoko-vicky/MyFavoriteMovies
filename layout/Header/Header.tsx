import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import LogoImage from '@/public/images/logo.png';
import { HiMenu } from 'react-icons/hi';
import styles from './Header.module.scss';
import { MainNav } from '../MainNav';
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
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header className={clsx(styles.header, styles[variant])}>
      <div className={styles.container}>
        <button
          className={styles.mobMenu}
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <HiMenu />
        </button>
        <Link href={'/'} className={styles.logo}>
          <Image
            src={LogoImage}
            fill
            style={{ objectFit: 'contain' }}
            alt={'Moviees'}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
          />
        </Link>
        <MainNav openMenu={openMenu} />
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
