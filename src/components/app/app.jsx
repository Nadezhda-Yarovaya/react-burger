import React, { useState, useContext, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  IngredientsContext,
  TotalSumContext,
} from '../../contexts/appContexts';
import { useWindowSize } from '../../hooks/resize.js';
import TotalSum from '../total-sum/total-sum';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import api from '../../utils/api';
import appStyles from './app.module.css';
const initialSum = { totalSum: 0 };
const initialItem = {
  name: 'Выберите булку',
  image: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  price: 0,
  _id: '60d3b41abdacab0026a733c7',
};

function totalSumReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { totalSum: action.payload };
    default:
      throw new Error(`Такого типа экшна нет: ${action.type}`);
  }
}

const {
  page,
  main,
  ingredients,
  constructor,
  constructor_displayed,
  constructor_notdisplayed,
} = appStyles;

function App() {
  const [allIngredients, setAllIngredients] = useState([{ name: 'тест' }]);
  const [width, height] = useWindowSize();
  const [isMobileOrdered, setIsMobiledOrdered] = useState(false);
  const [isPerformed, setIsPerformed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isIngredientsShown, setIsIngredientsShown] = useState(false);
  const [bunSelected, setBunSelected] = useState(initialItem);
  const [totalSumOrder, setTotalSumOrder] = useReducer(
    totalSumReducer,
    initialSum,
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mainIngredients, setMainIngredients] = useState({
    buns: [initialItem],
    sauce: [initialItem],
    main: [initialItem],
  });
  const [stuffingsList, setStuffingsList] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    handleSetMobile();
  }, [width]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getIngredients()
      .then((res) => {
        setAllIngredients(res.data);
        const arrayWithChosen = addChosenItems(res.data);
        setMainIngredients({
          buns: filterByType(arrayWithChosen, 'bun'),
          sauce: filterByType(arrayWithChosen, 'sauce'),
          main: filterByType(arrayWithChosen, 'main'),
        });
        setBunSelected(res.data[0]); //later I'll write down the chosen bun here
        defineStuffingsAndTotal(res.data);
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

  function defineStuffingsAndTotal(allData) {
    let allPrices = [];
    const tempStuffings = allData.filter(
      (item, index) => index > 2 && index < 9
    );
    setStuffingsList(tempStuffings);
    tempStuffings.forEach((item, index) => {
      allPrices[index] = item.price;
    });
    const finalNumber =
      allPrices.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        1
      ) +
      bunSelected.price * 2;

    setTotalSumOrder({ type: 'set', payload: finalNumber });
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
    const ingredientsFormed = [];
    ingredientsFormed.push(allIngredients[0]._id);
    stuffingsList.forEach((item) => {
      ingredientsFormed.push(item._id);
    });

    api
      .makeOrder({ ingredients: ingredientsFormed })
      .then((res) => {
        setIsPerformed(!isPerformed);
        setOrderNumber(res.order.number);
      })
      .catch((err) => console.log(err));
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
    <Modal
      closeModal={closeIsPerformed}
      closeAllPopups={closeAllPopups}
      windowWidth={width}
      windowHeight={height}
      isMobile={isMobile}
      type='orderPerformed'
      isOpen={true}
    >
      <OrderDetails />
    </Modal>
  );

  const modalIngredient = (
    <Modal
      closeModal={closeModalIngredientsShown}
      closeAllPopups={closeAllPopups}
      windowWidth={width}
      windowHeight={height}
      isMobile={isMobile}
      isOpen={true}
    >
      <IngredientDetails selectedCard={selectedCard} />
    </Modal>
  );

  return (
    <>
      <TotalSumContext.Provider value={{ totalSumOrder }}>
        <IngredientsContext.Provider
          value={{ mainIngredients, stuffingsList, orderNumber }}
        >
          <div className={page}>
            <AppHeader isMobile={isMobile} />

            <main className={`${main} mb-10`}>
              <section
                className={`mr-10 ${isMobile ? 'pb-10' : ''} ${ingredients} ${
                  isMobile
                    ? isMobileOrdered
                      ? constructor_notdisplayed
                      : ''
                    : ''
                }`}
              >
                <BurgerIngredients
                  changeChoice={handleShowNutrients}
                  selectedCard={selectedCard}
                  isLoading={isLoading}
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
                  setMobiledOrdered={setIsMobiledOrdered}
                  isLoading={isLoading}
                  bunSelected={bunSelected}
                />

                {isMobile ? (
                  <></>
                ) : isLoading ? (
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
                isLoading ? (
                  <></>
                ) : (
                  <TotalSum
                    handleToggleIfMobile={handleToggleIfMobile}
                    isMobileOrdered={isMobileOrdered}
                    buttonSize='large'
                    isMobile={isMobile}
                    handlePerformOrder={handlePerformOrder}
                  />
                )
              ) : (
                <></>
              )}
            </main>
          </div>{' '}
          {isPerformed ? modalPerformed : <></>}
          {isIngredientsShown ? modalIngredient : <></>}
        </IngredientsContext.Provider>
      </TotalSumContext.Provider>
    </>
  );
}

export default App;
