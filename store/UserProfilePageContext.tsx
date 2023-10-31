import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import useModal from '@/hooks/useModal';
import { UserMovieState, UserState } from '@/types/user';
import { useUserSessionDataContext } from './UserSessionDataContext';

interface UserProfilePageContextType {
  user: UserState | null;
  userForPage: UserState | null;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  isUpdatingProfile: boolean;
  updateIsUpdatingProfile: (val: boolean) => void;
  isMyProfile: boolean;
  listedUserMovies: UserMovieState[];
  watchedUserMovies: UserMovieState[];
}

const UserProfilePageContext = createContext<UserProfilePageContextType>({
  user: null,
  userForPage: null,
  isEditModalOpen: false,
  openEditModal: () => undefined,
  closeEditModal: () => undefined,
  isUpdatingProfile: false,
  updateIsUpdatingProfile: () => undefined,
  isMyProfile: false,
  listedUserMovies: [],
  watchedUserMovies: [],
});

export const UserProfilePageContextProvider = ({
  children,
  userForPage,
}: {
  children: ReactNode;
  userForPage: UserState | null;
}) => {
  const { sessionUser } = useUserSessionDataContext();
  const isMyProfile = !!sessionUser && sessionUser?.id === userForPage?.id;
  const user = isMyProfile ? sessionUser : userForPage;
  const {
    isModalOpen: isEditModalOpen,
    closeModal: closeEditModal,
    openModal: openEditModal,
  } = useModal();
  const router = useRouter();

  const listedUserMovies = user?.userMovies
    ? user.userMovies?.filter((um) => um.listed && !um.watched)
    : [];

  const watchedUserMovies = user?.userMovies
    ? user.userMovies?.filter((um) => um.watched)
    : [];

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
    isMyProfile,
    listedUserMovies,
    watchedUserMovies,
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
