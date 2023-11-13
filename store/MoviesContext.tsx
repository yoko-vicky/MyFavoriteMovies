import { ChangeEvent, ReactNode, createContext, useContext } from 'react';
import useSearchMovie from '@/hooks/useSearchMovie';
import { MovieState } from '@/types/movies';
import { getRandomNum } from '@/utils';

interface MoviesContextType {
  topRatedMovies: MovieState[];
  trendingMovies: MovieState[];
  upcomingMovies: MovieState[];
  popularMovies: MovieState[];
  heroMovie: MovieState | undefined;
  allMovies: MovieState[];
  handleInputWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchWord: string;
  errorMsg: string;
  handleSearchBtnClick: () => void;
  existQuery: boolean;
  inputWord: string;
  isSearching: boolean;
  searchedMovies: MovieState[] | null;
  handleClearInputWord: () => void;
}

const MoviesContext = createContext<MoviesContextType>({
  topRatedMovies: [],
  upcomingMovies: [],
  trendingMovies: [],
  popularMovies: [],
  heroMovie: undefined,
  allMovies: [],
  handleInputWordChange: () => undefined,
  searchWord: '',
  errorMsg: '',
  inputWord: '',
  handleSearchBtnClick: () => undefined,
  existQuery: false,
  isSearching: false,
  searchedMovies: null,
  handleClearInputWord: () => undefined,
});

export const MoviesContextProvider = ({
  children,
  topRatedMovies,
  upcomingMovies,
  trendingMovies,
  popularMovies,
}: {
  children: ReactNode;
  topRatedMovies: MovieState[];
  trendingMovies: MovieState[];
  upcomingMovies: MovieState[];
  popularMovies: MovieState[];
}) => {
  const {
    handleInputWordChange,
    searchWord,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
  } = useSearchMovie();

  const allMovies = [
    ...topRatedMovies,
    ...upcomingMovies,
    ...trendingMovies,
    ...popularMovies,
  ];

  const heroMovie: MovieState = allMovies.filter((movie) => !movie.adult)[
    getRandomNum()
  ];

  const context: MoviesContextType = {
    topRatedMovies,
    trendingMovies,
    upcomingMovies,
    popularMovies,
    heroMovie,
    allMovies,
    handleInputWordChange,
    searchWord,
    errorMsg,
    handleSearchBtnClick,
    existQuery,
    inputWord,
    isSearching,
    searchedMovies,
    handleClearInputWord,
  };

  // logger.log({ heroMovie, allMovies });

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;
export const useMoviesContext = () => useContext(MoviesContext);
