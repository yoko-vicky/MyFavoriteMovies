import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useModal from '@/hooks/useModal';
import { UserState } from '@/types/user';

interface UserProfilePageContextType {
  user: UserState | null;
  userForPage: UserState | null;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  isUpdatingProfile: boolean;
  updateIsUpdatingProfile: (val: boolean) => void;
}

const UserProfilePageContext = createContext<UserProfilePageContextType>({
  user: null,
  userForPage: null,
  isEditModalOpen: false,
  openEditModal: () => undefined,
  closeEditModal: () => undefined,
  isUpdatingProfile: false,
  updateIsUpdatingProfile: () => undefined,
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
  const router = useRouter();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);

  const updateIsUpdatingProfile = (val: boolean) => setIsUpdatingProfile(val);

  useEffect(() => {
    if (!isUpdatingProfile) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      router.push('/500');
    }, 100000);

    return () => clearTimeout(timerRef.current);
  }, [isUpdatingProfile, router]);

  const context: UserProfilePageContextType = {
    user: user || null,
    userForPage,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    isUpdatingProfile,
    updateIsUpdatingProfile,
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
