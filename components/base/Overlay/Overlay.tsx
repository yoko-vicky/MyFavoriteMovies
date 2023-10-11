import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Overlay.module.scss';

interface OverlayPropsType {
  closeModal: () => void;
  children: ReactNode;
}

export const Overlay = ({ closeModal, children }: OverlayPropsType) => {
  const portalRoot = document.getElementById('portal-root') as HTMLElement;
  // logger.log({ portalRoot });
  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>,
    portalRoot,
  );
};

export default Overlay;
