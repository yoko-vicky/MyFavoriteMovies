import React from 'react';
import { Button } from '@/components/base/Button';
import { SubTitle } from '@/components/base/SubTitle';
import { getLayoutFn } from '@/utils/getLayoutFn';

const Custom404 = () => {
  return (
    <div
      className="container"
      style={{
        minHeight: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SubTitle title={'Not Found'} tag="h1" />
      <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Sorry, could not find the requested page.
      </p>
      <div style={{ maxWidth: '20rem' }}>
        <Button
          variant={'outlined'}
          label={'Back to Home'}
          href="/"
          style={{ justifyContent: 'center' }}
          activeColor="blue"
        />
      </div>
    </div>
  );
};

Custom404.getLayout = getLayoutFn('page');
export default Custom404;
