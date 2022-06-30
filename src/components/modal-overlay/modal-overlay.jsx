import React from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal-overlay.module.css';
const { overlay } = modalStyles;

function ModalOverlay(props) {
  return (
    <div className={overlay} onClick={props.closeModal}>
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
