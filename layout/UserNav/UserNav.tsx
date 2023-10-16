import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { UserIcon } from '@/components/base/UserIcon';
import { logger } from '@/utils/logger';
import styles from './UserNav.module.scss';

export const UserNav = () => {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { data: session } = useSession();

  logger.log({ user: session?.user });
  return (
    <div className={styles.container}>
      <UserIcon
        userName={session?.user.name ?? ''}
        onClick={() => setOpenUserMenu((prev) => !prev)}
        active={openUserMenu}
        imageSrc={session?.user?.image || ''}
      />
      {openUserMenu && (
        <nav className={styles.userMenu}>
          {session?.user ? (
            <>
              {/* session.user.username? */}
              <Link
                href={`/profile/${session?.user.id}`}
                className={styles.link}
              >
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
