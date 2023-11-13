import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { REGEX_SEARCH_QUERY, formVal } from '@/constants';
import { MovieState } from '@/types/movies';
import { removeExtraSpaceFromStr } from '@/utils';

const useSearchMovie = (
  initialSearchQuery: string,
  initialMovies: MovieState[] | null,
) => {
  const router = useRouter();
  const [inputWord, setInputWord] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedMovies, setSearchedMovies] = useState<MovieState[] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const existQuery = !!searchQuery && searchQuery.length > 0;

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
    router.push(`/search/${searchQuery}?page=1`);
  };

  const handleClearInputWord = () => {
    setInputWord('');
    setSearchedMovies(null);
    router.push('/search');
  };

  useEffect(() => {
    if (!inputWord) return;
    const removedExtraSpace = removeExtraSpaceFromStr(inputWord);
    const newSearchQuery = removedExtraSpace.toLowerCase().replaceAll(' ', '+');
    setSearchQuery(newSearchQuery);
  }, [inputWord]);

  useEffect(() => {
    if (!initialSearchQuery || !!searchQuery) return;

    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery, searchQuery]);

  useEffect(() => {
    if (!initialMovies) return;
    setSearchedMovies(initialMovies);
  }, [initialMovies]);

  return {
    handleInputWordChange,
    searchQuery,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
  };
};

export default useSearchMovie;
