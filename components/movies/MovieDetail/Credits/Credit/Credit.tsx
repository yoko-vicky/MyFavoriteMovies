import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@/components/base/Button';
import { baseImageUrl } from '@/lib/tmdb';
import uuid from '@/lib/uuid';
import { CreditItemState } from '@/types/movies';
// import { logger } from '@/utils/logger';
import styles from './Credit.module.scss';

export const Credit = ({
  credits,
  title,
}: {
  credits: CreditItemState[];
  title: string;
}) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  const creditsToShow = showFull
    ? [...new Set(credits)]
    : [...new Set(credits.slice(0, 12))];

  const handleShowMoreClick = () => {
    setShowFull((prev) => !prev);
  };
  const isCast = title.toLowerCase() === 'cast';

  return (
    <div key={uuid()} className={styles.container}>
      <div className={styles.title}>{title + 's'}</div>
      <div className={clsx(styles.content, isCast ? styles.isCast : '')}>
        {creditsToShow.map((credit, index) => {
          return (
            <div
              key={uuid()}
              className={clsx(styles.credit, isCast ? styles.isCast : '')}
            >
              {isCast && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={baseImageUrl + '/original' + credit.profile_path}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 10vw"
                    alt={credit.name}
                  />
                </div>
              )}
              <div
                className={clsx(
                  styles.name,
                  isCast ? styles.isCast : '',
                  credits.length === index + 1 ? styles.last : '',
                )}
              >
                {!!credit.job && (
                  <span className={styles.job}>{credit.job}</span>
                )}
                {credit.name}
              </div>
            </div>
          );
        })}
      </div>
      <Button
        variant={'simple'}
        label={showFull ? 'Show Less ' : 'Show More ' + title}
        onClick={handleShowMoreClick}
      />
    </div>
  );
};

export default Credit;
