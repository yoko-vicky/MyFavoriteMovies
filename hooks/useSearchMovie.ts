import { ChangeEvent, useMemo, useState } from 'react';
import { REGEX_SEARCH_QUERY, formVal, msgs } from '@/constants';
import { getMovieByTitleQuery } from '@/lib/tmdb';
import { MovieState } from '@/types/movies';
import { getMoviesWithPosterPath, removeExtraSpaceFromStr } from '@/utils';
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
      if (res?.results && res.results.length > 0) {
        setIsSearching(false);
        const filteredMovies = getMoviesWithPosterPath(res.results);
        setSearchedMovies(filteredMovies);
      } else {
        setErrorMsg(`${formVal.searchMovie.notFound}"${inputWord}"`);
        setIsSearching(false);
      }
    } catch (error) {
      setErrorMsg(msgs.error.general);
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
