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
  searchedMovies: MovieState[] | null;
  handleClearInputWord: () => void;
  currentPage: number;
  totalPages: number;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType>({
  handleInputWordChange: () => undefined,
  searchQuery: '',
  errorMsg: null,
  inputWord: '',
  handleSearchBtnClick: () => undefined,
  existQuery: false,
  searchedMovies: null,
  handleClearInputWord: () => undefined,
  currentPage: 1,
  totalPages: 1,
  isSearching: false,
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
    searchedMovies,
    handleClearInputWord,
    errorMsg,
    isSearching,
  } = useSearchMovie(initialSearchQuery, initialMovies);

  const context: SearchContextType = {
    handleInputWordChange,
    searchQuery,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    searchedMovies,
    handleClearInputWord,
    currentPage,
    totalPages,
    isSearching,
  };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
export const useSearchContext = () => useContext(SearchContext);
