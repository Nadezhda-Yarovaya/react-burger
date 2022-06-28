import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  IngredientsContext,
  IfMobileContext,
} from '../../services/app-contexts';
import { useWindowSize } from '../../hooks/resize.js';
import api from '../../utils/api';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';

const {
  page,
  main,
  ingredients,
  constructor,
  section_notdisplayed,
  section_flex,
} = appStyles;

function App() {
  const [allIngredients, setAllIngredients] = useState(null);
  const [width, height] = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOrdered, setIsMobiledOrdered] = useState(false);
  const [isPerformed, setIsPerformed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [areIngredientsShown, setAreIngredientsShown] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSetMobile();
  }, [width]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getIngredients()
      .then((res) => {
        setAllIngredients(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при соединении с сервером: ', err);
        setIsLoading(false);
      });
  }, []);

  function closeAllPopups() {
    closeModalIngredientsShown();
    closeIsPerformed();
  }

  const handleSetMobile = () => {
    if (width < 790) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsMobiledOrdered(false);
    }
  };

  function handleShowNutrients(currentItem) {
    setSelectedCard(currentItem);
    setAreIngredientsShown(!areIngredientsShown);
  }

  function closeModalIngredientsShown() {
    setAreIngredientsShown(false);
  }

  function closeIsPerformed() {
    setIsPerformed(false);
  }

  return (
    <>
      <IfMobileContext.Provider value={{ isMobile }}>
        <IngredientsContext.Provider value={{ allIngredients, orderNumber }}>
          <div className={page}>
            <AppHeader />

            <main className={`${main} mb-10`}>
              <section
                className={`mr-10} ${ingredients} ${
                  isMobile && isMobileOrdered
                    ? section_notdisplayed
                    : section_flex
                }`}
              >
                <BurgerIngredients
                  changeChoice={handleShowNutrients}
                  selectedCard={selectedCard}
                  isLoading={isLoading}
                />
              </section>
              <section className={`${constructor} `}>
                <BurgerConstructor
                  isMobileOrdered={isMobileOrdered}
                  setMobiledOrdered={setIsMobiledOrdered}
                  isLoading={isLoading}
                  isPerformed={isPerformed}
                  setIsPerformed={setIsPerformed}
                  setOrderNumber={setOrderNumber}
                />
              </section>
            </main>
          </div>{' '}
          {isPerformed && (
            <Modal
              closeModal={closeIsPerformed}
              closeAllPopups={closeAllPopups}
              windowWidth={width}
              windowHeight={height}
              type='orderPerformed'
              isOpen={true}
            >
              <OrderDetails />
            </Modal>
          )}
          {areIngredientsShown && (
            <Modal
              closeModal={closeModalIngredientsShown}
              closeAllPopups={closeAllPopups}
              windowWidth={width}
              windowHeight={height}
              isOpen={true}
            >
              <IngredientDetails selectedCard={selectedCard} />
            </Modal>
          )}
        </IngredientsContext.Provider>
      </IfMobileContext.Provider>
    </>
  );
}

export default App;
