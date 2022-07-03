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

import trashIconMobile from '../../images/trash.svg';



import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
  SET_DRAGGEDCONSTRUCTOR,
  DELETE_ITEM
} from '../../services/actions';

const { constructor__item, icon , delete_mobile} = CustomConstructorStyles;

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
  const { text, price, thumbnail, isLocked, type, item, setTempshow, setTarget1, initialX, finalX, setFinalX, setInitialX,
    initialY, finalY, setFinalY, setInitialY} = props;

  const [currentTouchedItem, setCurrentTouchItem] = useState({uniqueId: 0});

  const dispatch= useDispatch();

  const [{initialIngredientOffset, isItemDragging, thisItem}, draggedWithinConstructorRef] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      initialIngredientOffset: monitor.getInitialClientOffset(),
      isItemDragging: monitor.isDragging(),
      thisItem: monitor.getItem(),
    })

  });

  // console.log('is item: ', thisItem);

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
      const initialx1 = e.nativeEvent.touches[0].clientX;
     const initialy1 = e.nativeEvent.touches[0].clientY;
      setInitialX(initialx1);
   setInitialY(initialy1);
      console.log('init: y', initialy1);
      //setCurrentTouchItem(item);
      
setCurrentTouchItem(item);
      
     /*  e.target.addEventListener('touchstart', (e) => {
          setTempshow('swiped y li');
          setCurrentTouchItem(item);
      });*/
      }
  
const handleTouchMove =(e) => {
 const finalx1 = e.nativeEvent.touches[0].clientX;
 const finaly1 = e.nativeEvent.touches[0].clientY;
      setFinalX(finalx1);
      setFinalY(finaly1);
      console.log(' final x:', finalx1, ' final y: ', finaly1);

    /*  e.target.addEventListener('touchmove', (e) => {
          setTempshow('swiped li move');
      });*/
}

 const handleTouchEnd = (e)=> {
      const differx = finalX-initialX;
      console.log('differ x: ',differx);
setCurrentTouchItem({});     
setFinalX(0);
setInitialX(0);
          if (differx < -80)     {
            handleDeleting();
          }
          /*
      
      e.target.addEventListener('touchend', (e) => {
          setTempshow('swiped li end became');
          
      });*/
      }

const diffx = finalX-initialX;
const diffy = finalY-initialY;
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


/*   <div 
 onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}>
 */
 
  return (
    <>
      <div className={`${stuffings__item} mr-2`} 
style={{transform : ((item.uniqueId) && (currentTouchedItem.uniqueId === item.uniqueId)) ? 
`translate(${diffx + 'px'}, 0px)` : 'translate(10px,0px)', boxSizing: 'border-box', border: '1px solid purple', backgroundColor: (diffx < 0) ? 'red' : 'blue'}} 
>

      <div className={`${constructor__item} mb-4`} style={{backgroundColor: 'black'}}>
        {(type) ? (
          <></>
        ) : (
          <div className={`${icon} mr-2`} ref={draggedWithinConstructorRef}>
            <DragIcon type='primary' />
          </div>
        )}
        <div onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${text}`}
          price={price}
          thumbnail={thumbnail}
          handleClose={()=>{handleDeleting();}}
        />
    </div>
    {/*(diffx < 0) ? (<div style={{backgroundColor: 'red', width: `${-diff
    x}px`, height: 'auto', display: 'block'}}></div>) : (<></>)*/
    }
    {/* ${Math.floor(initialY)}px*/}
      </div>
      </div>
      {(diffx < 0) ? (<div className={delete_mobile} style={{ width: `${-diffx}px`, top: '0'}}>
      <img src={trashIconMobile} alt="иконка удалить элемент" /></div>) : (<></>)
      }
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
