import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useWindowSize } from '../../hooks/resize.js';

import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import { fetchAllIngredients } from '../../services/action-creators/ingredients-action-creators';

import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { ifItsMobile } from '../../services/selectors';

import {
  SET_IFMOBILE,
  REMOVE_CURRENT,
  CLEAR_ORDERDATA,
  SET_IFMOBILEORDERED,
  REMOVE_MODALINGREDIENTS,
  CLOSE_MOBILEMENU,
  SET_WINDOWDATA,
  CLEAR_BUN,
  CLEAR_STUFFINGLIST,
} from '../../services/actions';

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

  function closeIsPerformed() {
    dispatch({
      type: CLEAR_ORDERDATA,
    });
    dispatch({
      type: CLEAR_BUN,
    });

    dispatch({
      type: CLEAR_STUFFINGLIST,
    });
  }
  function closeModalIngredientsShown() {
    dispatch({
      type: REMOVE_CURRENT,
    });
    dispatch({
      type: REMOVE_MODALINGREDIENTS,
    });
  }

  const handleSetMobile = () => {
    if (width < 790) {
      dispatch({
        type: SET_IFMOBILE,
        payload: true,
      });
    } else {
      dispatch({
        type: SET_IFMOBILE,
        payload: false,
      });
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
