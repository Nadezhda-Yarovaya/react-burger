import React from 'react';
import {
  Tab,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../MealList/MealList';
import { burgerData } from '../../utils/data.js';
import ModalWindow from '../ModalWindow/ModalWindow';
import PropTypes from 'prop-types';

const {
  title,
  list,
  tabs,
  ingredients,
  window__details,
  window__button,
  window__image,
  window__text,
  window__nutrients,
  nutrient,
} = ingredientsStyles;

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
              currentList={bunsArray}
              title='Булки'
              changeChoice={props.changeChoice}
              setWithChoice={setBunsArray}
              selectedCard={props.selectedCard}
            />
          </section>
          <section>
            <a name='sauces'></a>
            <MealList
              currentList={sauceArray}
              title='Соусы'
              changeChoice={props.changeChoice}
              setWithChoice={setSauceArray}
            />
          </section>
          <section>
            <a name='stuffing'></a>
            <MealList
              currentList={stuffingArray}
              title='Начинки'
              changeChoice={props.changeChoice}
              setWithChoice={setStuffingArray}
            />
          </section>
        </div>
      </div>
      {props.isIngredientsShown ? (
        <div className='mr-3'>
          <ModalWindow>
            <div className={`${window__details}`}>
              <p className='text text_type_main-medium'>Детали ингредиента</p>
              <button
                className={window__button}
                onClick={props.closeModalWindow}
              >
                <CloseIcon type='primary' />
              </button>
            </div>
            <img
              className={window__image}
              src={props.selectedCard.image}
              alt={props.selectedCard.name}
            />
            <p className='text text_type_main-medium mt-4 mb-8'>
              {props.selectedCard.name}
            </p>
            <ul className={`${window__nutrients}`}>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${window__text}`}>
                  Калории, ккал
                </p>
                <p className={`text text_type_digits-default ${window__text}`}>
                  {props.selectedCard.calories}
                </p>
              </li>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${window__text}`}>
                  Белки, г
                </p>
                <p className={`text text_type_digits-default ${window__text}`}>
                  {props.selectedCard.proteins}
                </p>
              </li>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${window__text}`}>
                  Жиры, г
                </p>
                <p className={`text text_type_digits-default ${window__text}`}>
                  {props.selectedCard.fat}
                </p>
              </li>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${window__text}`}>
                  Углеводы, г
                </p>
                <p className={`text text_type_digits-default ${window__text}`}>
                  {props.selectedCard.carbohydrates}
                </p>
              </li>
            </ul>
          </ModalWindow>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  changeChoice: PropTypes.func,
  selectedCard: PropTypes.object,
  isIngredientsShown: PropTypes.bool.isRequired,
  closeModalWindow: PropTypes.func,
};

export default BurgerIngredients;
