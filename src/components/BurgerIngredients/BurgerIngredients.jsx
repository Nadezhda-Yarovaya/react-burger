import React from 'react';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../MealList/MealList';
import { burgerData } from '../../utils/data.js';

const { title, list, tabs, ingredients } = ingredientsStyles;

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');

  const chosenItems = burgerData.map((item, index) => {
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

  const bunsMenu = chosenItems.filter((item) => item.type === 'bun');
  const sauceMenu = chosenItems.filter((item) => item.type === 'sauce');
  const stuffingMenu = chosenItems.filter((item) => item.type === 'main');

  const [bunsArray, setBunsArray] = React.useState(bunsMenu);
  const [sauceArray, setSauceArray] = React.useState(sauceMenu);
  const [stuffingArray, setStuffingArray] = React.useState(stuffingMenu);

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
  }

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
              currentList={bunsArray}
              title='Булки'
              changeChoice={changeChoice}
              setWithChoice={setBunsArray}
            />
          </section>
          <section>
            <a name='sauces'></a>
            <MealList
              currentList={sauceArray}
              title='Соусы'
              changeChoice={changeChoice}
              setWithChoice={setSauceArray}
            />
          </section>
          <section>
            <a name='stuffing'></a>
            <MealList
              currentList={stuffingArray}
              title='Начинки'
              changeChoice={changeChoice}
              setWithChoice={setStuffingArray}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
