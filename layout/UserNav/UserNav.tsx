/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { UserIcon } from '@/components/base/UserIcon';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import styles from './UserNav.module.scss';

export const UserNav = () => {
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { sessionUser } = useUserSessionDataContext();
  const router = useRouter();
  const closeMenu = () => setOpenUserMenu(false);
  const userIconRef = useRef<any>(null);
  const userNavRef = useRef<any>(null);
  useOutsideClick([userIconRef, userNavRef], closeMenu);

  const handleClickToMyProfile = () => {
    setOpenUserMenu(false);
    sessionUser?.id && router.push(`/profile/${sessionUser.id}`);
  };

  const handleClickToMyList = () => {
    setOpenUserMenu(false);
    sessionUser && router.push('mylist');
  };

  // logger.log({ user: session?.user });
  return (
    <div className={styles.container}>
      <UserIcon
        userName={sessionUser?.name || ''}
        onClick={() => setOpenUserMenu((prev) => !prev)}
        active={openUserMenu}
        imageSrc={sessionUser?.image || ''}
        innerRef={userIconRef}
      />
      {openUserMenu && (
        <nav className={styles.userMenu} ref={userNavRef}>
          {sessionUser ? (
            <>
              {/* session.user.username? */}
              <button className={styles.link} onClick={handleClickToMyProfile}>
                My Profile
              </button>
              <button className={styles.link} onClick={handleClickToMyList}>
                My List
              </button>
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
