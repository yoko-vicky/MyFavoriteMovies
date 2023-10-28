/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useModal from '@/hooks/useModal';
import useReviewField from '@/hooks/useReviewField';
import useUserMovieState from '@/hooks/useUserMovieState';
import useUserRate from '@/hooks/useUserRate';
import { UserRateType } from '@/types';
import { MovieState, ReviewState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import { logger } from '@/utils/logger';
import { useUserSessionDataContext } from './UserSessionDataContext';

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
  handleListedButtonClick: () => void;
  handleWatchedButtonClick: () => void;
  videoId: string | undefined;
  isYouTubeModalOpen: boolean;
  closeYouTubeModal: () => void;
  openYouTubeModal: () => void;
  targetUserMovie: UserMovieState | undefined;
  isShowForm: boolean;
  toggleShowForm: () => void;
  isShowUserComment: boolean;
  toggleIsShowUserComment: () => void;
  review: string;
  handleChangeReview: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isPublicReview: boolean;
  toggleIsPublicReview: () => void;
  movieReviewsToShow: ReviewState[];
  isUpdatingWatchedRef: MutableRefObject<boolean> | undefined;
  isUpdatingListedRef: MutableRefObject<boolean> | undefined;
  isUpdatingReviewRef: MutableRefObject<boolean> | undefined;
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
  handleListedButtonClick: () => undefined,
  handleWatchedButtonClick: () => undefined,
  videoId: undefined,
  isYouTubeModalOpen: false,
  closeYouTubeModal: () => undefined,
  openYouTubeModal: () => undefined,
  targetUserMovie: undefined,
  isShowForm: false,
  toggleShowForm: () => undefined,
  isShowUserComment: false,
  toggleIsShowUserComment: () => undefined,
  review: '',
  handleChangeReview: () => undefined,
  isPublicReview: false,
  toggleIsPublicReview: () => undefined,
  movieReviewsToShow: [],
  isUpdatingWatchedRef: undefined,
  isUpdatingListedRef: undefined,
  isUpdatingReviewRef: undefined,
});

export const MovieDetailContextProvider = ({
  children,
  movie,
  movieReviewsInDb,
}: {
  children: ReactNode;
  movie: MovieState;
  movieReviewsInDb: ReviewState[];
}) => {
  const { sessionUser } = useUserSessionDataContext();
  const videoId = movie.videos?.results[0].key;
  const movieId = movie.id;
  const targetUserMovie = sessionUser?.userMovies?.find(
    (um) => um.movieId === movieId,
  );
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isShowUserComment, setIsShowUserComment] = useState<boolean>(false);

  const {
    state: watched,
    handleButtonClick: handleWatchedButtonClick,
    isUpdatingRef: isUpdatingWatchedRef,
  } = useUserMovieState({
    movie,
    key: 'watched',
  });
  const {
    state: listed,
    handleButtonClick: handleListedButtonClick,
    isUpdatingRef: isUpdatingListedRef,
  } = useUserMovieState({
    movie,
    key: 'listed',
  });
  const { userRate, isActiveStars, onClickStar, onHoverStar, resetRate } =
    useUserRate((targetUserMovie?.stars as UserRateType) || 0);
  const {
    isModalOpen: isYouTubeModalOpen,
    closeModal: closeYouTubeModal,
    openModal: openYouTubeModal,
  } = useModal();
  const {
    review,
    handleChangeReview,
    handleFormSubmit,
    handleResetBtnClick,
    isPublicReview,
    // setIsPublicReview,
    isUpdatingReviewRef,
    toggleIsPublicReview,
  } = useReviewField({
    movie,
    userRate,
    setIsShowForm,
    resetRate,
  });

  const movieReviewsToShow = useMemo(() => {
    const tmdbReviews = movie?.reviews?.results || [];
    logger.log({ movieReviewsInDb, tmdbReviews: movie?.reviews?.results });
    return [...movieReviewsInDb, ...tmdbReviews];
  }, [movie?.reviews?.results, movieReviewsInDb]);

  const toggleShowForm = () => setIsShowForm((prev) => !prev);
  const toggleIsShowUserComment = () => setIsShowUserComment((prev) => !prev);

  useEffect(() => {
    if (!watched || isUpdatingWatchedRef.current) {
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
  }, [
    targetUserMovie,
    targetUserMovie?.comment,
    targetUserMovie?.stars,
    watched,
    isUpdatingWatchedRef.current,
  ]);

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
    handleListedButtonClick,
    handleWatchedButtonClick,
    videoId,
    isYouTubeModalOpen,
    closeYouTubeModal,
    openYouTubeModal,
    targetUserMovie,
    isShowForm,
    toggleShowForm,
    isShowUserComment,
    toggleIsShowUserComment,
    handleFormSubmit,
    review,
    handleChangeReview,
    isPublicReview,
    toggleIsPublicReview,
    movieReviewsToShow,
    isUpdatingWatchedRef,
    isUpdatingListedRef,
    isUpdatingReviewRef,
  };

  return (
    <MovieDetailContext.Provider value={context}>
      {children}
    </MovieDetailContext.Provider>
  );
};

export default MovieDetailContext;
export const useMovieDetailContext = () => useContext(MovieDetailContext);
