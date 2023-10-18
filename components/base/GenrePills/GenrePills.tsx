import React from 'react';
import Link from 'next/link';
import uuid from '@/lib/uuid';
import { MovieGenreState } from '@/types/movies';
import styles from './GenrePills.module.scss';

export const GenrePills = ({
  genres,
}: {
  genres: MovieGenreState[] | undefined;
}) => {
  return (
    <>
      {!!genres && genres.length > 0 && (
        <div className={styles.genres}>
          {genres.map((genre) => (
            <Link
              key={uuid()}
              href={`/genres/${genre.id}`}
              className={styles.genre}
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
