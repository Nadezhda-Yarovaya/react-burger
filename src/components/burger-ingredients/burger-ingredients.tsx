import { useState, useEffect, useRef } from 'react';
import React, { FC } from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../meal-list/meal-list';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGREDIENTSBYCAT } from '../../services/actions';
import { getAllIngredients, loadIngredients } from '../../services/selectors';
import { TIngredient } from '../../utils/types';

const { title, list, tabs, ingredients, tabcontainer } = ingredientsStyles;

  const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('one');

  const isLoading = useSelector(loadIngredients);

  const allIngredients = useSelector(getAllIngredients);

  const bunsRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const stuffingRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (allIngredients) {
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

  function filterByType(arr : Array<TIngredient>, type: string) {
    return arr.filter((item) => item.type === type);
  }

  function scroll() {
    let scrollYinitial = Math.floor(
      listRef.current!.getBoundingClientRect().top
    );
    let sauceOffset =
      Math.floor(sauceRef.current!.getBoundingClientRect().top) - 100;
    let stuffingOffset =
      Math.floor(stuffingRef.current!.getBoundingClientRect().top) - 180;

    if (sauceOffset < scrollYinitial && sauceOffset > -280) {
      setCurrent('two');
    } else if (stuffingOffset < scrollYinitial) {
      setCurrent('three');
    } else {
      setCurrent('one');
    }
  }

  function handleTabClick(currentRef: HTMLElement) {
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
            <div className={tabcontainer}>
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
            <div className={tabcontainer}>
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
            <div className={tabcontainer}>
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
            <div ref={bunsRef}>
              <MealList title='Булки' type='bun' />
            </div>
            <div ref={sauceRef}>
              <MealList title='Соусы' type='sauce' />
            </div>
            <div ref={stuffingRef}>
              <MealList title='Начинки' type='main' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BurgerIngredients;
