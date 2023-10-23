/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { msgs } from '@/constants';
import useModal from '@/hooks/useModal';
import useReviewField from '@/hooks/useReviewField';
import useSessionData from '@/hooks/useSessionData';
import useUserRate from '@/hooks/useUserRate';
import { updateData } from '@/lib/axios';
import { ToastId, loadingToastify, updateToastify } from '@/lib/toast';
import { UserRateType } from '@/types';
import { MovieState, UpdateUserMovieState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
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
  listed: boolean;
  watched: boolean;
  handleListedStatus: () => void;
  handleWatchedStatus: () => void;
  videoId: string | undefined;
  isYouTubeModalOpen: boolean;
  closeYouTubeModal: () => void;
  openYouTubeModal: () => void;
  targetUserMovie: UserMovieState | undefined;
  isShowForm: boolean;
  toggleShowForm: () => void;
  isShowUserComment: boolean;
  toggleIsShowUserComment: () => void;
  isUpdatingUserMovieRef: MutableRefObject<boolean> | undefined;
  review: string;
  handleChangeReview: (e: ChangeEvent<HTMLTextAreaElement>) => void;
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
  listed: false,
  watched: false,
  handleListedStatus: () => undefined,
  handleWatchedStatus: () => undefined,
  videoId: undefined,
  isYouTubeModalOpen: false,
  closeYouTubeModal: () => undefined,
  openYouTubeModal: () => undefined,
  targetUserMovie: undefined,
  isShowForm: false,
  toggleShowForm: () => undefined,
  isShowUserComment: false,
  toggleIsShowUserComment: () => undefined,
  isUpdatingUserMovieRef: undefined,
  review: '',
  handleChangeReview: () => undefined,
});

export const MovieDetailContextProvider = ({
  children,
  movie,
}: {
  children: ReactNode;
  movie: MovieState;
}) => {
  const { updateSession, sessionData } = useSessionData();
  const targetUserMovie = sessionData?.user.userMovies?.find(
    (um) => um.movieId === movie.id,
  );
  const { userRate, isActiveStars, onClickStar, onHoverStar, resetRate } =
    useUserRate((targetUserMovie?.stars as UserRateType) || 0);
  const {
    isModalOpen: isYouTubeModalOpen,
    closeModal: closeYouTubeModal,
    openModal: openYouTubeModal,
  } = useModal();
  const { review, handleChangeReview, clearReviewField } = useReviewField(
    targetUserMovie?.comment,
  );
  const [watched, setWacthed] = useState<boolean>(false);
  const [listed, setListed] = useState<boolean>(false);

  const isUpdatingUserMovieRef = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emitUpdateRequestTimer = useRef<any>(null);

  const videoId = movie.videos?.results[0].key;
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isShowUserComment, setIsShowUserComment] = useState<boolean>(false);

  const toggleShowForm = () => setIsShowForm((prev) => !prev);
  const toggleIsShowUserComment = () => setIsShowUserComment((prev) => !prev);

  const updateUserMovie = async (
    state: UpdateUserMovieState,
    signal?: AbortSignal,
  ) => {
    logger.log('Run updateUserMovie', state);
    if (!sessionData || !sessionData.user) return;

    const loadingId: ToastId = loadingToastify();

    try {
      isUpdatingUserMovieRef.current = true;
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
      isUpdatingUserMovieRef.current = false;
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    logger.log({ userRate, review });
    try {
      updateUserMovie({
        status: {
          stars: userRate,
          comment: review,
        },
        movie,
      });
      setIsShowForm(false);
    } catch (error) {
      logger.log({ error });
    }
  };

  const handleListedStatus = () => {
    setListed((prev) => !prev);
  };

  const handleWatchedStatus = () => {
    setWacthed((prev) => !prev);
  };

  const handleResetBtnClick = () => {
    resetRate();
    clearReviewField();
  };

  useEffect(() => {
    if (!targetUserMovie) return;

    setListed(targetUserMovie.listed);
  }, [targetUserMovie?.listed]);

  useEffect(() => {
    if (!targetUserMovie) return;

    setWacthed(targetUserMovie.watched);
  }, [targetUserMovie?.watched]);

  useEffect(() => {
    if (
      isUpdatingUserMovieRef.current ||
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
    isUpdatingUserMovieRef.current,
  ]);

  useEffect(() => {
    if (!watched) {
      setIsShowUserComment(false);
      setIsShowForm(false);
      return;
    }

    if (
      targetUserMovie?.comment ||
      (targetUserMovie?.stars && targetUserMovie?.stars !== 0)
    ) {
      // setIsShowForm(false);
      setIsShowUserComment(true);
    } else {
      setIsShowForm(true);
      setIsShowUserComment(false);
    }

    // if (
    //   !targetUserMovie?.comment &&
    //   !targetUserMovie?.stars &&
    //   targetUserMovie?.stars !== 0
    // ) {
    //   setIsShowForm(true);
    // }
  }, [
    targetUserMovie,
    targetUserMovie?.comment,
    targetUserMovie?.stars,
    watched,
  ]);

  useEffect(() => {
    isUpdatingUserMovieRef.current = false;
  }, []);

  const context: MovieDetailContextType = {
    movie,
    userRate,
    isActiveStars,
    onClickStar,
    onHoverStar,
    resetRate,
    handleResetBtnClick,
    listed,
    watched,
    handleListedStatus,
    handleWatchedStatus,
    videoId,
    isYouTubeModalOpen,
    closeYouTubeModal,
    openYouTubeModal,
    targetUserMovie,
    isShowForm,
    toggleShowForm,
    isShowUserComment,
    toggleIsShowUserComment,
    isUpdatingUserMovieRef,
    handleFormSubmit,
    review,
    handleChangeReview,
  };

  return (
    <MovieDetailContext.Provider value={context}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export default MovieDetailContext;
export const useMovieDetailContext = () => useContext(MovieDetailContext);
