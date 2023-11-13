import React from 'react';
import clsx from 'clsx';
import uuid from '@/lib/uuid';
import { OptionItemState } from '@/types';
import styles from './CheckboxFields.module.scss';

interface CheckboxFieldsPropsType {
  optionItems: OptionItemState[];
  handleOptionChange: (newValue: string, addOrRemove: 'add' | 'remove') => void;
  isAll?: boolean;
  allValue: string;
}

export const CheckboxFields = ({
  optionItems,
  handleOptionChange,
  isAll,
  allValue,
}: CheckboxFieldsPropsType) => {
  if (optionItems.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.fields}>
      {optionItems.map((item: OptionItemState) => {
        const disabled = isAll && item.value !== allValue;
        // logger.log({ disabled, item: item.label });
        return (
          <label
            className={clsx(styles.item, disabled ? styles.disabled : '')}
            key={uuid()}
          >
            <input
              className={clsx(
                styles.input,
                item.checked ? styles.checked : '',
                disabled ? styles.disabled : '',
              )}
              type="checkbox"
              checked={item.checked}
              name={item.value}
              onChange={() =>
                handleOptionChange(item.value, item.checked ? 'remove' : 'add')
              }
              disabled={disabled}
            />
            <span className={styles.checkmark}></span>
            <span
              className={clsx(
                styles.label,
                item.checked ? styles.checked : '',
                disabled ? styles.disabled : '',
              )}
            >
              {item.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxFields;
