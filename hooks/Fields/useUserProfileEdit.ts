import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import useBioField from './useBioField';
import useNameField from './useNameField';

export const useUserProfileEdit = () => {
  const { user } = useUserProfilePageContext();
  const {
    name,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    clearNameField,
  } = useNameField(user?.name);
  const {
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    clearBioField,
  } = useBioField(user?.bio);

  return {
    // name
    name,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    clearNameField,
    // Bio
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    clearBioField,
  };
};

export default useUserProfileEdit;
