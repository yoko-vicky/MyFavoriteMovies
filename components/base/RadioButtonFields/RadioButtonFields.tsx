import React from 'react';
import clsx from 'clsx';
import uuid from '@/lib/uuid';
import { OptionItemState } from '@/types';
import styles from './RadioButtonFields.module.scss';

interface RadioButtonFieldsPropsType {
  optionItems: OptionItemState[];
  handleOptionChange: (newValue: string) => void;
}

export const RadioButtonFields = ({
  optionItems,
  handleOptionChange,
}: RadioButtonFieldsPropsType) => {
  if (optionItems.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.fields}>
      {optionItems.map((item: OptionItemState) => (
        <label className={styles.item} key={uuid()}>
          <input
            className={clsx(styles.input, item.checked ? styles.checked : '')}
            type="radio"
            checked={item.checked}
            name={item.value}
            onChange={() => handleOptionChange(item.value)}
          />
          <span className={styles.checkmark}></span>
          <span
            className={clsx(styles.label, item.checked ? styles.checked : '')}
          >
            {item.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonFields;
