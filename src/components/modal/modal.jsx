import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const { modal, modal__button, container } = modalStyles;

const modalRoot = document.getElementById('modal');

function Modal(props) {
  const [isOpened, setIsOpened] = React.useState(props.isOpen);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        props.closeAllPopups();
        setIsOpened(false);
      }
    }
    if (isOpened) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpened]);

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
        className={`pl-10 pr-10 pb-15 pt-10  ${modal}`}
        style={{ top: topPosition, left: leftPosition }}
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
  closeAllPopups: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  windowHeight: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Modal;
