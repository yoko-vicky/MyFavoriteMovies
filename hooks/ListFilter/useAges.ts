import { useCallback, useState } from 'react';
import { OptionItemState } from '@/types';
import { AgeState, agesArr } from '@/types/movies';
import { UserMovieState } from '@/types/user';
// import { logger } from '@/utils/logger';

const useAges = () => {
  const [ages, setAges] = useState<AgeState[]>(['All']);

  const isAllAges = ages.includes('All');

  const ageFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (ages.includes('All')) {
        return true;
      } else {
        let movieAge =
          userMovie.movie?.release_date.split('-')[0].slice(0, 3) + '0';

        if (+movieAge <= 1930) {
          movieAge = '1930';
        }

        if (+movieAge >= 2020) {
          movieAge = '2020';
        }

        return ages.includes(movieAge as AgeState);
      }
    },
    [ages],
  );

  // logger.log({ ages });

  const handleChangeAge = (age: string, addOrRemove: 'add' | 'remove') => {
    addOrRemove === 'add'
      ? setAges((prev) => [...prev, age as AgeState])
      : setAges((prev) => prev.filter((item) => item !== age));
  };

  const agesOptions = agesArr.map((item) => {
    const checked = ages.includes('All') || ages.includes(item);

    if (item === '1930') {
      return {
        label: `〜${item}`,
        value: item,
        checked,
      };
    }

    if (item === '2020') {
      return {
        label: `${item}〜`,
        value: item,
        checked,
      };
    }

    return {
      label: item,
      value: item,
      checked,
    };
  }) as OptionItemState[];

  return {
    ages,
    ageFilter,
    handleChangeAge,
    agesOptions,
    isAllAges,
  };
};

export default useAges;
