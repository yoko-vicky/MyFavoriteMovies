import React, { ChangeEvent } from 'react';
import { ValidateMsgState } from '@/types';
import styles from './TextareaField.module.scss';
import { FieldMsg } from '../FieldMsg';

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
      {!!msg && <FieldMsg msg={msg} />}
    </div>
  );
};

export default TextareaField;
