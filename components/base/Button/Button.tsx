import React from 'react';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariantType = 'outlined' | 'simple' | 'simpleOutlined';
type ButtonActiveColorType = 'yellow' | 'green' | 'blue' | 'white' | 'pink';

interface ButtonPropsType {
  variant: ButtonVariantType;
  label: string;
  Icon?: IconType;
  activeColor?: ButtonActiveColorType;
  activeFlag?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  // href?: string;
}

export const Button = ({
  variant,
  label,
  Icon,
  activeColor,
  activeFlag = false,
  onClick,
  type = 'button',
}: ButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        styles.btn,
        styles[variant],
        activeColor && styles[activeColor],
        activeFlag ? styles.active : '',
      )}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
