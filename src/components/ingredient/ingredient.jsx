import React, { useContext, useState } from 'react';

import mealListStyles from '../meal-list/meal-list.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
} from '../../services/actions';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
    const dispatch = useDispatch();
  const { list, list__item, price, item__name, counter, list__choice, item__mobilebutton } =
    mealListStyles;

  const { item, changeChoice } = props;
  /*
    const ingredientCount = useSelector(store=>{
      let totalCount = 0;
      store.listOfIngredients.forEach(curItem=> {
        if (curItem._id === item.id) {totalCount++;}
      });
      return totalCount;
    })*/

  const ingredientCount = useSelector((store) => {
    let totalCount = 0;
    store.droppedElements.forEach((curItem) => {
      if (curItem._id === item._id) {
        totalCount++;
      }
    });
    return totalCount;
  });
  const isMobile =useSelector((store)=> {
      return store.isMobile;
  })

  const { _id } = item;
  //console.log('item itself:', item);

  const [, draggedIngredientRef] = useDrag({
    type: 'ingredient',
    item: { item },
    /*  collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })*/
  });
  const [tempshow, setTempshow] = useState('nothibg');
  
  
const currentTimeInSeconds = Math.floor(Date.now() / 10);

  const handleDrop = (currentItem) => {
    // updating counter for main ingredient
    setTempshow(currentItem.id);
    dispatch({
      type: UPDATE_COUNTER,
      currentElementId: currentItem._id,
    });

    //setting dropped elements
    /*
     droppedIngredient: currentItem,
      uniqueId: currentTimeInSeconds*/
    dispatch({
      type: INCREASE_DROPPEDELEMENT,
      element: currentItem,
      uniqueId: currentTimeInSeconds,
    });
    /*setDraggedElements([
        ...draggedElements,
        ...elements.filter(element => element.id === itemId.id)
    ]);*/
  };

  

  return (
    <li key={item._id} className={list__item} ref={draggedIngredientRef}>
      <button
        onClick={() => {
          /* changeChoice(currentList, item._id, setWithChoice);*/
          changeChoice(item);
        }}
        className={list__choice}
      >
        <img src={item.image} alt={item.name} />
        <div className={`mt-2 mb-2 ${price}`}>
          {' '}
          <p className='text text_type_digits-default mr-2'>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`text text_type_main-default ${item__name}`}>
          {item.name}
        </p>
        
        {ingredientCount > 0 ? (
          <div className={counter}>
            <Counter count={ingredientCount} size='default' />
          </div>
        ) : (
          <></>
        )}
      </button>
      {isMobile ? (
        <button className={item__mobilebutton} onClick={(e) =>  {
        e.preventDefault();
            handleDrop(item);
        }}>Добавить</button>) : (<></>)}
        <p>{tempshow}</p>
    </li>
  );
}

export default Ingredient;
