import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getGenres } from '@/lib/tmdb';
import { MovieGenreState } from '@/types/movies';

interface MovieCommonDataContextType {
  genres: MovieGenreState[];
  findGenreNameById: (genreId: number) => undefined | string;
}

const MovieCommonDataContext = createContext<MovieCommonDataContextType>({
  genres: [],
  findGenreNameById: () => undefined,
});

export const MovieCommonDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [genres, setGenres] = useState<MovieGenreState[]>([]);

  const findGenreNameById = (genreId: number) =>
    genres.find((genre) => genre.id === genreId)?.name;

  useEffect(() => {
    if (genres.length) return;

    const getAllGenres = async () => {
      const allGenres = await getGenres();
      if (allGenres) {
        setGenres(allGenres.genres);
      }
    };

    getAllGenres();
  }, [genres]);

  const context: MovieCommonDataContextType = {
    genres,
    findGenreNameById,
  };

  return (
    <MovieCommonDataContext.Provider value={context}>
      {children}
    </MovieCommonDataContext.Provider>
  );
};

export default MovieCommonDataContext;
export const useMovieCommonDataContext = () =>
  useContext(MovieCommonDataContext);
