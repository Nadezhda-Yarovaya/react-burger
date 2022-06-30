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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import appStyles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_ALLINGREDIENTS,
  SET_CURRENT,
  SET_IFMOBILE,
  REMOVE_CURRENT,
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
  //const [allIngredients, setAllIngredients] = useState(null);
  const [width, height] = useWindowSize();
  //const [isMobile, setIsMobile] = useState(false);
  const [isMobileOrdered, setIsMobiledOrdered] = useState(false);
  const [isPerformed, setIsPerformed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [areIngredientsShown, setAreIngredientsShown] = useState(false);
  //const [orderNumber, setOrderNumber] = useState(//0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const isMobile = useSelector((store) => store.isMobile);

  useEffect(() => {
    handleSetMobile();
  }, [width]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getIngredients()
      .then((res) => {
        const arrayWithChosen = addChosenItems(res.data);
        dispatch({
          type: SET_ALLINGREDIENTS,
          listOfIngredients: arrayWithChosen,
        });
        //setAllIngredients(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при соединении с сервером: ', err);
        setIsLoading(false);
      });
  }, []);

  /* chosen functionality delete totally */
  function addChosenItems(arr) {
    /*  return arr.map((item, index) => {
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
      });*/
    return arr.map((item) => {
      return {
        ...item,
        chosen: false,
      };
    });
  }

  function closeAllPopups() {
    closeModalIngredientsShown();
    closeIsPerformed();
  }

  const handleSetMobile = () => {
    if (width < 790) {
      //setIsMobile(true);
      dispatch({
        type: SET_IFMOBILE,
        isMobile: true,
      });
    } else {
      dispatch({
        type: SET_IFMOBILE,
        isMobile: false,
      });
      setIsMobiledOrdered(false);
    }
  };

  function handleShowNutrients(currentItem) {
    setSelectedCard(currentItem);
    dispatch({
      type: SET_CURRENT,
      currentIngredient: currentItem,
    });
    setAreIngredientsShown(!areIngredientsShown);
  }

  function closeModalIngredientsShown() {
    setAreIngredientsShown(false);
    dispatch({
      type: REMOVE_CURRENT,
    });
  }

  function closeIsPerformed() {
    setIsPerformed(false);
  }

  return (
    <>
      <div className={page}>
        <AppHeader />

        <DndProvider backend={HTML5Backend}>
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
            <section className={`${constructor}`}>
              <BurgerConstructor
                isMobileOrdered={isMobileOrdered}
                setMobiledOrdered={setIsMobiledOrdered}
                isLoading={isLoading}
                isPerformed={isPerformed}
                setIsPerformed={setIsPerformed}
              />
            </section>
          </main>
        </DndProvider>
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
    </>
  );
}

export default App;
