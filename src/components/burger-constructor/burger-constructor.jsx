import React, { useState, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import ConstructorList from '../constructor-list/constructor-list';

import { TotalSumContext } from '../../services/app-contexts';
import api from '../../utils/api';

import {
  IngredientsContext,
  IfMobileContext,
} from '../../services/app-contexts';
import TotalSum from '../total-sum/total-sum';
const initialSum = { totalSum: 0 };

function totalSumReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, totalSum: action.payload };
    default:
      return state;
  }
}

const initialItem = {
  name: 'ТЕСТ Выберите булку',
  image: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  price: 0,
  _id: '60d3b41abdacab0026a733c7',
};

const {
  constructor__title,
  constructor__order,
  constructor__button,
  list_displayed,
  list_notdisplayed,
  list_flex,
  container,
} = constructorStyles;

function BurgerConstructor(props) {
  const [totalSumOrder, setTotalSumOrder] = useReducer(
    totalSumReducer,
    initialSum,
    undefined
  );
  const [stuffingsList, setStuffingsList] = useState([]);

  const { isMobile } = useContext(IfMobileContext);

  const {
    isMobileOrdered,
    setMobiledOrdered,
    isLoading,
    isPerformed,
    setIsPerformed,
    setOrderNumber,
  } = props;

  const { allIngredients } = useContext(IngredientsContext);
  const [bunSelected, setBunSelected] = useState(initialItem);

  useEffect(() => {
    if (allIngredients) {
      const stuffings = defineStuffings(allIngredients);
      setStuffingsList(stuffings);
      calculateAllPrices(stuffings);
      setBunSelected(allIngredients[0]);
    }
  }, [allIngredients]);

  function defineStuffings(allData) {
    return allData.filter((item, index) => index > 4 && index < 11);
  }

  function calculateAllPrices(stuffings) {
    let allPrices = [];
    stuffings.forEach((item, index) => {
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

  function handlePerformOrder() {
    const ingredientsFormed = [];
    ingredientsFormed.push(allIngredients[0]._id);

    stuffingsList.forEach((item) => {
      ingredientsFormed.push(item._id);
    });

    ingredientsFormed.push(allIngredients[0]._id); //вторая сторона булки тоже добавлена
    placeOrder(ingredientsFormed);
  }

  function placeOrder(ingredientsInOrder) {
    api
      .makeOrder({ ingredients: ingredientsInOrder })
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
    setMobiledOrdered(!isMobileOrdered);
  }

  const mobileListStyle = isMobileOrdered ? list_displayed : list_notdisplayed;

  return (
    <>
      <TotalSumContext.Provider value={{ totalSumOrder }}>
        <div
          className={`${container}
    ${isMobile ? mobileListStyle : list_flex}`}
        >
          {isMobile && isMobileOrdered ? (
            <div className={constructor__order}>
              <p className={constructor__title}>Заказ</p>
              <button
                onClick={() => {
                  setMobiledOrdered(false);
                }}
                className={constructor__button}
              >
                <CloseIcon type='primary' />
              </button>
            </div>
          ) : (
            <></>
          )}
          <ConstructorList
            stuffingsList={stuffingsList}
            isLoading={isLoading}
            bunSelected={bunSelected}
          />
        </div>
        {isLoading ? (
          <></>
        ) : (
          <TotalSum
            handleToggleIfMobile={handleToggleIfMobile}
            isMobileOrdered={isMobileOrdered}
            handlePerformOrder={handlePerformOrder}
          />
        )}
      </TotalSumContext.Provider>
    </>
  );
}

BurgerConstructor.propTypes = {
  isMobileOrdered: PropTypes.bool.isRequired,
  setMobiledOrdered: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPerformed: PropTypes.bool.isRequired,
  setIsPerformed: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
