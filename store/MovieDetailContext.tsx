import {
  FormEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import useModal from '@/hooks/useModal';
import useUserRate from '@/hooks/useUserRate';
import { UserRateType } from '@/types';
import { MovieState } from '@/types/movies';
import { logger } from '@/utils/logger';

interface MovieDetailContextType {
  movie: MovieState | null;
  userRate: UserRateType;
  isActiveStars: boolean[];
  onClickStar: (rate: UserRateType) => void;
  onHoverStar: (rate: UserRateType) => void;
  resetRate: () => void;
  handleFormSubmit: (e: FormEvent) => void;
  handleResetBtnClick: () => void;
  userNoteInputRef: RefObject<HTMLTextAreaElement> | undefined;
  cliped: boolean;
  watched: boolean;
  handleClipedStatus: () => void;
  handleWatchedStatus: () => void;
  videoId: string | undefined;
  isYouTubeModalOpen: boolean;
  closeYouTubeModal: () => void;
  openYouTubeModal: () => void;
}

const MovieDetailContext = createContext<MovieDetailContextType>({
  movie: null,
  userRate: 0,
  isActiveStars: [],
  onClickStar: () => undefined,
  onHoverStar: () => undefined,
  resetRate: () => undefined,
  handleFormSubmit: () => undefined,
  handleResetBtnClick: () => undefined,
  userNoteInputRef: undefined,
  cliped: false,
  watched: false,
  handleClipedStatus: () => undefined,
  handleWatchedStatus: () => undefined,
  videoId: undefined,
  isYouTubeModalOpen: false,
  closeYouTubeModal: () => undefined,
  openYouTubeModal: () => undefined,
});

export const MovieDetailContextProvider = ({
  children,
  movie,
}: {
  children: ReactNode;
  movie: MovieState;
}) => {
  const { userRate, isActiveStars, onClickStar, onHoverStar, resetRate } =
    useUserRate();
  const userNoteInputRef = useRef<HTMLTextAreaElement>(null);
  const {
    isModalOpen: isYouTubeModalOpen,
    closeModal: closeYouTubeModal,
    openModal: openYouTubeModal,
  } = useModal();
  const [watched, setWacthed] = useState<boolean>(false);
  const [cliped, setCliped] = useState<boolean>(false);

  const videoId = movie.videos?.results[0].key;

  const handleClipedStatus = () => {
    setCliped((prev) => !prev);
  };
  const handleWatchedStatus = () => {
    setWacthed((prev) => !prev);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    logger.log({ userRate, userNoteInput: userNoteInputRef.current?.value });
  };

  const handleResetBtnClick = () => {
    resetRate();

    if (userNoteInputRef.current) {
      userNoteInputRef.current.value = '';
    }
  };

  const context: MovieDetailContextType = {
    movie,
    userRate,
    isActiveStars,
    onClickStar,
    onHoverStar,
    resetRate,
    handleFormSubmit,
    handleResetBtnClick,
    userNoteInputRef,
    cliped,
    watched,
    handleClipedStatus,
    handleWatchedStatus,
    videoId,
    isYouTubeModalOpen,
    closeYouTubeModal,
    openYouTubeModal,
  };

  return (
    <MovieDetailContext.Provider value={context}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export default MovieDetailContext;
export const useMovieDetailContext = () => useContext(MovieDetailContext);
