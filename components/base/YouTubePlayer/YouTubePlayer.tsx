import ReactPlayer from 'react-player';
// import { logger } from '@/utils/logger';

const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;

export const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  return (
    <ReactPlayer
      url={`${youtubeUrl}${videoId}`}
      width="100%"
      height="100%"
      controls
      muted
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
    />
  );
};

export default YouTubePlayer;
