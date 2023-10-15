import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { Button } from '@/components/base/Button';
import { GenrePills } from '@/components/base/GenrePills';
import { Modal } from '@/components/base/Modal';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import useModal from '@/hooks/useModal';
import { createImageUrl } from '@/lib/tmdb';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { getReleaseYear } from '@/utils';
import { logger } from '@/utils/logger';
import { AiOutlineYoutube } from 'react-icons/ai';
import { Credits } from './Credits';
import styles from './MovieDetail.module.scss';
import { Story } from './Story';
import { UserComment } from './UserComment';
import { Vote } from './Vote';

const Reviews = dynamic(() => import('./Reviews/Reviews'), { ssr: false });

export const MovieDetail = () => {
  const { data: session } = useSession();
  const { movie } = useMovieDetailContext();
  const { isModalOpen, toggleModal, closeModal, openModal } = useModal();

  const handleYoutubeModalOpenBtnClick = () => {
    openModal();
  };

  if (!movie) {
    return <LoadingSpinner />;
  }
  logger.log({ movie });

  return (
    <>
      <div className={styles.container}>
        {movie?.backdrop_path && (
          <div className={styles.mainVisualWrapper}>
            <div className={styles.mainVisual}>
              <Image
                src={createImageUrl(movie.backdrop_path, 'w1280')}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />
            </div>
            <div className={styles.logoWrapper}>
              {movie.images?.logos[0] ? (
                <Image
                  src={createImageUrl(movie.images?.logos[0].file_path, 'w500')}
                  alt={movie.title}
                  // fill
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.logoImage}
                  width={300}
                  height={40}
                />
              ) : (
                'TITLE'
              )}
            </div>
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
              <Button
                variant={'outlined'}
                label={'See Video'}
                Icon={AiOutlineYoutube}
                activeColor="blue"
                onClick={handleYoutubeModalOpenBtnClick}
                activeFlag={isModalOpen}
              />
              <h1 className={clsx(styles.title, styles.mob)}>{movie?.title}</h1>
              <div className={styles.release}>
                <span>{getReleaseYear(movie.release_date) || ''}</span>
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
              <Story story={movie.overview} />
              {/* <div>original Language: {movie.original_language}</div> */}
              <Credits credits={movie.credits} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>This is Modal to Show</Modal>
      )}
    </>
  );
};

export default MovieDetail;
