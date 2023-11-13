import React from 'react';
import { Button } from '@/components/base/Button';
import { Modal } from '@/components/base/Modal';
import { SubTitle } from '@/components/base/SubTitle';
import styles from './ConrifmModal.module.scss';

interface ConfirmModalPropsType {
  closeModal: () => void;
  handleBtnClick: () => void;
  variant: 'listed' | 'watched';
}
export const ConfirmModal = ({
  closeModal,
  variant,
  handleBtnClick,
}: ConfirmModalPropsType) => {
  return (
    <Modal
      closeModal={closeModal}
      className={styles.modal}
      variant="fixedWidth"
    >
      <div className={styles.inner}>
        <SubTitle title={'Are you sure?'} className={styles.title} />
        <Button
          variant={'simpleOutlined'}
          label={`Remove from ${variant} movies`}
          onClick={handleBtnClick}
          activeColor="red"
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
