import { useCallback, useState } from 'react';
import { OptionItemState } from '@/types';
import { AgeState, agesArr } from '@/types/movies';
import { UserMovieState } from '@/types/user';
import { logger } from '@/utils/logger';

const useAges = () => {
  const [ages, setAges] = useState<AgeState[]>(['all']);

  const isAllAges = ages.includes('all');

  const ageFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (ages.includes('all')) {
        return true;
      } else {
        const movieAge =
          userMovie.movie?.release_date.split('-')[0].slice(0, 3) + '0';
        logger.log({ movieAge });
        return ages.includes(movieAge as AgeState);
      }
    },
    [ages],
  );

  const handleChangeAge = (age: string, addOrRemove: 'add' | 'remove') => {
    addOrRemove === 'add'
      ? setAges((prev) => [...prev, age as AgeState])
      : setAges((prev) => prev.filter((item) => item !== age));
  };

  const agesOptions = agesArr.map((item, index) => {
    const checked = ages.includes('all') || ages.includes(item);

    if (index === 0) {
      return {
        label: `〜${item}`,
        value: item,
        checked,
      };
    }

    if (index === ages.length - 1) {
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
