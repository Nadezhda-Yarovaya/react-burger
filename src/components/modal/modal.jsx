import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const { modal, modal__button, container } = modalStyles;

const modalRoot = document.getElementById('modal');

function Modal(props) {
  React.useEffect(() => {
    document.addEventListener('keydown', props.closeByEsc);
    return () => {
      document.removeEventListener('keydown', props.closeByEsc);
    };
  }, []);

  const modalHeight = props.type === 'orderPerformed' ? 650 : 538;

  const topPosition =
    ((props.windowHeight - modalHeight) / 2).toString() + 'px';
  const leftPosition =
    (
      (props.windowWidth -
        (props.isMobile ? (props.windowWidth < 480 ? 290 : 420) : 720)) /
      2
    ).toString() + 'px';

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={props.closeModal} />
      <div
        style={{ top: topPosition, left: leftPosition }}
        className={`pl-10 pr-10 pb-15 pt-10  ${modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${container}`}>
          <button className={modal__button} onClick={props.closeModal}>
            <CloseIcon type='primary' />
          </button>
          {props.children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  closeByEsc: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Modal;