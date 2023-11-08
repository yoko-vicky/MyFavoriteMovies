import { ReactNode, createContext, useContext, useMemo } from 'react';
import useAges from '@/hooks/ListFilter/useAges';
import useGenres from '@/hooks/ListFilter/useGenres';
import useStarRate from '@/hooks/ListFilter/useStarRate';
import useWatchedStatus from '@/hooks/ListFilter/useWatchedStatus';
import { OptionItemState } from '@/types';
import { MovieState } from '@/types/movies';
import { UserMovieState, UserState } from '@/types/user';
import { getMoviesFromUserMovies } from '@/utils';
import { logger } from '@/utils/logger';
import { useUserSessionDataContext } from './UserSessionDataContext';
// import { logger } from '@/utils/logger';

interface UserListPageContextType {
  user: UserState | null;
  userMovies: UserMovieState[];
  watchedStatusOptionItems: OptionItemState[];
  handleWatchedStatusChange: (newValue: string) => void;
  handleChangeAge: (age: string, addOrRemove: 'add' | 'remove') => void;
  agesOptions: OptionItemState[];
  isAllAges: boolean;
  genreOptions: OptionItemState[];
  isAllGenres: boolean;
  handleChangeGenre: (
    genreOriginId: string,
    addOrRemove: 'add' | 'remove',
  ) => void;
  handleChangeStarRate: (newStarRate: string) => void;
  starRateOptions: OptionItemState[];
  userMovieMovies: MovieState[];
}

const UserListPageContext = createContext<UserListPageContextType>({
  user: null,
  userMovies: [],
  watchedStatusOptionItems: [],
  handleWatchedStatusChange: () => undefined,
  handleChangeAge: () => undefined,
  agesOptions: [],
  isAllAges: false,
  genreOptions: [],
  isAllGenres: false,
  handleChangeGenre: () => undefined,
  handleChangeStarRate: () => undefined,
  starRateOptions: [],
  userMovieMovies: [],
});

export const UserListPageContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserState;
}) => {
  const { sessionUserMovies } = useUserSessionDataContext();

  const {
    watchedStatusFilter,
    watchedStatusOptionItems,
    handleWatchedStatusChange,
  } = useWatchedStatus();

  const { ageFilter, handleChangeAge, agesOptions, isAllAges } = useAges();
  const { genreOptions, isAllGenres, handleChangeGenre, genreFilter } =
    useGenres(sessionUserMovies);
  const { starRateFilter, handleChangeStarRate, starRateOptions } =
    useStarRate();

  const votes = sessionUserMovies
    ? sessionUserMovies.map((um) => um.movie?.vote_average)
    : [];
  logger.log({ sessionUserMovies, votes });

  const userMovies = useMemo(
    () =>
      sessionUserMovies
        ? sessionUserMovies
            .filter(watchedStatusFilter)
            .filter(ageFilter)
            .filter(genreFilter)
        : [],
    [ageFilter, genreFilter, sessionUserMovies, watchedStatusFilter],
  );

  const userMovieMovies = useMemo(
    () => getMoviesFromUserMovies(userMovies),
    [userMovies],
  );

  const context: UserListPageContextType = {
    user,
    userMovies,
    watchedStatusOptionItems,
    handleWatchedStatusChange,
    handleChangeAge,
    agesOptions,
    isAllAges,
    genreOptions,
    isAllGenres,
    handleChangeGenre,
    handleChangeStarRate,
    starRateOptions,
    userMovieMovies,
  };

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
