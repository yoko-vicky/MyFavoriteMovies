import { useEffect, useState } from 'react';
import { UserRateType } from '@/types';
import { logger } from '@/utils/logger';

export const useUserRate = (initialStars: UserRateType) => {
  logger.log({ initialStars });
  const [userRate, setUserRate] = useState<UserRateType>(0);
  const [userHoverRate, setUserHoverRate] = useState<UserRateType>(0);

  const isActiveFirstStar =
    userRate === 1 ||
    userRate === 2 ||
    userRate === 3 ||
    userRate === 4 ||
    userRate === 5 ||
    userHoverRate === 1 ||
    userHoverRate === 2 ||
    userHoverRate === 3 ||
    userHoverRate === 4 ||
    userHoverRate === 5;
  const isActiveSecondStar =
    userRate === 2 ||
    userRate === 3 ||
    userRate === 4 ||
    userRate === 5 ||
    userHoverRate === 2 ||
    userHoverRate === 3 ||
    userHoverRate === 4 ||
    userHoverRate === 5;
  const isActiveThirdStar =
    userRate === 3 ||
    userRate === 4 ||
    userRate === 5 ||
    userHoverRate === 3 ||
    userHoverRate === 4 ||
    userHoverRate === 5;
  const isActiveFourthStar =
    userRate === 4 ||
    userRate === 5 ||
    userHoverRate === 4 ||
    userHoverRate === 5;
  const isActiveFifthStar = userRate === 5 || userHoverRate === 5;

  const isActiveStars = [
    isActiveFirstStar,
    isActiveSecondStar,
    isActiveThirdStar,
    isActiveFourthStar,
    isActiveFifthStar,
  ];

  const onClickStar = (rate: UserRateType) => {
    if (userRate === rate) {
      setUserRate(0);
      return;
    }
    setUserRate(rate);
  };

  const onHoverStar = (rate: UserRateType) => {
    setUserHoverRate(rate);
  };

  const resetRate = () => {
    setUserRate(0);
  };

  useEffect(() => {
    setUserHoverRate(userRate);
  }, [userRate]);

  useEffect(() => {
    if (!initialStars) return;
    setUserRate(initialStars);
  }, [initialStars]);

  return {
    isActiveStars,
    onClickStar,
    onHoverStar,
    userRate,
    userHoverRate,
    resetRate,
  };
};

export default useUserRate;
