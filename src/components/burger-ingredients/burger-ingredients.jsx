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

const { title, list, tabs, ingredients, tab1 } = ingredientsStyles;

function BurgerIngredients(props) {
  const dispatch = useDispatch();
  const { changeChoice, selectedCard, isLoading } = props;
  const [current, setCurrent] = useState('one');
  //const { allIngredients } = useContext(IngredientsContext);
  /* const [mainIngredients, setMainIngredients] = useState({
    buns: [initialItem],
    sauce: [initialItem],
    main: [initialItem],
  }); */

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
      //setMainIngredients(newIngredients);

      //console.log('formed categories: ', formedIngredients);
      dispatch({
        type: SET_INGREDIENTSBYCAT,
      payload: formedIngredients,
      });
    }
  }, [allIngredients]);

  function filterByType(arr, type) {
    return arr.filter((item) => item.type === type);
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

  /*
  const TrackVisible = () => {
    const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });
    return <div ref={ref}>{entry?.isVisible}</div>;
  }; */

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

          <div className={`mt-10 ${list}`}>
            <section ref={bunsRef}>
              <MealList
                title='Булки'
                changeChoice={changeChoice}
                selectedCard={selectedCard}
                type='bun'
              />
            </section>
            <section ref={sauceRef}>
              <MealList
                
                title='Соусы'
                changeChoice={changeChoice}
                type='sauce'
              />
            </section>
            <section ref={stuffingRef}>
              <MealList
                
                title='Начинки'
                changeChoice={changeChoice}
                type='main'
                
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
