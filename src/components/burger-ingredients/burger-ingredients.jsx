import React from 'react';
import { useState, useContext, useEffect } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import MealList from '../meal-list/meal-list';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../services/app-contexts';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGREDIENTS } from '../../services/actions';

import { ingredientType } from '../../utils/types';

const { title, list, tabs, ingredients } = ingredientsStyles;
const initialItem = {
  name: 'Выберите булку',
  image: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  price: 0,
  _id: '60d3b41abdacab0026a733c7',
};

function BurgerIngredients(props) {
  const dispatch = useDispatch();
  const { changeChoice, selectedCard, isLoading } = props;
  const [current, setCurrent] = useState('one');
  const { allIngredients } = useContext(IngredientsContext);
  /* const [mainIngredients, setMainIngredients] = useState({
    buns: [initialItem],
    sauce: [initialItem],
    main: [initialItem],
  }); */

  const burgerIngredients = useSelector((store) => {
    //console.log('store itself:', store);
    return store.ingredients;
  });

  console.log('final ingred from redux: ', burgerIngredients);

  useEffect(() => {
    if (allIngredients) {
      const arrayWithChosen = addChosenItems(allIngredients);
      const formedIngredients = {
        buns: filterByType(arrayWithChosen, 'bun'),
        sauce: filterByType(arrayWithChosen, 'sauce'),
        main: filterByType(arrayWithChosen, 'main'),
      };
      //setMainIngredients(newIngredients);
      dispatch({
        type: SET_INGREDIENTS,
        ingredients: formedIngredients,
      });
    }
  }, [allIngredients]);

  function filterByType(arr, type) {
    return arr.filter((item) => item.type === type);
  }

  function addChosenItems(arr) {
    return arr.map((item, index) => {
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
  }

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
          <div className={`${tabs}`}>
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
                currentList={burgerIngredients.buns}
                title='Булки'
                changeChoice={changeChoice}
                selectedCard={selectedCard}
              />
            </section>
            <section ref={sauceRef}>
              <MealList
                currentList={burgerIngredients.sauce}
                title='Соусы'
                changeChoice={changeChoice}
              />
            </section>
            <section ref={stuffingRef}>
              <MealList
                currentList={burgerIngredients.main}
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
  changeChoice: PropTypes.func.isRequired,
  selectedCard: ingredientType.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BurgerIngredients;
