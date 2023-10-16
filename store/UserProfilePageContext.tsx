import { ReactNode, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { UserState } from '@/types/user';

interface UserProfilePageContextType {
  user: UserState | null;
  userForPage: UserState | null;
}

const UserProfilePageContext = createContext<UserProfilePageContextType>({
  user: null,
  userForPage: null,
});

export const UserProfilePageContextProvider = ({
  children,
  userForPage,
}: {
  children: ReactNode;
  userForPage: UserState | null;
}) => {
  const { data: session } = useSession();
  const user =
    session?.user.id === userForPage?.id ? session?.user : userForPage;

  const context: UserProfilePageContextType = {
    user: user || null,
    userForPage,
  };

  return (
    <UserProfilePageContext.Provider value={context}>
      {children}
    </UserProfilePageContext.Provider>
  );
};

export default UserProfilePageContext;
export const useUserProfilePageContext = () =>
  useContext(UserProfilePageContext);
