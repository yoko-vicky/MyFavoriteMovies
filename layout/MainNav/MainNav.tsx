import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './MainNav.module.scss';

export const MainNav = ({ openMenu }: { openMenu: boolean }) => {
  return (
    <nav className={clsx(styles.nav, openMenu ? styles.open : '')}>
      <Link href={'/'}>Home</Link>
    </nav>
  );
};

export default MainNav;
