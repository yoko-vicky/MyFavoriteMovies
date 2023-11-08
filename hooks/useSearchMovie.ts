import { ChangeEvent, useMemo, useState } from 'react';
import { REGEX_SEARCH_QUERY, formVal } from '@/constants';
import { getMovieByTitleQuery } from '@/lib/tmdb';
import { errorToastify } from '@/lib/toast';
import { MovieState } from '@/types/movies';
import { removeExtraSpaceFromStr } from '@/utils';
import { logger } from '@/utils/logger';

const useSearchMovie = () => {
  const [inputWord, setInputWord] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedMovies, setSearchedMovies] = useState<MovieState[] | null>(
    null,
  );

  const searchWord = useMemo(() => {
    const removedExtraSpace = removeExtraSpaceFromStr(inputWord);
    return removedExtraSpace.toLowerCase().replaceAll(' ', '+');
  }, [inputWord]);

  const existQuery = !!searchWord && searchWord.length > 0;

  const handleInputWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const newInputWord = e.target.value;

    if (
      newInputWord.trim().length > 0 &&
      !newInputWord.match(REGEX_SEARCH_QUERY)
    ) {
      setErrorMsg(formVal.searchMovie.inputLetters);
      return;
    }

    setInputWord(newInputWord);
  };

  const handleSearchBtnClick = async () => {
    if (!existQuery) {
      setErrorMsg(formVal.searchMovie.queryRequired);
      return;
    }

    setIsSearching(true);

    try {
      const res = await getMovieByTitleQuery(searchWord);
      logger.log({ res });
      if (res?.results) {
        setIsSearching(false);
        setSearchedMovies(res.results);
      }
    } catch (error) {
      errorToastify();
      setIsSearching(false);
    }
  };

  return {
    handleInputWordChange,
    searchWord,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
  };
};

export default useSearchMovie;
