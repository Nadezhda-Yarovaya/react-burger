import React from 'react';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const { modal, modal__button } = modalStyles;

function Modal(props) {
  return (
    <>
      <div
        className={`pl-10 pr-10 pb-15 pt-10  ${modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modal__button} onClick={props.closeModal}>
          <CloseIcon type='primary' />
        </button>
        {props.children}
      </div>
    </>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
