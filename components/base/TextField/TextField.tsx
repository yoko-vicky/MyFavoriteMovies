import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import styles from './TextField.module.scss';

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
      {!!msg && (
        <div
          className={clsx(
            styles.msg,
            msg.type === ValidateMsgTypeState.OK ? styles.ok : styles.ng,
          )}
        >
          {msg.msg}
        </div>
      )}
    </div>
  );
};

export default TextField;
