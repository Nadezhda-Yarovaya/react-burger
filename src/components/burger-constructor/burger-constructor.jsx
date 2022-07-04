import React, { useState, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import ConstructorList from '../constructor-list/constructor-list';

import api from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';

import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
  SET_TOTALSUM,
  SET_IFMOBILEORDERED
} from '../../services/actions';
import { useDrop } from 'react-dnd';

import TotalSum from '../total-sum/total-sum';
import { ifItsMobile, loadIngredients } from '../../services/selectors';
import { fetchOrderNumber } from '../../services/action-creators/order-action-creators';
const initialSum = { totalSum: 0 };

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
  tempDropCont,
} = constructorStyles;

function BurgerConstructor(props) {
  const dispatch = useDispatch();
  const listOfIngredients = useSelector((store) => {
    //   console.log('allStore: ', store);
    return store.ingredients.listOfIngredients;
  });

  const createdStuffingsList = useSelector((store) => store.dragAndDrop.droppedElements);

  //const [stuffingsList, setStuffingsList] = useState([]);

  //const { isMobile } = useContext(IfMobileContext);
  const isMobile = useSelector(ifItsMobile);
  const isMobileOrdered = useSelector(store=>store.mobile.isMobileOrdered);
  const bunSelectedFromStore = useSelector(store=>{
    //console.log('bun here: ', store.ingredients.bun);
    return store.ingredients.bun;
  });

  const isLoading = useSelector(loadIngredients);

  //  console.log('constructor ingred: ', listOfIngredients);

  //const [bunSelected, setBunSelected] = useState(initialItem);

  useEffect(() => {
    if (listOfIngredients) {
      //const stuffings = defineStuffings(listOfIngredients);
      //setStuffingsList(stuffings);
      calculateAllPrices(createdStuffingsList);
      //setBunSelected(listOfIngredients[0]);
    }
  }, [bunSelectedFromStore, createdStuffingsList, listOfIngredients]);
  /*
  function defineStuffings(allData) {
    return allData.filter((item, index) => index > 4 && index < 7);
  }*/

  function calculateAllPrices(stuffings) {
    let allPrices = [];
    stuffings.forEach((item, index) => {
      allPrices[index] = item.price;
    });
    const finalNumber =
      allPrices.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) +
      bunSelectedFromStore.price * 2;


    dispatch({ type: SET_TOTALSUM, totalSum: finalNumber });
  }

  function makeListOfOrder() {
    const ingredientsFormed = [];
    ingredientsFormed.push(bunSelectedFromStore[0]._id);

    createdStuffingsList.forEach((item) => {
      ingredientsFormed.push(item._id);
    });

    ingredientsFormed.push(bunSelectedFromStore[0]._id); //вторая сторона булки тоже добавлена
    return ingredientsFormed;
  }

  function handlePerformOrder() {
    
    const thisOrderList = makeListOfOrder();
    console.log('am i here? ', thisOrderList);
    dispatch(fetchOrderNumber(thisOrderList));
  }

  function handleToggleIfMobile() {
    if (isMobileOrdered) {
      handlePerformOrder();
    }
    dispatch({
      type: SET_IFMOBILEORDERED,
      payload: !isMobileOrdered
    })
    //setMobiledOrdered(!isMobileOrdered);
  }

  const mobileListStyle = isMobileOrdered ? list_displayed : list_notdisplayed;

  return (
    <>
      <div
        className={`${container}
    ${isMobile ? mobileListStyle : list_flex}`}
      >
        {isMobile && isMobileOrdered ? (
          <div className={constructor__order}>
            <p className={constructor__title}>Заказ</p>
            <button
              onClick={() => {
                dispatch({
                  type: SET_IFMOBILEORDERED,
                  payload: false
                });
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
        />
      </div>

      {isLoading ? (
        <></>
      ) : (
        <TotalSum
          handleToggleIfMobile={handleToggleIfMobile}
          handlePerformOrder={handlePerformOrder}
        />
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  /*  isMobileOrdered: PropTypes.bool.isRequired,
  setMobiledOrdered: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPerformed: PropTypes.bool.isRequired,
  setIsPerformed: PropTypes.func.isRequired,
  setOrderNumber: PropTypes.func.isRequired,*/
};

export default BurgerConstructor;
