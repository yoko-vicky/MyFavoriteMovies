import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { USER_REVIEW_MAX_LENGTH, formVal } from '@/constants';
import { getData, updateUserMovie } from '@/lib/axios';
import { errorToastify } from '@/lib/toast';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { MovieState, ReviewState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import {
  createReviewItemsFromUserMoviesInDb,
  removeExtraSpaceFromStr,
} from '@/utils';
import { logger } from '@/utils/logger';

const useReviewField = ({
  movie,
  userRate,
  setIsShowForm,
  resetRate,
  updateMovieReviewsInDb,
}: {
  movie: MovieState;
  userRate: number;
  setIsShowForm: Dispatch<SetStateAction<boolean>>;
  resetRate: () => void;
  updateMovieReviewsInDb: (newReviewsInDb: ReviewState[]) => void;
}) => {
  const { updateSession, sessionUser, sessionUserMovies } =
    useUserSessionDataContext();

  const targetUserMovie = sessionUserMovies?.find(
    (um) => um.movieId === movie.id,
  );

  const initialReview = targetUserMovie?.comment;
  const initialIsPublicReview = targetUserMovie?.isPublicReview;

  const [review, setReview] = useState<string>('');
  const [reviewMsg, setReviewMsg] = useState<ValidateMsgState | null>(null);
  const [isPublicReview, setIsPublicReview] = useState<boolean>(false);
  const [isUpdatingReview, setIsUpdatingReview] = useState<boolean>(false);
  const timeToGetReviewsRef = useRef<boolean>(false);

  const isReviewOkay =
    review === initialReview ||
    (!!review && review.length === 0) ||
    reviewMsg?.type === ValidateMsgTypeState.OK;

  const toggleIsPublicReview = () => setIsPublicReview((prev) => !prev);
  const handleChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewMsg(null);
    const newreview = e.target.value;
    setReview(newreview);
  };

  const resetReviewMsg = () => {
    setReviewMsg(null);
  };

  const validateReview = () => {
    const newreview = removeExtraSpaceFromStr(review);
    setReview(newreview);

    setReviewMsg(null);

    const isCorrectLength = newreview.length <= USER_REVIEW_MAX_LENGTH;

    if (!isCorrectLength) {
      setReviewMsg({
        msg: formVal.review.characters,
        type: ValidateMsgTypeState.ERROR,
      });
      return;
    }

    if (isCorrectLength && newreview.length > 0) {
      setReviewMsg({
        msg: formVal.userProfileEdit.common.ok,
        type: ValidateMsgTypeState.OK,
      });
    }
  };

  const clearReviewField = () => {
    setReview('');
    setReviewMsg(null);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!sessionUser?.id || !movie?.id) {
      errorToastify();
      return;
    }
    setIsUpdatingReview(true);

    const state = {
      status: {
        stars: userRate,
        comment: review,
        isPublicReview,
      },
      movie,
    };

    const shouldUpdateUserReviewsAfterSucceeded =
      (review !== initialReview && !!isPublicReview) ||
      initialIsPublicReview !== !!isPublicReview;

    logger.log({ initialIsPublicReview, isPublicReview });
    try {
      const res = await updateUserMovie({
        movieId: movie.id,
        userId: sessionUser.id,
        state,
      });

      if (res.status === 200) {
        setTimeout(() => {
          updateSession();
          setIsUpdatingReview(false);
        }, 1000);

        if (shouldUpdateUserReviewsAfterSucceeded) {
          timeToGetReviewsRef.current = true;
        }
      }
    } catch (error) {
      errorToastify();
      logger.log({ error });
    } finally {
      setIsUpdatingReview(false);
      setIsShowForm(false);
    }
  };

  const handleResetBtnClick = () => {
    resetRate();
    clearReviewField();
    setIsPublicReview(false);
  };

  useEffect(() => {
    if (!targetUserMovie) return;

    setIsPublicReview(targetUserMovie.isPublicReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUserMovie?.isPublicReview]);

  useEffect(() => {
    if (!initialReview) return;
    setReview(initialReview);
  }, [initialReview]);

  useEffect(() => {
    if (!reviewMsg || reviewMsg?.type === ValidateMsgTypeState.OK) return;

    errorToastify(reviewMsg.msg);
  }, [reviewMsg, reviewMsg?.msg, reviewMsg?.type]);

  const getNewReviewsInDb = async () => {
    try {
      const res = await getData(`/api/userMovies/${movie.id}`);
      if (res.status === 200) {
        logger.log({ res });

        const filteredReviewsToShow = res.data.data.filter(
          (um: UserMovieState) => um.watched && um.isPublicReview,
        );
        const reviewItems = createReviewItemsFromUserMoviesInDb(
          filteredReviewsToShow,
        );
        updateMovieReviewsInDb(reviewItems);
      }
    } catch (error) {
      logger.log(error);
    } finally {
      timeToGetReviewsRef.current = false;
    }
  };

  useEffect(() => {
    if (!timeToGetReviewsRef.current) return;
    getNewReviewsInDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeToGetReviewsRef.current]);

  return {
    review,
    handleChangeReview,
    reviewMsg,
    resetReviewMsg,
    validateReview,
    clearReviewField,
    isReviewOkay,
    setIsPublicReview,
    isPublicReview,
    toggleIsPublicReview,
    handleFormSubmit,
    handleResetBtnClick,
    isUpdatingReview,
  };
};

export default useReviewField;
