import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useWindowSize } from '../../hooks/resize.js';
import TotalSum from '../TotalSum/TotalSum';
import ModalWindow from '../ModalWindow/ModalWindow';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import doneSign from '../../images/done.png';

import appStyles from './app.module.css';

const {
  page,
  main,
  ingredients,
  constructor,
  constructor_displayed,
  constructor_notdisplayed,
  window__button,
  digits,
  window__text,
  window__extra,
} = appStyles;

function App() {
  const [width] = useWindowSize();

  const [isMobileOrdered, setIsMobiledOrdered] = React.useState(false);
  const [isPerformed, setIsPerformed] = React.useState(false);

  function handlePerformOrder() {
    toggleIsPerformed();
  }

  function toggleIsPerformed() {
    setIsPerformed(!isPerformed);
  }

  function handleToggleIfMobile() {
    if (isMobileOrdered) {
      handlePerformOrder();
    }
    setIsMobiledOrdered(!isMobileOrdered);
  }

  const [isMobile, setIsMobile] = React.useState(false);

  const handleSetMobile = () => {
    if (width < 790) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsMobiledOrdered(false);
    }
  };

  React.useEffect(() => {
    handleSetMobile();
  }, [width]);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isIngredientsShown, setIsIngredientsShown] = React.useState(false);

  function handleShowNutrients(currentItem) {
    setSelectedCard(currentItem);
    toggleModalIngredientsShown();
  }

  function toggleModalIngredientsShown() {
    setIsIngredientsShown(!isIngredientsShown);
  }

  function closeModalWindow() {
    toggleModalIngredientsShown();
  }

  return (
    <div className={page}>
      <AppHeader isMobile={isMobile} />

      <main className={`${main} mb-10`}>
        <section
          className={`mr-10 ${isMobile ? 'pb-10' : ''} ${ingredients} ${
            isMobile ? (isMobileOrdered ? constructor_notdisplayed : '') : ''
          }`}
        >
          <BurgerIngredients
            changeChoice={handleShowNutrients}
            selectedCard={selectedCard}
            isIngredientsShown={isIngredientsShown}
            closeModalWindow={closeModalWindow}
          />
        </section>
        <section
          className={`${constructor} ${
            isMobile
              ? isMobileOrdered
                ? constructor_displayed
                : constructor_notdisplayed
              : ''
          }`}
        >
          <BurgerConstructor
            isMobileOrdered={isMobileOrdered}
            handleToggleIfMobile={handleToggleIfMobile}
            isMobile={isMobile}
          />

          {isMobile ? (
            <></>
          ) : (
            <TotalSum
              handleToggleIfMobile={handleToggleIfMobile}
              isMobileOrdered={isMobileOrdered}
              buttonSize='large'
              isMobile={isMobile}
              handlePerformOrder={handlePerformOrder}
            />
          )}
        </section>
        {isMobile ? (
          <TotalSum
            handleToggleIfMobile={handleToggleIfMobile}
            isMobileOrdered={isMobileOrdered}
            buttonSize='small'
            isMobile={isMobile}
            handlePerformOrder={handlePerformOrder}
          />
        ) : (
          <></>
        )}
      </main>
      {isPerformed ? (
        <ModalWindow>
          <button className={window__button} onClick={toggleIsPerformed}>
            <CloseIcon type='primary' />
          </button>
          <p className={`text text_type_digits-large ${digits}`}>03456</p>
          <p className={`text text_type_main-default mt-8 mb-15`}>
            Идентификатор заказа
          </p>
          <img src={doneSign} alt='заказ совершен' />
          <p
            className={`text text_type_main-default mt-15 mt-8 ${window__text}`}
          >
            Заказ начали готовить
          </p>
          <p className={`text text_type_main-default  ${window__extra}`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </ModalWindow>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
