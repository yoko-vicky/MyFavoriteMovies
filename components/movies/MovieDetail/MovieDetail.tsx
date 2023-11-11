import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { Button } from '@/components/base/Button';
import { GenrePills } from '@/components/base/GenrePills';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import { YouTubePlayerModal } from '@/components/modals/YouTubePlayerModal';
import { createImageUrl } from '@/lib/tmdb';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { MovieGenrePillState } from '@/types/movies';
import { getReleaseYear } from '@/utils';
import { ImYoutube2 } from 'react-icons/im';
import { Credits } from './Credits';
import styles from './MovieDetail.module.scss';
import { Story } from './Story';
import { UserComment } from './UserComment';
import { Vote } from './Vote';

const Reviews = dynamic(() => import('./Reviews/Reviews'), { ssr: false });

export const MovieDetail = () => {
  const { data: session } = useSession();
  const {
    movie,
    videoId,
    isYouTubeModalOpen,
    closeYouTubeModal,
    openYouTubeModal,
    movieReviewsToShow,
  } = useMovieDetailContext();

  const movieGenreForPills = movie?.genres
    ?.map((genre) => ({
      id: genre.originGenreId,
      name: genre.name,
    }))
    .filter((mv) => !!mv.id) as MovieGenrePillState[];

  const handleYoutubeModalOpenBtnClick = () => {
    openYouTubeModal();
  };

  if (!movie) {
    return <LoadingSpinner />;
  }
  // logger.log({ movie });

  return (
    <>
      <div className={styles.container}>
        {!!movie?.backdrop_path && (
          <div className={styles.mainVisualWrapper}>
            <div className={styles.mainVisual}>
              <Image
                src={createImageUrl(movie.backdrop_path, 'original')}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />
            </div>

            {movie.images?.logos[0] ? (
              <div className={styles.logoWrapper}>
                <Image
                  src={createImageUrl(movie.images?.logos[0].file_path, 'w500')}
                  alt={movie.title}
                  // fill
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.logoImage}
                  width={300}
                  height={40}
                />
              </div>
            ) : (
              <div className={styles.movieTitleInImage}>{movie.title}</div>
            )}
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.left}>
            <h1 className={clsx(styles.title, styles.tab)}>{movie?.title}</h1>
            <div className={styles.posterImageWrapper}>
              <Image
                src={createImageUrl(movie?.poster_path)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                alt={movie.title}
                className={styles.posterImage}
              />
            </div>
            <div className={styles.overview}>
              {!!videoId && (
                <div className={styles.youtubeOpenModalBtnWrapper}>
                  <Button
                    variant={'outlined'}
                    label={'Watch Trailer on'}
                    Icon={ImYoutube2}
                    iconPos={'after'}
                    iconSize={'lg'}
                    activeColor="red"
                    onClick={handleYoutubeModalOpenBtnClick}
                    activeFlag={isYouTubeModalOpen}
                    className={styles.youtubeOpenModalBtn}
                    align="center"
                  />
                </div>
              )}
              <h1 className={clsx(styles.title, styles.mob)}>{movie?.title}</h1>
              <div className={styles.release}>
                <span>{getReleaseYear(movie.release_date) || ''}</span>
              </div>
              {movieGenreForPills && <GenrePills genres={movie.genres} />}
              <Vote voteAvg={movie.vote_average} voteCount={movie.vote_count} />

              {!!movieReviewsToShow.length && (
                <Reviews reviews={movieReviewsToShow} />
              )}
            </div>
          </div>
          <div className={styles.right}>
            {!!session && <UserComment />}
            <div className={styles.storyCredits}>
              <Story />
              {/* <div>original Language: {movie.original_language}</div> */}
              <Credits credits={movie.credits} />
            </div>
          </div>
        </div>
      </div>
      {!!videoId && isYouTubeModalOpen && (
        <YouTubePlayerModal videoId={videoId} closeModal={closeYouTubeModal} />
      )}
    </>
  );
};

export default MovieDetail;
