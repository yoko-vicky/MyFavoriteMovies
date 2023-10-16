import { ReactElement } from 'react';
import { HomeLayout } from '@/layout/HomeLayout';
import { PageLayout } from '@/layout/PageLayout';

export const getLayoutFn = (layoutType: 'home' | 'page') => {
  return function getLayout(page: ReactElement) {
    return layoutType === 'home' ? (
      <HomeLayout>{page}</HomeLayout>
    ) : (
      <PageLayout>{page}</PageLayout>
    );
  };
};
