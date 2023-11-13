import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import styles from './Pagenation.module.scss';

interface PagenationPropsType {
  currentPage: number;
  totalPages: number;
  pathToPage: string;
}

const Pagenation = ({
  currentPage,
  totalPages,
  pathToPage,
}: PagenationPropsType) => {
  if (!currentPage && !totalPages) {
    return <></>;
  }
  const pathToNext =
    currentPage <= totalPages
      ? `${pathToPage}?page=${currentPage + 1}`
      : undefined;
  const pathToPrev =
    currentPage > 1 ? `${pathToPage}?page=${currentPage - 1}` : undefined;
  return (
    <div className={styles.pagenation}>
      {pathToPrev ? (
        <Link href={pathToPrev} className={styles.prev}>
          <AiFillCaretLeft />
        </Link>
      ) : (
        <div className={clsx(styles.prev, styles.disabled)}>
          <AiFillCaretLeft />
        </div>
      )}
      <div className={styles.page}>{`${currentPage} / ${totalPages}`}</div>
      {pathToNext ? (
        <Link href={pathToNext || ''} className={styles.next}>
          <AiFillCaretRight />
        </Link>
      ) : (
        <div className={clsx(styles.next, styles.disabled)}>
          <AiFillCaretRight />
        </div>
      )}
    </div>
  );
};

export default Pagenation;
