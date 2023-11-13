import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { Spinner } from '../loading/Spinner';

type ButtonVariantType = 'outlined' | 'simple' | 'simpleOutlined';
type ButtonColorType = 'yellow' | 'green' | 'blue' | 'white' | 'pink' | 'red';

interface ButtonPropsType {
  variant: ButtonVariantType;
  label: string;
  Icon?: IconType;
  activeColor?: ButtonColorType;
  activeFlag?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  className?: string;
  iconPos?: 'before' | 'after';
  iconSize?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
  disabled?: boolean;
  bgWhite?: boolean;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Button = ({
  variant,
  label,
  Icon,
  activeColor,
  activeFlag = false,
  onClick,
  type = 'button',
  className,
  iconPos = 'before',
  iconSize = 'md',
  align = 'left',
  href,
  disabled = false,
  bgWhite = false,
  isLoading = false,
  ...props
}: ButtonPropsType) => {
  if (isLoading) {
    return (
      <div
        onClick={undefined}
        className={clsx(
          styles.btn,
          styles[variant],
          styles[`icon-${iconSize}`],
          styles['center'],
          !!activeColor && styles[activeColor],
          activeFlag ? styles.active : '',
          bgWhite ? styles.bgWhite : '',
          className ? className : '',
          styles.disabled,
        )}
        {...props}
      >
        <Spinner size="xsm" />
      </div>
    );
  }
  if (href && !disabled) {
    return (
      <Link
        href={href}
        type={type}
        className={clsx(
          styles.btn,
          styles[variant],
          styles[`icon-${iconSize}`],
          styles[align],
          !!activeColor && styles[activeColor],
          activeFlag ? styles.active : '',
          disabled ? styles.disabled : '',
          bgWhite ? styles.bgWhite : '',
          className ? className : '',
        )}
        {...props}
      >
        {!!Icon && iconPos === 'before' && <Icon />}
        <span>{label}</span>
        {!!Icon && iconPos === 'after' && <Icon />}
      </Link>
    );
  }
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      type={type}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[`icon-${iconSize}`],
        styles[align],
        !!activeColor && styles[activeColor],
        activeFlag ? styles.active : '',
        bgWhite ? styles.bgWhite : '',
        className ? className : '',
        disabled ? styles.disabled : '',
      )}
      {...props}
    >
      {!!Icon && iconPos === 'before' && <Icon />}
      <span>{label}</span>
      {!!Icon && iconPos === 'after' && <Icon />}
    </button>
  );
};

export default Button;
