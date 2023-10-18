import { ReactNode, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import useModal from '@/hooks/useModal';
import { UserState } from '@/types/user';

interface UserProfilePageContextType {
  user: UserState | null;
  userForPage: UserState | null;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const UserProfilePageContext = createContext<UserProfilePageContextType>({
  user: null,
  userForPage: null,
  isEditModalOpen: false,
  openEditModal: () => undefined,
  closeEditModal: () => undefined,
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
  const {
    isModalOpen: isEditModalOpen,
    closeModal: closeEditModal,
    openModal: openEditModal,
  } = useModal();

  const context: UserProfilePageContextType = {
    user: user || null,
    userForPage,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
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
