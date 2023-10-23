import { useEffect, useRef } from 'react';
import { updateData } from '@/lib/axios';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import { UserState } from '@/types/user';
import { logger } from '@/utils/logger';
import useBioField from './useBioField';
import useLinkField from './useLinkField';
import useNameField from './useNameField';
import useAlertBeforeClosingWindow from '../useAlertBeforeClosingWindow';
import useSessionData from '../useSessionData';

export const useUserProfileEdit = () => {
  const clickedSubmitForm = useRef<boolean>(false);
  const { user, isUpdatingProfile, updateIsUpdatingProfile, closeEditModal } =
    useUserProfilePageContext();
  const { updateSession } = useSessionData();

  // logger.log({ user });
  useAlertBeforeClosingWindow(isUpdatingProfile);
  const {
    name,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    clearNameField,
    isNameOkay,
  } = useNameField(user?.name);
  const {
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    clearBioField,
    isBioOkay,
  } = useBioField(user?.bio);
  const {
    link: twitter,
    handleLinkChange: handleTwitterChange,
    linkMsg: twitterMsg,
    isLinkOkay: isTwitterOkay,
    validateLink: validateTwitter,
    clearLinkField: clearTwitterField,
  } = useLinkField(user?.twitter);
  const {
    link: facebook,
    handleLinkChange: handleFacebookChange,
    linkMsg: facebookMsg,
    isLinkOkay: isFacebookOkay,
    validateLink: validateFacebook,
    clearLinkField: clearFacebookField,
  } = useLinkField(user?.facebook);
  const {
    link: instagram,
    handleLinkChange: handleInstagramChange,
    linkMsg: instagramMsg,
    isLinkOkay: isInstagramOkay,
    validateLink: validateInstagram,
    clearLinkField: clearInstagramField,
  } = useLinkField(user?.instagram);

  const isReadyToSubmitForm =
    isNameOkay &&
    isBioOkay &&
    isTwitterOkay &&
    isFacebookOkay &&
    isInstagramOkay;

  const clearAllFields = () => {
    clearNameField();
    clearBioField();
    clearTwitterField();
    clearFacebookField();
    clearInstagramField();
  };

  const validateAllFields = () => {
    validateName();
    validateBio();
    validateTwitter();
    validateFacebook();
    validateInstagram();
  };

  const handleSubmit = () => {
    logger.log('Clicked handleSubmit');
    validateAllFields();
    clickedSubmitForm.current = true;
  };

  const submitForm = () => {
    if (!user || !user.id) {
      return;
    }

    const newUserData = {
      id: user?.id, // unchangeable
      email: user?.email, // unchangeable
      image: user?.image, // unchangeable
      name,
      bio,
      twitter,
      instagram,
      facebook,
    } as UserState;

    try {
      updateUserProfile(newUserData);
    } catch (error) {
      logger.warn('something wrong', {
        isNameOkay,
        isBioOkay,
        isTwitterOkay,
        isFacebookOkay,
        isInstagramOkay,
      });
      logger.error('Could not update profile', error);
    } finally {
      clickedSubmitForm.current = false;
    }
  };

  const updateUserProfile = async (newUserProfile: UserState) => {
    updateIsUpdatingProfile(true);

    try {
      const res = await updateData(
        `/api/users/${newUserProfile.id}`,
        newUserProfile,
      );
      logger.log({ res });

      if (res.status === 200) {
        setTimeout(() => {
          updateIsUpdatingProfile(false);
          clearAllFields();
          closeEditModal();
          updateSession();
        }, 3000);
      }
    } catch (error) {
      logger.error(error);
      updateIsUpdatingProfile(false);

      throw new Error();
    }
  };

  useEffect(() => {
    if (!isReadyToSubmitForm || !clickedSubmitForm.current) return;
    submitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToSubmitForm, clickedSubmitForm.current]);

  logger.log({ name, bio });

  return {
    // name
    name,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    clearNameField,
    isNameOkay,
    // Bio
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    clearBioField,
    isBioOkay,
    // Twitter
    twitter,
    handleTwitterChange,
    twitterMsg,
    isTwitterOkay,
    validateTwitter,
    // Facebook
    facebook,
    handleFacebookChange,
    facebookMsg,
    isFacebookOkay,
    validateFacebook,
    // instagram
    instagram,
    handleInstagramChange,
    instagramMsg,
    isInstagramOkay,
    validateInstagram,
    // common
    isReadyToSubmitForm,
    clearAllFields,
    validateAllFields,
    handleSubmit,
  };
};

export default useUserProfileEdit;
