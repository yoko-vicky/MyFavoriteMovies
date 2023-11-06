import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { UserMovieState, UserState } from '@/types/user';
import { logger } from '@/utils/logger';

interface UserListPageContextType {
  user: UserState | null;
  userMovies: UserMovieState[];
}

const UserListPageContext = createContext<UserListPageContextType>({
  user: null,
  userMovies: [],
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

enum WatchedStatus {
  UNWATCHED = 'unwatched',
  WATCHED = 'watched',
  ALL = 'all',
}

export const UserListPageContextProvider = ({
  children,
  user,
  userMovies: originUserMovies,
}: {
  children: ReactNode;
  user: UserState;
  userMovies: UserMovieState[];
}) => {
  const defaultAges: AgeState[] = ['all'];
  const defaultWatchedStatus = WatchedStatus.UNWATCHED;
  const [watchedStatus, setWatchedStatus] =
    useState<WatchedStatus>(defaultWatchedStatus);
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
    () => originUserMovies.filter(watchedStatusFilter).filter(ageFilter),
    [ageFilter, originUserMovies, watchedStatusFilter],
  );

  const context: UserListPageContextType = {
    user,
    userMovies,
  };

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
