import React from 'react';
import clsx from 'clsx';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';
import styles from './FieldMsg.module.scss';

export const FieldMsg = ({ msg }: { msg: ValidateMsgState }) => {
  const isOkay = msg.type === ValidateMsgTypeState.OK || false;

  return (
    <div
      className={clsx(
        styles.msg,
        msg.type === ValidateMsgTypeState.OK ? styles.ok : styles.ng,
      )}
    >
      {isOkay ? <AiFillCheckCircle /> : <AiFillExclamationCircle />}
      <span className={styles.text}>{msg.msg}</span>
    </div>
  );
};

export default FieldMsg;
