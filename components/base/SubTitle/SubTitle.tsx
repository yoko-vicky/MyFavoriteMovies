import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { BsFillCaretRightFill } from 'react-icons/bs';
import styles from './SubTitle.module.scss';

interface SubTitlePropsType {
  title: string;
  tag?: 'h1' | 'h2' | 'h3' | 'div';
  link?: string;
  className?: string;
}
export const SubTitle = ({
  title,
  tag,
  link,
  className,
}: SubTitlePropsType) => {
  if (tag === 'h1')
    return (
      <h1 className={clsx(styles.title, className ? className : '')}>
        <span>{title}</span>
        {!!link && (
          <Link href={link}>
            <BsFillCaretRightFill />
          </Link>
        )}
      </h1>
    );
  if (tag === 'h2')
    return (
      <h2 className={clsx(styles.title, className ? className : '')}>
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
      <h3 className={clsx(styles.title, className ? className : '')}>
        <span>{title}</span>
        {!!link && (
          <Link href={link}>
            <BsFillCaretRightFill />
          </Link>
        )}
      </h3>
    );

  return (
    <div className={clsx(styles.title, className ? className : '')}>
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
