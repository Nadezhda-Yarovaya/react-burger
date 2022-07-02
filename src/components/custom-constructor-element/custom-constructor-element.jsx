import React, { useEffect, useState} from 'react';
import CustomConstructorStyles from './custom-constructor-element.module.css';
import constructorListStyles from '../constructor-list/constructor-list.module.css';

import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';



import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
  SET_DRAGGEDCONSTRUCTOR,
  DELETE_ITEM
} from '../../services/actions';

const { constructor__item, icon } = CustomConstructorStyles;

const {
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  stuffings__item,
  list_flex,
} = constructorListStyles;



function CustomConstructorElement(props) {
  const { text, price, thumbnail, isLocked, type, item, setTempshow, setTarget1, initialX, finalX, setFinalX, setInitialX} = props;

  const [currentTouchedItem, setCurrentTouchItem] = useState({uniqueId: 0});

  const dispatch= useDispatch();

  const [{initialIngredientOffset, isItemDragging}, draggedWithinConstructorRef] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      initialIngredientOffset: monitor.getInitialClientOffset(),
      isItemDragging: monitor.isDragging(),
    })

  });


  const [{initialIngredientOffsetM, isItemDraggingM}, draggedMobile] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      initialIngredientOffsetM: monitor.getInitialClientOffset(),
      isItemDraggingM: monitor.isDragging(),
    })

  });
  useEffect(()=>{
    dispatch({
      type: SET_DRAGGEDCONSTRUCTOR,
      initialIngredOffset: initialIngredientOffset,
    })
  },[initialIngredientOffset]);


  //console.log('item:', item);

  const handleDeleting = () => {
    dispatch({
      type: DELETE_ITEM,
      element: item,
    })
  }


  
  
const handleTouchStart = (e)=> {
      const initial = e.nativeEvent.touches[0].clientX;
      setInitialX(initial);
      console.log('init: ', initial);
      //setCurrentTouchItem(item);
      
      
      e.target.addEventListener('touchstart', (e) => {
          setTempshow('swiped li');
          setCurrentTouchItem(item);
      });
      }
  
const handleTouchMove =(e) => {
 const final = e.nativeEvent.touches[0].clientX;
      setFinalX(final);
      console.log(' final x:', final);

      e.target.addEventListener('touchmove', (e) => {
          setTempshow('swiped li move');
      });
}


 const handleTouchEnd = (e)=> {
      const differ = finalX-initialX;
      console.log('differ: ',differ);
      e.target.addEventListener('touchend', (e) => {
          setTempshow('swiped li end became');
          setCurrentTouchItem({});     
          if (differ > 200)     {
            handleDeleting();
          }
      });
      }

const diff1 = finalX-initialX;
/*console.log('cur it id: ', currentTouchedItem.uniqueId, '   item id: ', item.uniqueId);*/

/* delete container
 <div className={`${stuffings__item} mr-2`} 
style={{backgroundColor: (finalX > initialX) ? 'pink' : 'lime', 
transform : ((item.uniqueId) && (currentTouchedItem.uniqueId === item.uniqueId)) ? `translate(${diff1 + 'px'}, 0px)` : `${isItemDragging ? 'rotate(2deg)' : 'translate(10px,0px)'}`}} ref={draggedWithinConstructorRef} onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}>
 */

 /* no swipe 
  <div className={`${stuffings__item} mr-2`} style={{}} ref={draggedWithinConstructorRef}>
 */

  return (
    <>
      <div className={`${stuffings__item} mr-2`} 
style={{backgroundColor: (finalX > initialX) ? 'pink' : 'lime', 
transform : ((item.uniqueId) && (currentTouchedItem.uniqueId === item.uniqueId)) ? 
`translate(${diff1 + 'px'}, 0px)` : `${isItemDraggingM ? 'rotate(2deg)' : 'translate(10px,0px)'}`}} 

 onTouchStart={(e) => {console.log('start'); handleTouchStart(e);}}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}>
      <div className={`${constructor__item} mb-4`}>
        {type ? (
          <></>
        ) : (
          <div className={`${icon} mr-2`} ref={draggedWithinConstructorRef}>
            <DragIcon type='primary' />
          </div>
        )}
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${text}`}
          price={price}
          thumbnail={thumbnail}
          handleClose={()=>{handleDeleting();}}
        />
      </div>
      </div>
    </>
  );
}

CustomConstructorElement.propTypes = {
 /* type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,*/
};

export default CustomConstructorElement;
