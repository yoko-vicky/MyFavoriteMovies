import { ReactNode, createContext, useContext, useState } from 'react';
import { UserMovieState, UserState } from '@/types/user';

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

export const UserListPageContextProvider = ({
  children,
  user,
  userMovies,
}: {
  children: ReactNode;
  user: UserState;
  userMovies: UserMovieState[];
}) => {
  const defaultAge = 'all';
  const [genres, setGenres] = useState<string[]>([]);
  const [age, setAge] = useState<AgeState>('all');

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
