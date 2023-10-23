import { ChangeEvent, useEffect, useState } from 'react';
import { USER_REVIEW_MAX_LENGTH, formVal } from '@/constants';
import { errorToastify } from '@/lib/toast';
import { ValidateMsgState, ValidateMsgTypeState } from '@/types';
import { removeExtraSpaceFromStr } from '@/utils';

const useReviewField = (initialReview: string | null | undefined) => {
  const [review, setReview] = useState<string>(initialReview || '');
  const [reviewMsg, setReviewMsg] = useState<ValidateMsgState | null>(null);

  const isReviewOkay =
    review === initialReview ||
    (!!review && review.length === 0) ||
    reviewMsg?.type === ValidateMsgTypeState.OK;

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
  };
};

export default useReviewField;
