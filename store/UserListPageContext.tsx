import { ReactNode, createContext, useContext, useMemo } from 'react';
import useAges from '@/hooks/ListFilter/useAges';
import useWatchedStatus from '@/hooks/ListFilter/useWatchedStatus';
import { OptionItemState } from '@/types';
import { UserMovieState, UserState } from '@/types/user';

interface UserListPageContextType {
  user: UserState | null;
  userMovies: UserMovieState[];
  watchedStatusOptionItems: OptionItemState[];
  handleWatchedStatusChange: (newValue: string) => void;
  handleChangeAge: (age: string, addOrRemove: 'add' | 'remove') => void;
  agesOptions: OptionItemState[];
  isAllAges: boolean;
}

const UserListPageContext = createContext<UserListPageContextType>({
  user: null,
  userMovies: [],
  watchedStatusOptionItems: [],
  handleWatchedStatusChange: () => undefined,
  handleChangeAge: () => undefined,
  agesOptions: [],
  isAllAges: false,
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

  const userMovies = useMemo(
    () => originUserMovies.filter(watchedStatusFilter).filter(ageFilter),
    [ageFilter, originUserMovies, watchedStatusFilter],
  );

  const context: UserListPageContextType = {
    user,
    userMovies,
    watchedStatusOptionItems,
    handleWatchedStatusChange,
    handleChangeAge,
    agesOptions,
    isAllAges,
  };

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
