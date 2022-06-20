import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal-overlay.module.css';
const { overlay } = modalStyles;

const modalRoot = document.getElementById('modal');

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div className={overlay} onClick={props.closeModal}>
      {props.children}
    </div>,
    modalRoot
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
