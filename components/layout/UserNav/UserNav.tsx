import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { UserIcon } from '@/components/base/UserIcon';
import { useUserContext } from '@/store/UserContext';
import { logger } from '@/utils/logger';
import styles from './UserNav.module.scss';

export const UserNav = () => {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { user } = useUserContext();

  logger.log({ user });
  return (
    <div className={styles.container}>
      <UserIcon
        userName={user?.name ?? ''}
        onClick={() => setOpenUserMenu((prev) => !prev)}
        active={openUserMenu}
        imageSrc={user?.image || ''}
      />
      {openUserMenu && (
        <nav className={styles.userMenu}>
          {user ? (
            <>
              {/* session.user.username? */}
              <Link href={`/profile/${123}`} className={styles.link}>
                My Profile
              </Link>
              <Link href={'/mylist'} className={styles.link}>
                My List
              </Link>
              <button onClick={() => signOut()} className={styles.link}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className={styles.link}>
              Sign In
            </button>
          )}
        </nav>
      )}
    </div>
  );
};

export default UserNav;
