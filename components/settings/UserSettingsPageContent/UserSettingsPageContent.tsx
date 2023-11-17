import React from 'react';
import { SubTitle } from '@/components/base/SubTitle';
import { getLayoutFn } from '@/utils/getLayoutFn';
import styles from './UserSettingsPage.module.scss';

export const UserSettingsPageContent = () => {
  return (
    <div className={styles.container}>
      <SubTitle title={'Settings'} />
    </div>
  );
};

export default UserSettingsPageContent;
UserSettingsPageContent.getLayout = getLayoutFn('page');
