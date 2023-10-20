import React from 'react';
import { IconButton } from '@/components/base/IconButton';
import { useMovieDetailContext } from '@/store/MovieDetailContext';
import { ImYoutube2 } from 'react-icons/im';
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
        {!!videoId && (
          <IconButton
            Icon={ImYoutube2}
            onClick={openYouTubeModal}
            activeColor="red"
            outerLink={false}
            iconSize="xlg"
          />
        )}
      </div>
      <div>{movie.overview}</div>
    </div>
  );
};

export default Story;
