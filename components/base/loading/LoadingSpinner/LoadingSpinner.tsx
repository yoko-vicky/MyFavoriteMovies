import React from 'react';
import clsx from 'clsx';
import { LoadingHeight, LoadingWidth, SpinnerSize } from '@/types';
import styles from './LoadingSpinner.module.scss'
import { Spinner } from '../Spinner';

interface LoadingSpinnerPropsType {
  height?: LoadingHeight;
  width?: LoadingWidth;
  size?: SpinnerSize;
}

export const LoadingSpinner = ({
  height,
  width,
  size = 'md',
}: LoadingSpinnerPropsType) => {
  return (
    <div
      className={clsx(
        styles.container,
        height ? styles[`h-${height}`] : '',
        width ? styles[`w-${width}`] : '',
      )}
    >
      <Spinner size={size} />
    </div>
  );
};

export default LoadingSpinner;
