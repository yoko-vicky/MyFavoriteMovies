import React from 'react';
import { CheckboxFields } from '@/components/base/CheckboxFields';
import { RadioButtonFields } from '@/components/base/RadioButtonFields';
import { useUserListPageContext } from '@/store/UserListPageContext';
import styles from './Filter.module.scss';

export const Filter = () => {
  const {
    watchedStatusOptionItems,
    handleWatchedStatusChange,
    handleChangeAge,
    agesOptions,
    isAllAges,
  } = useUserListPageContext();

  return (
    <div className={styles.container}>
      {/* Watched Status Filter */}
      <RadioButtonFields
        optionItems={watchedStatusOptionItems}
        handleOptionChange={handleWatchedStatusChange}
      />
      {/* Ages Filter */}
      <CheckboxFields
        optionItems={agesOptions}
        handleOptionChange={handleChangeAge}
        isAll={isAllAges}
      />
    </div>
  );
};

export default Filter;
