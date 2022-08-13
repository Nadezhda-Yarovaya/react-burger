import React, { FC } from 'react';
import modalStyles from './modal-overlay.module.css';
const { overlay } = modalStyles;

type TOverlayProps = {
  closeModal: () => void;
  children?: React.ReactNode;
};

const ModalOverlay: FC<TOverlayProps> = ({ closeModal, children }) => {
  return (
    <div className={overlay} onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
