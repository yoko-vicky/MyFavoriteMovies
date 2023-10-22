import React from 'react';
import { Button } from '@/components/base/Button';
import { getLayoutFn } from '@/utils/getLayoutFn';

const Custom404 = () => {
  return (
    <div>
      <h1>Sorry... Something went wrong</h1>
      <Button variant={'outlined'} label={'Back to Home'} href="/" />
    </div>
  );
};

Custom404.getLayout = getLayoutFn('page');
export default Custom404;
