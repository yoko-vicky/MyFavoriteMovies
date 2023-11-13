import React from 'react';
import Link from 'next/link';
import { BsFillCaretRightFill } from 'react-icons/bs';
import styles from './SubTitle.module.scss';

interface SubTitlePropsType {
  title: string;
  tag?: 'h2' | 'h3' | 'div';
  link?: string;
}
export const SubTitle = ({ title, tag, link }: SubTitlePropsType) => {
  if (tag === 'h2')
    return (
      <h2 className={styles.title}>
        <span>{title}</span>
        {!!link && (
          <Link href={link}>
            <BsFillCaretRightFill />
          </Link>
        )}
      </h2>
    );
  if (tag === 'h3')
    return (
      <h3 className={styles.title}>
        <span>{title}</span>
        {!!link && (
          <Link href={link}>
            <BsFillCaretRightFill />
          </Link>
        )}
      </h3>
    );

  return (
    <div className={styles.title}>
      <span>{title}</span>
      {!!link && (
        <Link href={link}>
          <BsFillCaretRightFill />
        </Link>
      )}
    </div>
  );
};

export default SubTitle;
