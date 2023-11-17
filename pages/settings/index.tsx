import React from 'react';
import { UserSettingsPageContent } from '@/components/settings/UserSettingsPageContent';
import { getLayoutFn } from '@/utils/getLayoutFn';

const UserSettingsPage = () => {
  return <UserSettingsPageContent />;
};

export default UserSettingsPage;

UserSettingsPage.getLayout = getLayoutFn('page');
