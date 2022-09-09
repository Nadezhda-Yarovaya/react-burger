import React, { FC, useEffect, useRef, useState } from 'react';
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

  const thisRef1 = useRef<HTMLDivElement>(null);

  const modalHeight = type === 'orderPerformed' ? 650 : 538;
  const [realHeight, setRealHeight] = useState<number>(modalHeight);

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

  useEffect(() => {
    const rectangle = (
      thisRef1 as React.MutableRefObject<HTMLDivElement>
    ).current?.getBoundingClientRect();

    setRealHeight(rectangle.height);
  }, [realHeight]);

  const topPosition = ((windowHeight - realHeight) / 2).toString() + 'px';
  const leftPosition =
    (
      (windowWidth - (isMobile ? (windowWidth < 480 ? 620 : 610) : 720)) /
      2
    ).toString() + 'px';

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div
        className={`pl-10 pr-10 pb-10 pt-10  ${modal}`}
        ref={thisRef1}
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
