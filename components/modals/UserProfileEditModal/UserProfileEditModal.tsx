import React from 'react';
import { Modal } from '@/components/base/Modal';
import { useUserProfilePageContext } from '@/store/UserProfilePageContext';

export const UserProfileEditModal = () => {
  const { user, closeEditModal } = useUserProfilePageContext();
  return <Modal closeModal={closeEditModal}>UserProfileEditModal</Modal>;
};

export default UserProfileEditModal;
