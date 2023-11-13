import { ChangeEvent, ReactNode, createContext, useContext } from 'react';
import useSearchMovie from '@/hooks/useSearchMovie';
import { MovieState } from '@/types/movies';

interface SearchContextType {
  handleInputWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  errorMsg: string | null;
  handleSearchBtnClick: () => void;
  existQuery: boolean;
  inputWord: string;
  isSearching: boolean;
  searchedMovies: MovieState[] | null;
  handleClearInputWord: () => void;
  currentPage: number;
  totalPages: number;
}

const SearchContext = createContext<SearchContextType>({
  handleInputWordChange: () => undefined,
  searchQuery: '',
  errorMsg: null,
  inputWord: '',
  handleSearchBtnClick: () => undefined,
  existQuery: false,
  isSearching: false,
  searchedMovies: null,
  handleClearInputWord: () => undefined,
  currentPage: 1,
  totalPages: 1,
});

export const SearchContextProvider = ({
  children,
  currentPage,
  searchQuery: initialSearchQuery,
  movies: initialMovies,
  totalPages,
}: {
  children: ReactNode;
  currentPage: number;
  searchQuery: string;
  movies: MovieState[] | null;
  totalPages: number;
}) => {
  const {
    handleInputWordChange,
    searchQuery,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
    errorMsg,
  } = useSearchMovie(initialSearchQuery, initialMovies);

  const context: SearchContextType = {
    handleInputWordChange,
    searchQuery,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
    currentPage,
    totalPages,
  };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
export const useSearchContext = () => useContext(SearchContext);
