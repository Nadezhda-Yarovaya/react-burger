import modalWindowStyles from './modal-window.module.css';

const { window, window__container } = modalWindowStyles;

function ModalWindow(props) {
  return (
    <div className={window}>
      <div className={`pl-10 pr-10 pb-15 pt-10  ${window__container}`}>
        {props.children}
      </div>
    </div>
  );
}

export default ModalWindow;
