import React, { FormEvent, useEffect } from 'react';
import { Modal } from '@/components/base/Modal';
import useUserProfileEdit from '@/hooks/Fields/useUserProfileEdit';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import styles from './UserProfileEditModal.module.scss';
import { UserState } from '@/types/user';
import { Button } from '@/components/base/Button';
import { LoadingSpinner } from '@/components/base/loading/LoadingSpinner';
import logger from 'next-auth/utils/logger';
import { updateData } from '@/lib/axios';

export const UserProfileEditModal = () => {
  const { user, closeEditModal, isUpdatingProfile } =
    useUserProfilePageContext();
  const updateUserProfile = async (newUserProfile: UserState) => {
    try {
      const res = await updateData(
        `/api/user/${newUserProfile.id}`,
        newUserProfile,
      );
      logger.log({ res });

      if (res.status === 200) {
        getNewSessionToUpdateUserData();
        setIsUpdatingProfile(false);
        closeModal();
      }
    } catch (error) {
      logger.error(error);
      setHasError(true);
    }
  };
  const {
    // name
    name,
    handleChangeName,
    nameMsg,
    resetNameMsg,
    validateName,
    // Bio
    bio,
    handleChangeBio,
    bioMsg,
    resetBioMsg,
    validateBio,
    // common
    isReadyToSubmitForm,
    clearAllFields,
    validateAllFields,
    handleSubmit,
  } = useUserProfileEdit();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    validateAllFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUpdatingProfile) {
    return <LoadingSpinner />;
  }

  return (
    <Modal closeModal={closeEditModal}>
      <div className={styles.modalInner}>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.field}>
            <label>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={handleChangeName}
              />
            </label>
          </div>
          <Button variant={'outlined'} label={''} type={'submit'} />
        </form>
      </div>
    </Modal>
  );
};

export default UserProfileEditModal;
