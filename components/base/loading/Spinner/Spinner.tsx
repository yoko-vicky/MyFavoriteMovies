import React from 'react';
import clsx from 'clsx';
import { SpinnerSize } from '@/types/index';
import styles from './Spinner.module.scss';

export const Spinner = ({ size = 'md' }: { size?: SpinnerSize }) => {
  return (
    <div className={clsx(styles.spinner, styles[size])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
