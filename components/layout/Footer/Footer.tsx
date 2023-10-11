import React from 'react';
import styles from './Footer.module.scss';
import { AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <Link href={'#'}>
          <AiFillYoutube />
        </Link>
        <Link href={'#'}>
          <FaXTwitter />
        </Link>
        <Link href={'#'}>
          <AiOutlineInstagram />
        </Link>
      </div>
      <div className={styles.copyright}>
        <small>&copy; yocosaka 2023 All rights reserved.</small>
      </div>
      <div className={styles.links}>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
        <Link href="#">Help</Link>
        <Link href="#">Devices</Link>
      </div>
    </footer>
  );
};

export default Footer;
