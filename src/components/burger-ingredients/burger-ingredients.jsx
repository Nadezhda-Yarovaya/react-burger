import React from 'react';
import { useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../meal-list/meal-list';
import PropTypes from 'prop-types';

import  {ingredientsPropTypes} from '../../utils/data';

const { title, list, tabs, ingredients } = ingredientsStyles;

function BurgerIngredients(props) {
  const { mainIngredients, changeChoice, selectedCard } = props;
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

  return (
    <>
      <h1 className={`mt-10 mb-5 ml-1 ${title}`}>Соберите бургер</h1>
      <div className={ingredients}>
        <div className={`ml-1 ${tabs}`}>
          <Tab
            value='one'
            active={current === 'one'}
            onClick={() => {
              setCurrent('one');
              window.location.href = '#buns';
            }}
          >
            Булки
          </Tab>
          <Tab
            value='two'
            active={current === 'two'}
            onClick={() => {
              setCurrent('two');
              window.location.href = '#sauces';
            }}
          >
            Соусы
          </Tab>
          <Tab
            value='three'
            active={current === 'three'}
            onClick={() => {
              setCurrent('three');
              window.location.href = '#stuffing';
            }}
          >
            Начинки
          </Tab>
        </div>

        <div className={`mt-10 ${list}`}>
          <section>
            <a name='buns'></a>
            <MealList
              currentList={mainIngredients.buns}
              title='Булки'
              changeChoice={changeChoice}
              selectedCard={selectedCard}
            />
          </section>
          <section>
            <a name='sauces'></a>
            <MealList
              currentList={mainIngredients.sauce}
              title='Соусы'
              changeChoice={changeChoice}
            />
          </section>
          <section>
            <a name='stuffing'></a>
            <MealList
              currentList={mainIngredients.main}
              title='Начинки'
              changeChoice={changeChoice}
            />
          </section>
        </div>
      </div>
    </>
  );
}



BurgerIngredients.propTypes = {
  mainIngredients: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientsPropTypes),
    sauce: PropTypes.arrayOf(ingredientsPropTypes),
    bunmains: PropTypes.arrayOf(ingredientsPropTypes),
  }),
  changeChoice: PropTypes.func,
  selectedCard: ingredientsPropTypes,
};


export default BurgerIngredients;
