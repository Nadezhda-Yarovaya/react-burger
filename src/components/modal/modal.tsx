import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useSelector } from '../../hooks/hooks';

const { modal, modal__button, container } = modalStyles;

const modalRoot = document.getElementById('modal') as HTMLElement;

type TModalProps = {
  isOpen?: boolean;
  closeModal: () => void;
  type?: string;
  children?: React.ReactNode;
};

const Modal: FC<TModalProps> = ({ isOpen, closeModal, type, children }) => {
  const [isOpened, setIsOpened] = useState(isOpen);

  const isMobile = useSelector((store) => store.mobile.isMobile);
  const windowWidth = useSelector((store) => store.mobile.windowData.width);
  const windowHeight = useSelector((store) => store.mobile.windowData.height);

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        closeModal();
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

  const modalHeight = type === 'orderPerformed' ? 650 : 538;

  const topPosition = ((windowHeight - modalHeight) / 2).toString() + 'px';
  const leftPosition =
    (
      (windowWidth - (isMobile ? (windowWidth < 480 ? 290 : 420) : 720)) /
      2
    ).toString() + 'px';

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div
        className={`pl-10 pr-10 pb-15 pt-10  ${modal}`}
        style={{ top: topPosition, left: leftPosition }}
      >
        <div className={`${container}`}>
          <button className={modal__button} onClick={closeModal}>
            <CloseIcon type='primary' />
          </button>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
