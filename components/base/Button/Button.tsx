import React from 'react';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariantType = 'outlined' | 'simple';
type ButtonActiveColorType = 'yellow' | 'green' | 'blue' | 'white' | 'pink';

interface ButtonPropsType {
  variant: ButtonVariantType;
  label: string;
  Icon?: IconType;
  activeColor?: ButtonActiveColorType;
  activeFlag?: boolean;
  onClick?: () => void;
  // href?: string;
}

export const Button = ({
  variant,
  label,
  Icon,
  activeColor = 'white',
  activeFlag = false,
  onClick,
}: ButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[activeColor],
        activeFlag ? styles.active : '',
      )}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
