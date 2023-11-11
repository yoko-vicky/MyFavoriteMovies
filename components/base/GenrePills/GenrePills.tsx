import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import uuid from '@/lib/uuid';
import { MovieGenrePillState } from '@/types/movies';
import styles from './GenrePills.module.scss';

export const GenrePills = ({
  genres,
  inHome,
}: {
  genres: MovieGenrePillState[];
  inHome?: boolean;
}) => {
  return (
    <>
      {!!genres && genres.length > 0 && (
        <div className={clsx(styles.genres, inHome ? styles.inHome : '')}>
          {genres.map((genre) => (
            <Link
              key={uuid()}
              href={`/genres/${genre.id}`}
              className={clsx(styles.genre, inHome ? styles.inHome : '')}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default GenrePills;
