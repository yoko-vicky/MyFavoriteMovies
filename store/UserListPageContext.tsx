import { ReactNode, createContext, useContext, useMemo } from 'react';
import useAges from '@/hooks/ListFilter/useAges';
import useGenres from '@/hooks/ListFilter/useGenres';
import useStarRate from '@/hooks/ListFilter/useStarRate';
import useWatchedStatus from '@/hooks/ListFilter/useWatchedStatus';
import { OptionItemState } from '@/types';
import { UserMovieState, UserState } from '@/types/user';
import { logger } from '@/utils/logger';
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
});

export const UserListPageContextProvider = ({
  children,
  user,
  userMovies: originUserMovies,
}: {
  children: ReactNode;
  user: UserState;
  userMovies: UserMovieState[];
}) => {
  const {
    watchedStatusFilter,
    watchedStatusOptionItems,
    handleWatchedStatusChange,
  } = useWatchedStatus();

  const { ageFilter, handleChangeAge, agesOptions, isAllAges } = useAges();
  const { genreOptions, isAllGenres, handleChangeGenre, genreFilter } =
    useGenres(originUserMovies);
  const { starRateFilter, handleChangeStarRate, starRateOptions } =
    useStarRate();

  const votes = originUserMovies.map((um) => um.movie?.vote_average);
  logger.log({ originUserMovies, votes });

  const userMovies = useMemo(
    () =>
      originUserMovies
        .filter(watchedStatusFilter)
        .filter(ageFilter)
        .filter(genreFilter),
    [ageFilter, genreFilter, originUserMovies, watchedStatusFilter],
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
  };

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
