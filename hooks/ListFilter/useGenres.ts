import { useCallback, useMemo, useState } from 'react';
import { OptionItemState } from '@/types';
import { MovieGenreState } from '@/types/movies';
import { UserMovieState } from '@/types/user';
// import { logger } from '@/utils/logger';

const useGenres = (originUserMovies: UserMovieState[] | undefined) => {
  const allGenreItem = {
    id: 0,
    originGenreId: 0,
    name: 'All',
  };

  const [genres, setGenres] = useState<number[]>([allGenreItem.originGenreId]);

  const duplicatedGenres = useMemo(() => {
    return originUserMovies
      ? (originUserMovies
          .filter((um) => !!um.movie && !!um.movie.genres)
          .map((um) => um.movie?.genres)
          .flat()
          .filter((dg) => !!dg?.originGenreId) as MovieGenreState[])
      : [];
  }, [originUserMovies]);

  const isAllGenres = genres.includes(allGenreItem.originGenreId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originGenreOptions: MovieGenreState[] = [allGenreItem];

  duplicatedGenres.forEach((dg) => {
    const isExistItem = !!originGenreOptions.find(
      (go) => go.originGenreId === dg.originGenreId,
    );

    if (!isExistItem) {
      originGenreOptions.push(dg);
    }
  });

  const genreOptions: OptionItemState[] = useMemo(
    () =>
      originGenreOptions.map((op) => {
        // logger.log({ op });
        const checked =
          genres.includes(allGenreItem.originGenreId) ||
          (!!op?.originGenreId && genres.includes(op.originGenreId));

        return {
          label: op.name,
          value: op?.originGenreId ? op.originGenreId.toString() : '',
          checked,
        };
      }),
    [allGenreItem.originGenreId, genres, originGenreOptions],
  );

  const handleChangeGenre = (
    genreOriginId: string,
    addOrRemove: 'add' | 'remove',
  ) => {
    addOrRemove === 'add'
      ? setGenres((prev) => [...prev, +genreOriginId])
      : setGenres((prev) => prev.filter((item) => item !== +genreOriginId));
  };

  const genreFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (genres.includes(allGenreItem.originGenreId)) {
        return true;
      } else {
        return genres.some((genre) => {
          const userMovieGenreIds = userMovie.movie?.genres?.map(
            (ge) => ge.originGenreId,
          );
          return userMovieGenreIds?.includes(genre);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genres],
  );

  return { genreOptions, isAllGenres, handleChangeGenre, genreFilter };
};

export default useGenres;
