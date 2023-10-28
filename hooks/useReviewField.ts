import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { USER_REVIEW_MAX_LENGTH, formVal } from '@/constants';
import { updateUserMovie } from '@/lib/axios';
import { errorToastify } from '@/lib/toast';
import { useUserSessionDataContext } from '@/store/UserSessionDataContext';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { MovieState } from '@/types/movies';
import { removeExtraSpaceFromStr } from '@/utils';
import { logger } from '@/utils/logger';

const useReviewField = ({
  movie,
  userRate,
  setIsShowForm,
  resetRate,
}: {
  movie: MovieState;
  userRate: number;
  setIsShowForm: Dispatch<SetStateAction<boolean>>;
  resetRate: () => void;
}) => {
  const router = useRouter();
  const { updateSession, sessionUser, sessionUserMovies } =
    useUserSessionDataContext();

  const targetUserMovie = sessionUserMovies?.find(
    (um) => um.movieId === movie.id,
  );

  const initialReview = targetUserMovie?.comment;

  const [review, setReview] = useState<string>('');
  const [reviewMsg, setReviewMsg] = useState<ValidateMsgState | null>(null);
  const [isPublicReview, setIsPublicReview] = useState<boolean>(false);
  const isUpdatingReviewRef = useRef<boolean>(false);

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
    isUpdatingReviewRef.current = true;

    const state = {
      status: {
        stars: userRate,
        comment: review,
        isPublicReview,
      },
      movie,
    };

    try {
      const res = await updateUserMovie({
        movieId: movie.id,
        userId: sessionUser.id,
        state,
      });

      if (res.status === 200) {
        setTimeout(() => {
          updateSession();
          isUpdatingReviewRef.current = false;
        }, 1000);

        const updatedPublicStatus =
          (targetUserMovie &&
            targetUserMovie.isPublicReview !== state.status.isPublicReview) ||
          false;

        if (updatedPublicStatus) {
          router.push(`/movies/${movie.id}`);
          return;
        }
      }
      setIsShowForm(false);
    } catch (error) {
      errorToastify();
      logger.log({ error });
    } finally {
      isUpdatingReviewRef.current = false;
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
  }, [targetUserMovie, targetUserMovie?.isPublicReview]);

  useEffect(() => {
    if (!initialReview) return;
    setReview(initialReview);
  }, [initialReview]);

  useEffect(() => {
    if (!reviewMsg || reviewMsg?.type === ValidateMsgTypeState.OK) return;

    errorToastify(reviewMsg.msg);
  }, [reviewMsg, reviewMsg?.msg, reviewMsg?.type]);

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
    isUpdatingReviewRef,
  };
};

export default useReviewField;
