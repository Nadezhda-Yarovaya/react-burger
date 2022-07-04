import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useWindowSize } from '../../hooks/resize.js';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import MultiBackend, {
  TouchTransition,
  MouseTransition,
} from 'react-dnd-multi-backend';
import { fetchAllIngredients } from '../../services/action-creators/ingredients-action-creators';

//import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { ifItsMobile } from '../../services/selectors';

import {
  SET_ALLINGREDIENTS,
  SET_CURRENT,
  SET_IFMOBILE,
  REMOVE_CURRENT,
  NULL_ORDERDATA,
  SET_IFMOBILEORDERED,
  SET_MODALINGREDIENTS,
  REMOVE_MODALINGREDIENTS,
  CLOSE_MOBILEMENU,
  SET_WINDOWDATA,
} from '../../services/actions';

/*
const opts= {
    enableMouseEvents: false,
    scrollAngleRanges: [
    { start: 30, end: 150 },
    { start: 210, end: 330 }
  ]
};*/

/*
scrollAngleRanges: [
        { start: 30, end: 150 },
        { start: 210, end: 330 }*/

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
      },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const {
  page,
  main,
  ingredients,
  constructor,
  section_notdisplayed,
  section_flex,
} = appStyles;

function App() {
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    handleSetMobile();
    handleSetWindowData();
  }, [width, height]);

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, []);

  const isPerformed = useSelector((state) => state.order.isPerformed);
  const isMobile = useSelector(ifItsMobile);
  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);
  const areIngredientsShown = useSelector(
    (state) => state.ingredients.areIngredientsShown
  );
  const isMobileMenuOpened = useSelector(
    (store) => store.mobile.isMobileMenuOpened
  );
  const isLoading = useSelector((state) => state.ingredients.isLoading);

  function closeAllPopups() {
    //closeModalIngredientsShown();
    //closeIsPerformed();
  }

  function closeIsPerformed() {
    dispatch({
      type: NULL_ORDERDATA,
    });
  }
  function closeModalIngredientsShown() {
    //setAreIngredientsShown(false);
    dispatch({
      type: REMOVE_CURRENT,
    });
    dispatch({
      type: REMOVE_MODALINGREDIENTS,
    });
  }

  const handleSetMobile = () => {
    if (width < 790) {
      //setIsMobile(true);
      dispatch({
        type: SET_IFMOBILE,
        payload: true,
      });
    } else {
      dispatch({
        type: SET_IFMOBILE,
        payload: false,
      });
      //setIsMobiledOrdered(false);
      dispatch({
        type: SET_IFMOBILEORDERED,
        payload: false,
      });
      if (isMobileMenuOpened) {
      dispatch({
        type: CLOSE_MOBILEMENU,
      });
    }
    }
  };

  const handleSetWindowData = () => {
    dispatch({
      type: SET_WINDOWDATA,
      payload: {
        width: width,
        height: height,
      },
    });
  };

  return (
    <>
      <div className={page}>
        <AppHeader />

        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <main className={`${main} mb-10`}>
            <section
              className={`mr-10} ${ingredients} ${
                isMobile && isMobileOrdered
                  ? section_notdisplayed
                  : section_flex
              }`}
            >
              <BurgerIngredients />
            </section>
            <section className={`${constructor}`}>
              <BurgerConstructor />
            </section>
          </main>
        </DndProvider>
      </div>{' '}
      {isPerformed ? (
        <Modal
          closeModal={closeIsPerformed}
          type='orderPerformed'
          isOpen={true}
        >
          <OrderDetails />
        </Modal>
      ) : (
        <></>
      )}
      {areIngredientsShown && (
        <Modal closeModal={closeModalIngredientsShown} isOpen={true}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
