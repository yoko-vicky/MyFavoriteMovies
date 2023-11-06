import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useWatchedStatus from '@/hooks/ListFilter/useWatchedStatus';
import { WatchedStatus } from '@/types/movies';
import { UserMovieState, UserState } from '@/types/user';
import { logger } from '@/utils/logger';
import { CheckboxOptionItemState } from '../types/index';

interface UserListPageContextType {
  user: UserState | null;
  userMovies: UserMovieState[];
  watchedStatusOptionItems: CheckboxOptionItemState[];
  handleWatchedStatusChange: (newName: string) => void;
}

const UserListPageContext = createContext<UserListPageContextType>({
  user: null,
  userMovies: [],
  watchedStatusOptionItems: [],
  handleWatchedStatusChange: () => undefined,
});

type AgeState =
  | '1930'
  | '1940'
  | '1950'
  | '1960'
  | '1970'
  | '1980'
  | '1990'
  | '2000'
  | '2010'
  | '2020'
  | 'all';

export const UserListPageContextProvider = ({
  children,
  user,
  userMovies: originUserMovies,
}: {
  children: ReactNode;
  user: UserState;
  userMovies: UserMovieState[];
}) => {
  const { watchedStatus, watchedStatusOptionItems, handleWatchedStatusChange } =
    useWatchedStatus();
  const defaultAges: AgeState[] = ['all'];
  const [genres, setGenres] = useState<string[]>([]);
  const [ages, setAges] = useState<AgeState[]>(defaultAges);

  const ageFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (ages == defaultAges) {
        return true;
      } else {
        const movieAge =
          userMovie.movie?.release_date.split('-')[0].slice(0, 3) + '0';
        logger.log({ movieAge });
        return ages.includes(movieAge as AgeState);
      }
    },
    [ages, defaultAges],
  );

  const watchedStatusFilter = useCallback(
    (userMovie: UserMovieState) => {
      if (watchedStatus === WatchedStatus.UNWATCHED) {
        return userMovie.listed && !userMovie.watched;
      }

      if (watchedStatus === WatchedStatus.WATCHED) {
        return userMovie.watched;
      }

      return true;
    },
    [watchedStatus],
  );

  const userMovies = useMemo(
    () => originUserMovies.filter(watchedStatusFilter),
    [originUserMovies, watchedStatusFilter],
  );

  logger.log({ userMovies, watchedStatusFilter, watchedStatus });

  const context: UserListPageContextType = {
    user,
    userMovies,
    watchedStatusOptionItems,
    handleWatchedStatusChange,
  };

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
