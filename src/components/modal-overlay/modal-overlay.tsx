import React, {FC} from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal-overlay.module.css';
const { overlay } = modalStyles;

type TOverlayProps = {
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalOverlay: FC<TOverlayProps> = ({closeModal, children}) => {
  return (
    <div className={overlay} onClick={closeModal}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
