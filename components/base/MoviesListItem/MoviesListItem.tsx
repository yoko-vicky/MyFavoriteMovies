import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { MovieState } from '@/types/movies';
import styles from './MoviesListItem.module.scss';

export const MoviesListItem = ({
  movie,
}: {
  movie: MovieState;
}) => {
  if (!movie) {
    return <></>;
  }
  return (
    <div className={styles.movie}>
      <Link href={`/movies/${movie?.id}`}>
        <Image
          src={createImageUrl(movie?.poster_path)}
          alt={movie?.title}
          width={200}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
        />
      </Link>
    </div>
  );
};

export default MoviesListItem;
