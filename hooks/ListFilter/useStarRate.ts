import { useCallback, useState } from 'react';
import { OptionItemState } from '@/types';
import { StarRateState, starRateArr } from '@/types/movies';
import { UserMovieState } from '@/types/user';

const useStarRate = () => {
  const [starRate, setStarRate] = useState<StarRateState>('All');

  const starRateFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (starRate === 'All') {
        return true;
      }

      return userMovie.stars === +starRate;
    },
    [starRate],
  );

  const handleChangeStarRate = (newStarRate: string) => {
    setStarRate(newStarRate as StarRateState);
  };

  const starRateOptions = starRateArr.map((item) => {
    const checked = starRate === item;

    return {
      label: item,
      value: item,
      checked,
    };
  }) as OptionItemState[];

  return {
    starRateFilter,
    handleChangeStarRate,
    starRateOptions,
  };
};

export default useStarRate;
