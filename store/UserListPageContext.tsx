import { ReactNode, createContext, useContext } from 'react';

interface UserListPageContextType {}

const UserListPageContext = createContext<UserListPageContextType>({});

export const UserListPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const context: UserListPageContextType = {};

  return (
    <UserListPageContext.Provider value={context}>
      {children}
    </UserListPageContext.Provider>
  );
};

export default UserListPageContext;
export const useUserListPageContext = () => useContext(UserListPageContext);
