import React from 'react';
import uuid from '@/lib/uuid';
import { CreditState } from '@/types/movies';
import { logger } from '@/utils/logger';
import styles from './Credits.module.scss';

interface CreditsPropsType {
  credits: CreditState | undefined;
}

export const Credits = ({ credits }: CreditsPropsType) => {
  logger.log({ credits });

  if (!credits) {
    return <></>;
  }

  return (
    <div className={styles.credits}>
      <h3 className={styles.title}>Credits</h3>
      {Object.keys(credits).map((key: string) => {
        const subTitle = key[0].toUpperCase() + key.slice(1);
        return (
          <div key={uuid()} className={styles.creditGroup}>
            <div className={styles.subTitle}>{subTitle}</div>
            {credits[key].map((ca, index) => {
              return <span key={uuid()}>{ca.name}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Credits;
