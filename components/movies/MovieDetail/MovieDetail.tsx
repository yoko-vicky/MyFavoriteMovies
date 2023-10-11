import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { YouTubePlayer } from '@/components/base/YouTubePlayer';
import { createImageUrl, getMovieVideosById } from '@/lib/tmdb';
import { errorToastify } from '@/lib/toast';
import { MovieState } from '@/types/movies';
import { logger } from '@/utils/logger';
import styles from './MovieDetail.module.scss';

interface MovieDetailPropsType {
  movie: MovieState;
}

export const MovieDetail = ({ movie }: MovieDetailPropsType) => {
  const [videoKey, setVideoKey] = useState<string>('');
  const requestedOnce = useRef<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { data: session } = useSession();
  const getVideo = async (movieId: number) => {
    try {
      const res = await getMovieVideosById(movieId);
      if (res?.results?.length) {
        setVideoKey(res.results[0].key);
      }
    } catch (error) {
      logger.log({ error });
      errorToastify();
    }
  };

  useEffect(() => {
    if (!movie || videoKey || requestedOnce.current) return;

    if (movie?.videos?.results?.length) {
      setVideoKey(movie.videos.results[0].key);
      return;
    }

    getVideo(movie.id);
    requestedOnce.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id, movie?.videos?.results, videoKey, requestedOnce.current]);

  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        {videoKey && <YouTubePlayer videoId={videoKey} />}
        {movie?.backdrop_path && (
          <Image
            src={createImageUrl(movie.backdrop_path)}
            alt={movie.title}
            width={500}
            height={500}
          />
        )}
        {movie?.images?.logos && (
          <Image
            src={createImageUrl(movie.images.logos[0].file_path)}
            alt={movie.title}
            width={500}
            height={500}
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.overview}>
          <div className={styles.posterImageWrapper}>
            <Image
              src={createImageUrl(movie.poster_path)}
              width={300}
              height={300}
              alt={movie.title}
            />
          </div>
          <h1 className={styles.title}>{movie?.title}</h1>
          {session && (
            <div className={styles.comment}>
              <div>Your Comment</div>
              <div>📎 Add to my Clips</div>
              <div>☑️ Watched</div>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
              <input type="textarea" placeholder="So nice!" />
            </div>
          )}
          <div>Popularity: {movie.popularity}</div>
          <div>original Language: {movie.original_language}</div>
          <div>Vote Avarage: {movie.vote_average}</div>
          <div>Vote Count: {movie.vote_count}</div>
          <div>Release: {movie.release_date}</div>
          <div>Reviews</div>
          <div>他にこの映画をお気に入りに登録しているユーザー</div>
          <div>User1, user2, user3...</div>
          <div>Review</div>
          {movie.reviews?.results.map((review) => (
            <div key={review.id}>
              <div>{review.author}</div>
              <div>{review.content}</div>
              <div>{review.author_details.avatar_path}</div>
              <div>{review.url}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? 'Hide Details' : 'Show More Details'}
        </button>
        {showDetails && (
          <div className={styles.details}>
            <div className={styles.story}>{movie.overview}</div>
            <div>
              {movie.genres &&
                movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name},</span>
                ))}
            </div>

            <h3 className={styles.subTitle}>Credits</h3>
            <div className={styles.creditGroup}>
              <h4>Cast:</h4>
              {movie.credits?.cast.map((ca) => (
                <span key={ca.id}>{ca.name}</span>
              ))}
            </div>
            <div className={styles.creditGroup}>
              <h4>Crew:</h4>
              {movie.credits?.crew.map((cr) => (
                <span key={cr.id}>{cr.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
