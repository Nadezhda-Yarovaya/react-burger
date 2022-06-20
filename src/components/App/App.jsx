import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { useWindowSize } from '../../hooks/resize.js';
import TotalSum from '../total-sum/total-sum';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';

import { useState, useEffect } from 'react';

import getIngredients from '../../utils/api';
import appStyles from './app.module.css';

const {
  page,
  main,
  ingredients,
  constructor,
  constructor_displayed,
  constructor_notdisplayed,
} = appStyles;

function App() {
  const [allIngredients, setAllIngredients] = useState([{ name: 'sdfsf' }]);
  const [width] = useWindowSize();
  const [isMobileOrdered, setIsMobiledOrdered] = useState(false);
  const [isPerformed, setIsPerformed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isIngredientsShown, setIsIngredientsShown] = useState(false);
  const [totalSumOrder, setTotalSumOrder] = useState(0);
  const [mainIngredients, setMainIngredients] = useState({
    buns: [],
    sauce: [],
    main: [],
  });
  const [stuffingsList, setStuffingsList] = useState([]);

  useEffect(() => {
    handleSetMobile();
  }, [width]);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setAllIngredients(res.data);
        const arrayWithChosen = addChosenItems(res.data);
        setMainIngredients({
          buns: filterByType(arrayWithChosen, 'bun'),
          sauce: filterByType(arrayWithChosen, 'sauce'),
          main: filterByType(arrayWithChosen, 'main'),
        });
        defineStuffingsAndTotal(res.data);
      })
      .catch((err) => {
        console.log('Ошибка при соединении с сервером: ', err);
      });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
  }, []);

  function closeByEsc(e) {
    if (e.key === 'Escape') {
      closeModalIngredientsShown();
      closeIsPerformed();
    }
  }

  function defineStuffingsAndTotal(allData) {
    let allPrices = [];
    const tempStuffings = allData.filter(
      (item, index) => index > 3 && index < 10
    );
    setStuffingsList(tempStuffings);
    tempStuffings.forEach((item, index) => {
      allPrices[index] = item.price;
    });
    const finalNumber =
      allPrices.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        1
      ) + allData[0].price;
    setTotalSumOrder(finalNumber);
  }

  function filterByType(arr, type) {
    return arr.filter((item) => item.type === type);
  }

  function addChosenItems(arr) {
    return arr.map((item, index) => {
      if (index === 0 || index === 4 || index === 5) {
        return {
          ...item,
          chosen: true,
        };
      } else {
        return {
          ...item,
          chosen: false,
        };
      }
    });
  }

  function handlePerformOrder() {
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

  function handleShowNutrients(currentItem) {
    setSelectedCard(currentItem);
    toggleModalIngredientsShown();
  }

  function toggleModalIngredientsShown() {
    setIsIngredientsShown(!isIngredientsShown);
  }

  function closeModalIngredientsShown() {
    setIsIngredientsShown(false);
  }

  function closeIsPerformed() {
    setIsPerformed(false);
  }

  const modalPerformed = (
    <ModalOverlay closeModal={closeIsPerformed}>
      <Modal closeModal={closeIsPerformed}>
        <OrderDetails />
      </Modal>
    </ModalOverlay>
  );

  const modalIngredient = (
    <ModalOverlay closeModal={closeModalIngredientsShown}>
      <Modal closeModal={closeModalIngredientsShown}>
        <IngredientDetails selectedCard={selectedCard} />
      </Modal>
    </ModalOverlay>
  );

  return (
    <>
      <div className={page}>
        <AppHeader isMobile={isMobile} />

        <main className={`${main} mb-10`}>
          <section
            className={`mr-10 ${isMobile ? 'pb-10' : ''} ${ingredients} ${
              isMobile ? (isMobileOrdered ? constructor_notdisplayed : '') : ''
            }`}
          >
            <BurgerIngredients
              mainIngredients={mainIngredients}
              changeChoice={handleShowNutrients}
              selectedCard={selectedCard}
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
              isMobile={isMobile}
              allIngredients={allIngredients}
              stuffingsList={stuffingsList}
              setMobiledOrdered={setIsMobiledOrdered}
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
                totalSumOrder={totalSumOrder}
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
              totalSumOrder={totalSumOrder}
            />
          ) : (
            <></>
          )}
        </main>
      </div>{' '}
      {isPerformed ? modalPerformed : <></>}
      {isIngredientsShown ? modalIngredient : <></>}
    </>
  );
}

export default App;
