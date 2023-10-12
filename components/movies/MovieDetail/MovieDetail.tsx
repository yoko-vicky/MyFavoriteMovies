import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { createImageUrl } from '@/lib/tmdb';
import uuid from '@/lib/uuid';
import { MovieState } from '@/types/movies';
import { getReleaseYear } from '@/utils';
import { BiSolidUserCircle } from 'react-icons/bi';
import styles from './MovieDetail.module.scss';
import { GenrePills } from '@/components/base/GenrePills';

interface MovieDetailPropsType {
  movie: MovieState;
}

export const MovieDetail = ({ movie }: MovieDetailPropsType) => {
  const { data: session } = useSession();

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
              src={createImageUrl(movie.poster_path)}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              alt={movie.title}
            />
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{movie?.title}</h1>
            <div>{getReleaseYear(movie.release_date)}</div>
            <GenrePills genres={movie.genres} />
            <div>Vote Avarage: {movie.vote_average}</div>
            <div>Vote Count: {movie.vote_count}</div>

            <div>Reviews</div>
            {movie.reviews?.results.map((review) => (
              <div key={uuid()}>
                <div>{review.author}</div>
                <div>{review.content}</div>
                <div>{review.author_details.avatar_path}</div>

                {review.author_details.avatar_path ? (
                  <div className={styles.authorImageWrapper}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_AUTHOR_IMAGE_URL}${review.author_details.avatar_path}`}
                      alt={review.author}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw"
                    />
                  </div>
                ) : (
                  <BiSolidUserCircle className={styles.authorIcon} />
                )}
              </div>
            ))}
            <div>他にこの映画をお気に入りに登録しているユーザー(β)</div>
            <div>User1, user2, user3...</div>
          </div>
        </div>
        <div className={styles.right}>
          {session && (
            <div className={styles.comment}>
              <div>Your Comment</div>
              <div>📎 Add to my Clips</div>
              <div>☑️ Watched</div>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
              <input type="textarea" placeholder="So nice!" />
            </div>
          )}
          <div className={styles.storyCredits}>
            <div className={styles.story}>{movie.overview}</div>
            <div>original Language: {movie.original_language}</div>
            <h3 className={styles.subTitle}>Credits</h3>
            <div className={styles.creditGroup}>
              <h4>Cast:</h4>
              {movie.credits?.cast.map((ca) => (
                <span key={uuid()}>{ca.name}</span>
              ))}
            </div>
            <div className={styles.creditGroup}>
              <h4>Crew:</h4>
              {movie.credits?.crew.map((cr) => (
                <span key={uuid()}>{cr.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
