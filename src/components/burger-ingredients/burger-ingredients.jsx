import React from 'react';
import { useState, useContext, useEffect } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../meal-list/meal-list';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGREDIENTSBYCAT } from '../../services/actions';
import { useDrag } from 'react-dnd';
import { useInView } from 'react-intersection-observer';

import { ingredientType } from '../../utils/types';
import { loadIngredients } from '../../services/selectors';

const { title, list, tabs, ingredients, tab1 } = ingredientsStyles;

function BurgerIngredients(props) {
  const dispatch = useDispatch();
  //const { changeChoice, selectedCard, isLoading } = props;
  const [current, setCurrent] = useState('one');
  //const { allIngredients } = useContext(IngredientsContext);
  /* const [mainIngredients, setMainIngredients] = useState({
    buns: [initialItem],
    sauce: [initialItem],
    main: [initialItem],
  }); */

  const isLoading = useSelector(loadIngredients);

  const allIngredients = useSelector((store) => {
    //    console.log('all: ', store);
    return store.ingredients.listOfIngredients;
  });

  //console.log('final ingred from redux: ', burgerIngredients);

  useEffect(() => {
    if (allIngredients) {
      //console.log('wer here');
      const formedIngredients = {
        bun: filterByType(allIngredients, 'bun'),
        sauce: filterByType(allIngredients, 'sauce'),
        main: filterByType(allIngredients, 'main'),
      };
      dispatch({
        type: SET_INGREDIENTSBYCAT,
        payload: formedIngredients,
      });
    }
  }, [allIngredients]);

  function filterByType(arr, type) {
    return arr.filter((item) => item.type === type);
  }

  const bunsRef = React.useRef();
  const sauceRef = React.useRef();
  const stuffingRef = React.useRef();
  const listRef = React.useRef();

  function scroll() {
    let scrollYinitial = Math.floor(
      listRef.current?.getBoundingClientRect().top
    );
    let sauceOffset =
      Math.floor(sauceRef.current?.getBoundingClientRect().top) - 100;
    let stuffingOffset =
      Math.floor(stuffingRef.current?.getBoundingClientRect().top) - 180;

    if (sauceOffset < scrollYinitial && sauceOffset > -280) {
      setCurrent('two');
    } else if (stuffingOffset < scrollYinitial) {
      setCurrent('three');
    } else {
      setCurrent('one');
    }
  }

  function handleTabClick(currentRef) {
    currentRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <h1 className={`mt-10 mb-5 ml-1 ${title}`}>Соберите бургер</h1>
      {isLoading ? (
        <p className='text text_type_main-small'>Загрузка...</p>
      ) : (
        <div className={ingredients}>
          <div className={`${tabs}`}>
            <div className={tab1}>
              <Tab
                value='one'
                active={current === 'one'}
                onClick={() => {
                  setCurrent('one');
                  handleTabClick(bunsRef);
                }}
              >
                Булки
              </Tab>
            </div>
            <div className={tab1}>
              <Tab
                value='two'
                active={current === 'two'}
                onClick={() => {
                  setCurrent('two');
                  handleTabClick(sauceRef);
                }}
              >
                Соусы
              </Tab>
            </div>
            <div className={tab1}>
              <Tab
                value='three'
                active={current === 'three'}
                onClick={() => {
                  setCurrent('three');
                  handleTabClick(stuffingRef);
                }}
              >
                Начинки
              </Tab>
            </div>
          </div>

          <div className={`mt-10 ${list}`} onScroll={scroll} ref={listRef}>
            <section ref={bunsRef}>
              <MealList title='Булки' type='bun' />
            </section>
            <section ref={sauceRef}>
              <MealList title='Соусы' type='sauce' />
            </section>
            <section ref={stuffingRef}>
              <MealList title='Начинки' type='main' />
            </section>
          </div>
        </div>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
