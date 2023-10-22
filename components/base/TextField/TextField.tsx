import React, { ChangeEvent } from 'react';
import { ValidateMsgState } from '@/types';
import styles from './TextField.module.scss';
import { FieldMsg } from '../FieldMsg';

interface TextFieldPropsType {
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value: string;
  type?: 'text' | 'url';
  msg?: ValidateMsgState | null;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export const TextField = ({
  placeholder,
  label,
  onChange,
  disabled,
  value,
  type = 'text',
  msg,
  onBlur,
}: TextFieldPropsType) => {
  return (
    <div className={styles.container}>
      <label className={styles.field}>
        {!!label && <span className={styles.label}>{label}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
          onBlur={onBlur}
        />
      </label>
      {!!msg && <FieldMsg msg={msg} />}
    </div>
  );
};

export default TextField;
