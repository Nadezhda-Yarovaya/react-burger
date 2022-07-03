import React, { useContext, useState } from 'react';

import mealListStyles from '../meal-list/meal-list.module.css';

import ingredientStyles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
  REPLACE_BUN
} from '../../services/actions';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ifItsMobile } from '../../services/selectors';

function Ingredient(props) {
    const dispatch = useDispatch();

    const { price, item__name, counter, list__choice, item__mobilebutton, list__item} = ingredientStyles;

    
  const { item, changeChoice } = props;
  /*
    const ingredientCount = useSelector(store=>{
      let totalCount = 0;
      store.listOfIngredients.forEach(curItem=> {
        if (curItem._id === item.id) {totalCount++;}
      });
      return totalCount;
    })*/
    const bunCount = useSelector((store) => {
      let totalCount = 0;
      if (store.ingredients.bun._id === item._id) {totalCount++;}
      return totalCount;
    });
    /*

    const bunCount = bunCount1 === item._id ? 1 : 0;*/
    //console.log('bunCount1: ', bunCount, ' item id: ', item._id);
    //console.log('buncount', bunCount);

  const ingredientCount = useSelector((store) => {
    let totalCount = 0;
    store.other.droppedElements.forEach((curItem) => {
      if (curItem._id === item._id) {
        totalCount++;
      }
    });
    return totalCount;
  });
  const isMobile =useSelector(ifItsMobile);

  const { _id } = item;
  //console.log('item itself:', item);

  const [, draggedIngredientRef] = useDrag({
    type: 'ingredient',
    item: { item },
    /*  collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })*/
  });

  const [, draggedBun] = useDrag({
    type: 'bun',
    item: { item },
    /*  collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })*/
  });
  
  
const currentTimeInSeconds = Math.floor(Date.now());
//console.log('uniq id: ', currentTimeInSeconds);

  const handleDrop = (currentItem) => {
    // updating counter for main ingredient
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

  
  const handleBunDrop = (currentItem) => {
    console.log('indrop mobile', currentItem._id);
    dispatch({
      type: REPLACE_BUN,
      bun: currentItem,
    });
    dispatch({
      type: UPDATE_COUNTER,
      currentElementId: currentItem._id,
    });
  }

  const currentCounter = (item.type === 'bun') ? bunCount : ingredientCount;



  return (
    <li ref={isMobile ? (null) : (item.type === 'bun' ? draggedBun : draggedIngredientRef)}>
      <div className={list__item} >
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
        
        {currentCounter > 0 ? (
          <div className={`${counter}`}>
            <Counter count={currentCounter} size='default' />
          </div>
        ) : (
          <></>
        )}
      </button>
      {isMobile ? (
        <button className={item__mobilebutton} onClick={(e) =>  {
        e.preventDefault();
        if (item.type === 'bun') {
          handleBunDrop(item);
        } else {
            handleDrop(item);}
        }}>Добавить</button>) : (<></>)}
        </div>
    </li>
  );
}

export default Ingredient;
