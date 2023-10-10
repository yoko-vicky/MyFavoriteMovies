'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { MovieState } from '@/types/movies';
import { getRandomNum } from '@/utils';
import { logger } from '@/utils/logger';

export type MovieVariantKeys = 'topRated' | 'upcoming' | 'trending' | 'popular';
export interface MoviesListState {
  topRated: MovieState[];
  upcoming: MovieState[];
  trending: MovieState[];
  popular: MovieState[];
  others: MovieState[];
}

interface MoviesContextType {
  moviesList: MoviesListState;
  updateMovies: (movies: MovieState[], variant: MovieVariantKeys) => void;
  heroMovie: MovieState | undefined;
  allMovies: MovieState[];
  addNewMovie: (movie: MovieState) => void;
}

const defaultMoviesList = {
  topRated: [],
  upcoming: [],
  trending: [],
  popular: [],
  others: [],
};

const MoviesContext = createContext<MoviesContextType>({
  moviesList: defaultMoviesList,
  updateMovies: () => undefined,
  heroMovie: undefined,
  allMovies: [],
  addNewMovie: () => undefined,
});

export const MoviesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [moviesList, setMoviesList] =
    useState<MoviesListState>(defaultMoviesList);

  const allMovies = [
    ...moviesList.popular,
    ...moviesList.topRated,
    ...moviesList.trending,
    ...moviesList.upcoming,
    ...moviesList.others,
  ];

  const heroMovie: MovieState = allMovies.filter((movie) => !movie.adult)[
    getRandomNum()
  ];

  const updateMovies = (movies: MovieState[], variant: MovieVariantKeys) => {
    setMoviesList((prev) => ({ ...prev, [variant]: movies }));
  };

  const addNewMovie = (movie: MovieState) => {
    setMoviesList((prev) => ({ ...prev, others: [...prev.others, movie] }));
  };

  const context: MoviesContextType = {
    moviesList,
    updateMovies,
    heroMovie,
    allMovies,
    addNewMovie,
  };

  logger.log({ moviesList, heroMovie, allMovies });

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;
export const useMoviesContext = () => useContext(MoviesContext);
