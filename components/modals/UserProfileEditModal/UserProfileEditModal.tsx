import React, { FormEvent, useEffect } from 'react';
import { Button } from '@/components/base/Button';
import { Modal } from '@/components/base/Modal';
import { TextField } from '@/components/base/TextField';
import { TextareaField } from '@/components/base/TextareaField';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import useUserProfileEdit from '@/hooks/Fields/useUserProfileEdit';
import useSessionData from '@/hooks/useSessionData';
import { updateData } from '@/lib/axios';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import { UserState } from '@/types/user';
import { logger } from '@/utils/logger';
import styles from './UserProfileEditModal.module.scss';

export const UserProfileEditModal = () => {
  const {
    closeEditModal: closeModal,
    isUpdatingProfile,
    updateIsUpdatingProfile,
  } = useUserProfilePageContext();
  const { getNewSessionToUpdateUserData } = useSessionData();
  const updateUserProfile = async (newUserProfile: UserState) => {
    try {
      const res = await updateData(
        `/api/user/${newUserProfile.id}`,
        newUserProfile,
      );
      logger.log({ res });

      if (res.status === 200) {
        getNewSessionToUpdateUserData();
        updateIsUpdatingProfile(false);
        closeUserEditModal();
      }
    } catch (error) {
      logger.error(error);
      updateIsUpdatingProfile(false);
      // throw new Error();
    }
  };
  const {
    // name
    name,
    handleChangeName,
    nameMsg,
    validateName,
    // Bio
    bio,
    handleChangeBio,
    bioMsg,
    validateBio,
    // Twitter
    twitter,
    handleTwitterChange,
    twitterMsg,
    validateTwitter,
    // Facebook
    facebook,
    handleFacebookChange,
    facebookMsg,
    validateFacebook,
    // instagram
    instagram,
    handleInstagramChange,
    instagramMsg,
    validateInstagram,
    // common
    isReadyToSubmitForm,
    clearAllFields,
    validateAllFields,
    handleSubmit,
  } = useUserProfileEdit(updateUserProfile);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    validateAllFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeUserEditModal = () => {
    clearAllFields();
    closeModal();
  };

  if (isUpdatingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <Modal closeModal={closeUserEditModal}>
      <div className={styles.modalInner}>
        <form className={styles.form} onSubmit={submitHandler}>
          <TextField
            onChange={handleChangeName}
            value={name}
            label={'Name'}
            msg={nameMsg}
            onBlur={validateName}
          />
          <TextareaField
            onChange={handleChangeBio}
            value={bio}
            label={'Bio'}
            msg={bioMsg}
            onBlur={validateBio}
          />
          <TextField
            onChange={handleTwitterChange}
            value={twitter}
            type={'url'}
            label={'Twitter'}
            msg={twitterMsg}
            onBlur={validateTwitter}
          />
          <TextField
            onChange={handleFacebookChange}
            value={facebook}
            type={'url'}
            label={'Facebook'}
            msg={facebookMsg}
            onBlur={validateFacebook}
          />
          <TextField
            onChange={handleInstagramChange}
            value={instagram}
            type={'url'}
            label={'Instagram'}
            msg={instagramMsg}
            onBlur={validateInstagram}
          />

          {isReadyToSubmitForm && (
            <Button variant={'simpleOutlined'} label={'Save'} type={'submit'} />
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UserProfileEditModal;
