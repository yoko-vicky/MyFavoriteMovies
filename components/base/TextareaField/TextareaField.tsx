import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import styles from './TextareaField.module.scss';

interface TextareaFieldPropsType {
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  value: string;
  msg?: ValidateMsgState | null;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
export const TextareaField = ({
  placeholder,
  label,
  onChange,
  disabled,
  value,
  msg,
  onBlur,
}: TextareaFieldPropsType) => {
  return (
    <div className={styles.container}>
      <label className={styles.field}>
        {!!label && <span className={styles.label}>{label}</span>}
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.textarea}
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

export default TextareaField;
