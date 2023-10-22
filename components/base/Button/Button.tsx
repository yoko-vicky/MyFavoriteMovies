import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariantType = 'outlined' | 'simple' | 'simpleOutlined';
type ButtonActiveColorType =
  | 'yellow'
  | 'green'
  | 'blue'
  | 'white'
  | 'pink'
  | 'red';

interface ButtonPropsType {
  variant: ButtonVariantType;
  label: string;
  Icon?: IconType;
  activeColor?: ButtonActiveColorType;
  activeFlag?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  className?: string;
  iconPos?: 'before' | 'after';
  iconSize?: 'md' | 'lg';
  align?: 'center' | 'left';
  disabled?: boolean;
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
  ...props
}: ButtonPropsType) => {
  if (href) {
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
      onClick={onClick}
      type={type}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[`icon-${iconSize}`],
        styles[align],
        !!activeColor && styles[activeColor],
        activeFlag ? styles.active : '',
        className ? className : '',
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
