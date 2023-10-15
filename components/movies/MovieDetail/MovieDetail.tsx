import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GenrePills } from '@/components/base/GenrePills';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { createImageUrl } from '@/lib/tmdb';
import uuid from '@/lib/uuid';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { getReleaseYear } from '@/utils';
import { Credits } from './Credits';
import styles from './MovieDetail.module.scss';
import { UserComment } from './UserComment';
import { Vote } from './Vote';

const Reviews = dynamic(() => import('./Reviews/Reviews'), { ssr: false });

export const MovieDetail = () => {
  const { data: session } = useSession();
  const { movie } = useMovieDetailContext();

  if (!movie) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      {movie?.backdrop_path && (
        <div className={styles.mainVisual}>
          <Image
            src={createImageUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.posterImageWrapper}>
            <Image
              src={createImageUrl(movie?.poster_path)}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              alt={movie.title}
            />
          </div>
          <div className={styles.overview}>
            <h1 className={styles.title}>{movie?.title}</h1>
            <div className={styles.release}>
              {getReleaseYear(movie.release_date)}
            </div>
            <GenrePills genres={movie.genres} />
            <Vote voteAvg={movie.vote_average} voteCount={movie.vote_count} />
            {!!movie.reviews?.results?.length && (
              <Reviews reviews={movie.reviews.results} />
            )}
            {/* <div>他にこの映画をお気に入りに登録しているユーザー(β)</div>
            <div>User1, user2, user3...</div> */}
          </div>
        </div>
        <div className={styles.right}>
          {session && <UserComment />}
          <div className={styles.storyCredits}>
            <div className={styles.story}>
              <div className="title">Story</div>
              <div>{movie.overview}</div>
            </div>
            <div>original Language: {movie.original_language}</div>
            <Credits credits={movie.credits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
