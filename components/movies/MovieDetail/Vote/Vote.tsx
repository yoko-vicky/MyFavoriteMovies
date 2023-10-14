import React from 'react';
import styles from './Vote.module.scss';

interface VoteProps {
  voteAvg: number;
  voteCount: number;
}

export const Vote = ({ voteAvg, voteCount }: VoteProps) => {
  return (
    <>
      {!!voteAvg && (
        <div className={styles.vote}>
          <div className={styles.voteTitle}>Vote Avarage</div>
          <div className={styles.voteAvg}>{voteAvg}</div>
        </div>
      )}
      {!!voteCount && (
        <div className={styles.vote}>
          <div className={styles.voteTitle}>Vote Count</div>
          <div className={styles.voteCount}>{voteCount.toLocaleString()}</div>
        </div>
      )}
    </>
  );
};

export default Vote;
