import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import { Overlay } from '../Overlay';

const CloseIcon = dynamic(() => import('@/public/assets/icons/close.svg'), {
  ssr: false,
});

interface ModalPropsType {
  closeModal: () => void;
  variant?: 'wide' | 'fixedWidth';
  radius?: 'default' | 'circle';
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
  showCloseIcon?: boolean;
  fullWidth?: boolean;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const Modal = ({
  closeModal,
  children,
  className,
  variant,
  radius = 'default',
  scrollable = false,
  showCloseIcon = true,
  fullWidth = false,
  innerRef,
}: ModalPropsType) => {
  return (
    <Overlay closeModal={closeModal}>
      <div
        className={clsx(
          styles.modal,
          variant === 'fixedWidth' ? styles.fixedWidth : '',
          variant === 'wide' ? styles.wide : '',
          radius === 'circle' ? styles.circle : '',
          scrollable ? styles.scrollable : '',
          fullWidth ? styles.fullWidth : '',
          className ? className : '',
        )}
        onClick={(e) => e.stopPropagation()}
        ref={innerRef}
      >
        {showCloseIcon && (
          <div className={styles.closeButton} onClick={closeModal}>
            <CloseIcon />
          </div>
        )}
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
