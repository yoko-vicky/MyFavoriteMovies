'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { UserIcon } from '@/components/base/UserIcon';
import styles from './UserNav.module.scss';

export const UserNav = () => {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <UserIcon
        userName={session?.user?.name ?? ''}
        onClick={() => setOpenUserMenu( ( prev ) => !prev )}
        active={openUserMenu}
      />
      {openUserMenu && (
        <nav className={styles.userMenu}>
          {session ? (
            <>
              {/* session.user.username? */}
              <Link href={`/profile/${123}`} className={styles.link}>
                My Profile
              </Link>
              <Link href={'/clips'} className={styles.link}>
                My Clips
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
