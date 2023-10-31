import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { UserMovieState } from '@/types/user';
import styles from './MoviesListItem.module.scss';

export const MoviesListItem = ({
  userMovie,
}: {
  userMovie: UserMovieState;
}) => {
  if (!userMovie.movie) {
    return <></>;
  }
  return (
    <div className={styles.movie}>
      <Link href={`/movies/${userMovie.movie?.id}`}>
        <Image
          src={createImageUrl(userMovie.movie?.poster_path)}
          alt={userMovie.movie?.title}
          width={200}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
        />
      </Link>
    </div>
  );
};

export default MoviesListItem;
