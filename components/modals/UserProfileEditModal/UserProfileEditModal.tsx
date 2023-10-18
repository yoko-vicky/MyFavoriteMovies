import React from 'react';
import { Modal } from '@/components/base/Modal';
import useUserProfileEdit from '@/hooks/Fields/useUserProfileEdit';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';
import styles from './UserProfileEditModal.module.scss';

export const UserProfileEditModal = () => {
  const { user, closeEditModal } = useUserProfilePageContext();
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
  } = useUserProfileEdit();

  return (
    <Modal closeModal={closeEditModal}>
      <div className={styles.modalInner}>
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
      </div>
    </Modal>
  );
};

export default UserProfileEditModal;
