import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';
import { UserState } from '@/types/user';

// import { logger } from '@/utils/logger';

interface UserContextType {
  user: UserState | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    setUser(session.user);
  }, [session?.user]);

  const context: UserContextType = {
    user,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
export const useUserContext = () => useContext(UserContext);
