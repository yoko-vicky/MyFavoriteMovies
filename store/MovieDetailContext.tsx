import {
  FormEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { msgs } from '@/constants';
import useModal from '@/hooks/useModal';
import useSessionData from '@/hooks/useSessionData';
import useUserRate from '@/hooks/useUserRate';
import { updateData } from '@/lib/axios';
import { ToastId, loadingToastify, updateToastify } from '@/lib/toast';
import { UserRateType } from '@/types';
import { MovieState, UpdateUserMovieState } from '@/types/movies';
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
  listed: boolean;
  watched: boolean;
  handleListedStatus: () => void;
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
  listed: false,
  watched: false,
  handleListedStatus: () => undefined,
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
  const { updateSession, sessionData, sessionUserMovies } = useSessionData();
  const { userRate, isActiveStars, onClickStar, onHoverStar, resetRate } =
    useUserRate();
  const userNoteInputRef = useRef<HTMLTextAreaElement>(null);
  const targetUserMovie = useMemo(
    () => sessionUserMovies?.find((um) => um.movieId === movie.id),
    [movie.id, sessionUserMovies],
  );
  const {
    isModalOpen: isYouTubeModalOpen,
    closeModal: closeYouTubeModal,
    openModal: openYouTubeModal,
  } = useModal();
  const [watched, setWacthed] = useState<boolean>(
    targetUserMovie?.watched || false,
  );
  const [listed, setListed] = useState<boolean>(
    targetUserMovie?.listed || false,
  );
  const isUpdatingUserMovie = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emitUpdateRequestTimer = useRef<any>(null);
  const videoId = movie.videos?.results[0].key;

  const updateUserMovie = async (
    state: UpdateUserMovieState,
    signal?: AbortSignal,
  ) => {
    if (!sessionData || !sessionData.user) return;

    const loadingId: ToastId = loadingToastify();
    isUpdatingUserMovie.current = true;

    try {
      const path = `/api/userMovies/${movie.id}?userId=${sessionData.user.id}`;
      const res = await updateData(
        path,
        {
          ...state,
        } as UpdateUserMovieState,
        signal,
      );

      logger.log({ res });

      if (res.status === 200) {
        setTimeout(() => {
          updateSession();
          updateToastify(loadingId, 'success', msgs.success.general);
        }, 1000);
      } else {
        updateToastify(loadingId, 'error', msgs.error.general);
      }
    } catch (error) {
      logger.error(error);
      updateToastify(loadingId, 'error', msgs.error.general);
    } finally {
      isUpdatingUserMovie.current = false;
    }
  };

  const handleListedStatus = () => {
    setListed((prev) => !prev);
  };

  const handleWatchedStatus = () => {
    setWacthed((prev) => !prev);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // logger.log({ userRate, userNoteInput: userNoteInputRef.current?.value });
  };

  const handleResetBtnClick = () => {
    resetRate();

    if (userNoteInputRef.current) {
      userNoteInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!targetUserMovie) return;

    logger.log('Update watched and listed!', {
      watched: targetUserMovie.watched,
      listed: targetUserMovie.listed,
    });
    setWacthed(targetUserMovie.watched);
    setListed(targetUserMovie.listed);
  }, [targetUserMovie]);

  useEffect(() => {
    if (
      isUpdatingUserMovie.current ||
      (targetUserMovie?.watched === watched &&
        targetUserMovie?.listed === listed)
    ) {
      clearTimeout(emitUpdateRequestTimer.current);
      logger.log('Just Canceled previous request and timer');
      return;
    }

    if (emitUpdateRequestTimer.current) {
      clearTimeout(emitUpdateRequestTimer.current);
      logger.log('Canceled previous request and Set new Timer!');
    }

    const controller = new AbortController();

    emitUpdateRequestTimer.current = setTimeout(() => {
      updateUserMovie(
        {
          status: { watched, listed },
          movie,
        } as UpdateUserMovieState,
        controller.signal,
      );
    }, 5000);

    () => {
      clearTimeout(emitUpdateRequestTimer.current);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    movie,
    targetUserMovie?.watched,
    targetUserMovie?.listed,
    watched,
    listed,
    isUpdatingUserMovie.current,
  ]);

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
    listed,
    watched,
    handleListedStatus,
    handleWatchedStatus,
    videoId,
    isYouTubeModalOpen,
    closeYouTubeModal,
    openYouTubeModal,
  };

  logger.log({ isUpdatingUserMovie: isUpdatingUserMovie.current });
  logger.log({ userMovies: sessionData?.user.userMovies });

  return (
    <MovieDetailContext.Provider value={context}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export default MovieDetailContext;
export const useMovieDetailContext = () => useContext(MovieDetailContext);
