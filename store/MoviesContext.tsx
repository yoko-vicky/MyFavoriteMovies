import { ReactNode, createContext, useContext } from 'react';
import { MovieState } from '@/types/movies';
import { getRandomNum } from '@/utils';

interface MoviesContextType {
  topRatedMovies: MovieState[];
  trendingMovies: MovieState[];
  upcomingMovies: MovieState[];
  popularMovies: MovieState[];
  heroMovie: MovieState | undefined;
  allMovies: MovieState[];
}

const MoviesContext = createContext<MoviesContextType>({
  topRatedMovies: [],
  upcomingMovies: [],
  trendingMovies: [],
  popularMovies: [],
  heroMovie: undefined,
  allMovies: [],
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
  const allMovies = [
    ...topRatedMovies,
    ...upcomingMovies,
    ...trendingMovies,
    ...popularMovies,
  ];

  const heroMovie: MovieState = [...upcomingMovies, ...trendingMovies].filter(
    (movie) => !movie.adult && !!movie.backdrop_path,
  )[getRandomNum()];

  const context: MoviesContextType = {
    topRatedMovies,
    trendingMovies,
    upcomingMovies,
    popularMovies,
    heroMovie,
    allMovies,
  };

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;
export const useMoviesContext = () => useContext(MoviesContext);
