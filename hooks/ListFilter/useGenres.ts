import { useCallback, useMemo, useState } from 'react';
import { OptionItemState } from '@/types';
import { MovieGenreState } from '@/types/movies';
import { UserMovieState } from '@/types/user';

const useGenres = (originUserMovies: UserMovieState[] | undefined) => {
  const allGenreItem = {
    id: 0,
    name: 'All',
  };

  const [genres, setGenres] = useState<number[]>([allGenreItem.id]);

  const duplicatedGenres = useMemo(() => {
    return originUserMovies
      ? (originUserMovies
          .filter((um) => !!um.movie && !!um.movie.genres)
          .map((um) => um.movie?.genres)
          .flat()
          .filter((dg) => !!dg?.id) as MovieGenreState[])
      : [];
  }, [originUserMovies]);

  const isAllGenres = genres.includes(allGenreItem.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originGenreOptions: MovieGenreState[] = [allGenreItem];

  duplicatedGenres.forEach((dg) => {
    const isExistItem = !!originGenreOptions.find(
      (go) => go.id === dg.id,
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
          genres.includes(allGenreItem.id) ||
          (!!op?.id && genres.includes(op.id));

        return {
          label: op.name,
          value:
            op?.id || op?.id === 0
              ? op.id.toString()
              : '',
          checked,
        };
      }),
    [allGenreItem.id, genres, originGenreOptions],
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
      if (genres.includes(allGenreItem.id)) {
        return true;
      } else {
        return genres.some((genre) => {
          const userMovieGenreIds = userMovie.movie?.genres?.map(
            (ge) => ge.id,
          );
          return userMovieGenreIds?.includes(genre);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genres],
  );

  // logger.log({ genres });

  return { genreOptions, isAllGenres, handleChangeGenre, genreFilter };
};

export default useGenres;
