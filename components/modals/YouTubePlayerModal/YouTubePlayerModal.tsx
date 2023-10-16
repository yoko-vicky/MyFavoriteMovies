import React from 'react';
import { Modal } from '@/components/base/Modal';
import { YouTubePlayer } from '@/components/base/YouTubePlayer';
import styles from './YouTubePlayerModal.module.scss';

interface YouTubePlayerModalPropsType {
  closeModal: () => void;
  videoId: string;
}
export const YouTubePlayerModal = ({
  closeModal,
  videoId,
}: YouTubePlayerModalPropsType) => {
  return (
    <Modal closeModal={closeModal}>
      <div className={styles.videoWrapper}>
        <YouTubePlayer videoId={videoId} />
      </div>
    </Modal>
  );
};

export default YouTubePlayerModal;
