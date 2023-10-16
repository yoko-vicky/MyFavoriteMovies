import React from 'react';
import { IconButton } from '@/components/base/IconButton';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { TfiYoutube } from 'react-icons/tfi';
import styles from './Story.module.scss';

export const Story = () => {
  const { movie, videoId, openYouTubeModal } = useMovieDetailContext();

  if (!movie?.overview) {
    return <></>;
  }

  return (
    <div className={styles.story}>
      <div className={styles.title}>
        <span>Story</span>
        {videoId && (
          <IconButton
            Icon={TfiYoutube}
            onClick={openYouTubeModal}
            activeColor="red"
          />
        )}
      </div>
      <div>{movie.overview}</div>
    </div>
  );
};

export default Story;
