import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createImageUrl } from '@/lib/tmdb';
import { MovieState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import styles from './MoviesListItem.module.scss';
import MovieAtt from '../MovieAtt/MovieAtt';
import { UserMovieAtt } from '../UserMovieAtt';

export const MoviesListItem = ({
  movie,
  userMovie,
}: {
  movie: MovieState | undefined;
  userMovie: UserMovieState | undefined;
}) => {
  if (!movie) {
    return <></>;
  }
  return (
    <div className={styles.movie}>
      <Image
        src={createImageUrl(movie?.poster_path)}
        alt={movie?.title}
        width={200}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw"
      />
      <Link href={`/movies/${movie?.id}`} className={styles.link} />
      {userMovie?.movie ? (
        <UserMovieAtt movie={userMovie.movie} stars={userMovie.stars} />
      ) : (
        <MovieAtt movie={movie} />
      )}
    </div>
  );
};

export default MoviesListItem;
