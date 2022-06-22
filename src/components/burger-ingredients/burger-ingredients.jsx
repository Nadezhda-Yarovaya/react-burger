import React from 'react';
import { useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../meal-list/meal-list';
import PropTypes from 'prop-types';

import { ingredientType } from '../../utils/types';

const { title, list, tabs, ingredients } = ingredientsStyles;

function BurgerIngredients(props) {
  const { mainIngredients, changeChoice, selectedCard, isLoading } = props;
  const [current, setCurrent] = useState('one');

  /*
  function changeChoice(items, cardId, setArray) {
    const newArray = items.map((item) => {
      if (item._id === cardId) {
        return {
          ...item,
          chosen: !item.chosen,
        };
      } else {
        return item;
      }
    });
    setArray(newArray);
  }*/

  const bunsRef = React.useRef();
  const sauceRef = React.useRef();
  const stuffingRef = React.useRef();

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
          <div className={`ml-1 ${tabs}`}>
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

          <div className={`mt-10 ${list}`}>
            <section ref={bunsRef}>
              <MealList
                currentList={mainIngredients.buns}
                title='Булки'
                changeChoice={changeChoice}
                selectedCard={selectedCard}
              />
            </section>
            <section ref={sauceRef}>
              <MealList
                currentList={mainIngredients.sauce}
                title='Соусы'
                changeChoice={changeChoice}
              />
            </section>
            <section ref={stuffingRef}>
              <MealList
                currentList={mainIngredients.main}
                title='Начинки'
                changeChoice={changeChoice}
              />
            </section>
          </div>
        </div>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  mainIngredients: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientType),
    sauce: PropTypes.arrayOf(ingredientType),
    bunmains: PropTypes.arrayOf(ingredientType),
  }).isRequired,
  changeChoice: PropTypes.func.isRequired,
  selectedCard: ingredientType.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BurgerIngredients;
