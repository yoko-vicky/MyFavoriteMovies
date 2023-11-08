import React from 'react';
import uuid from '@/lib/uuid';
import { CreditState } from '@/types/movies';
// import { logger } from '@/utils/logger';
import { Credit } from './Credit';
import styles from './Credits.module.scss';

interface CreditsPropsType {
  credits: CreditState | undefined;
}

export const Credits = ({ credits }: CreditsPropsType) => {
  // logger.log({ credits });

  if (!credits) {
    return <></>;
  }

  return (
    <div className={styles.credits}>
      {Object.keys(credits).map((key: string) => (
        <Credit key={uuid()} credits={credits[key]} title={key} />
      ))}
    </div>
  );
};

export default Credits;
