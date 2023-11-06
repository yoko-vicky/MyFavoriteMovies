import React from 'react';
import { RadioButtonFields } from '@/components/base/RadioButtonFields';
import { useUserListPageContext } from '@/store/UserListPageContext';
import styles from './Filter.module.scss';

export const Filter = () => {
  const { watchedStatusOptionItems, handleWatchedStatusChange } =
    useUserListPageContext();

  return (
    <div className={styles.container}>
      <RadioButtonFields
        optionItems={watchedStatusOptionItems}
        handleOptionChange={handleWatchedStatusChange}
      />
      <div>
        <select name="" id="">
          <option value="1960">1960</option>
          <option value="1960">1970</option>
          <option value="1960">1980</option>
          <option value="1960">1990</option>
          <option value="1960">2000</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
