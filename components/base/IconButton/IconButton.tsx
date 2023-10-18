import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './IconButton.module.scss';

type ButtonActiveColorType =
  | 'yellow'
  | 'green'
  | 'blue'
  | 'white'
  | 'pink'
  | 'red';

interface IconButtonPropsType {
  Icon: IconType;
  activeColor?: ButtonActiveColorType;
  activeFlag?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const IconButton = ({
  Icon,
  activeColor,
  activeFlag = false,
  onClick,
  className,
  href,
  ...props
}: IconButtonPropsType) => {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          styles.btn,
          !!activeColor && styles[activeColor],
          activeFlag ? styles.active : '',
          className ? className : '',
        )}
        {...props}
      >
        {!!Icon && <Icon />}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.btn,
        !!activeColor && styles[activeColor],
        activeFlag ? styles.active : '',
        className ? className : '',
      )}
      {...props}
    >
      {!!Icon && <Icon />}
    </div>
  );
};

export default IconButton;
