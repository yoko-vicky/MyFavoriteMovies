import YouTube, { YouTubeEvent } from 'react-youtube';
import { logger } from '@/utils/logger';

export const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onReady = (event: YouTubeEvent<any>) => {
    // Access the player instance
    const player = event.target;
    logger.log('Player ready', player);

    // player.playVideo();
  };

  const onError = (error: YouTubeEvent<number>) => {
    logger.error('YouTube Player Error:', error);
  };

  return <YouTube videoId={videoId} onReady={onReady} onError={onError} />;
};

export default YouTubePlayer;
