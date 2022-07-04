import React, { useEffect, useState } from 'react';
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
  DELETE_ITEM,
  SET_TOUCHEDITEM,
  CLEAR_TOUCHEDITEM,
} from '../../services/actions';
import { getAllIngredients, ifItsMobile } from '../../services/selectors';

const { constructor__item, icon, delete_mobile, delete_image } = CustomConstructorStyles;

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
  const {
    text,
    price,
    thumbnail,
    isLocked,
    type,
    item,
    setTempshow,
    setTarget1,
    initialX,
    finalX,
    setFinalX,
    setInitialX,
    initialY,
    finalY,
    setFinalY,
    setInitialY,
  } = props;

  //  const [currentTouchedItem, setCurrentTouchI//=tem] = useState({uniqueId: 0});
  const isMobile = useSelector(ifItsMobile);
  const allIngredients = useSelector(getAllIngredients);

  const dispatch = useDispatch();

  const currentTouchedItem = useSelector(
    (state) => state.mobile.currentTouchedItem
  );

  const stuffingListDropped = useSelector((store) => {
    return store.dragAndDrop.droppedElements;
  });

  const [
    { initialIngredientOffset, isItemDragging, thisItem },
    draggedWithinConstructorRef,
  ] = useDrag({
    type: 'ingredient',
    item: { item },
    collect: (monitor) => ({
      initialIngredientOffset: monitor.getInitialClientOffset(),
      isItemDragging: monitor.isDragging(),
      thisItem: monitor.getItem(),
    }),
  });

  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});

  useEffect(() => {
    //console.log('thisitem: ', thisItem);
    if (stuffingListDropped && thisItem) {
      const previous1 = stuffingListDropped.find((element, index, arr) => {
        // console.log('el. unique: ', element.uniqueId, 'thisitem: ', thisItem.item.uniqueId);
        if (element.uniqueId === thisItem.item.uniqueId) {
          if (index > 0) {
            return arr[index - 1];
          }
          return arr[0];
        }
      });
      setPrevious(previous1);
      //console.log('prev: ', previous1);
    }
  }, [thisItem, stuffingListDropped]);

  // console.log('is item: ', thisItem);

  /*
  const [{initialIngredientOffsetM, isItemDragging1}, draggedMobile] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      initialIngredientOffsetM: monitor.getInitialClientOffset(),
      isItemDragging1: monitor.isDragging(),
      
    })

  });
*/

  //console.log('offset:', initialIngredientOffsetM);
  useEffect(() => {
    dispatch({
      type: SET_DRAGGEDCONSTRUCTOR,
      initialIngredOffset: initialIngredientOffset,
    });
  }, [initialIngredientOffset]);

  //console.log('item:', item);

  const handleDeleting = () => {
    dispatch({
      type: DELETE_ITEM,
      element: item,
    });
  };


  const handleTouchStart = (e) => {
    const initialx1 = e.nativeEvent.touches[0].clientX;
    const initialy1 = Math.floor(tempRef.current?.getBoundingClientRect().top);
    setInitialX(initialx1);
    setFinalX(initialx1);

    setInitialY(initialy1);
    setFinalY(initialy1);
    console.log('init: y', initialy1);
    //setCurrentTouchItem(item);
    dispatch({
      type: SET_TOUCHEDITEM,
      payload: item,
    });

    

    /*  e.target.addEventListener('touchstart', (e) => {
          setTempshow('swiped y li');
          setCurrentTouchItem(item);
      });*/
  };

  const handleTouchMove = (e) => {
    const finalx1 = e.nativeEvent.touches[0].clientX;
    const finaly1 = e.nativeEvent.touches[0].clientY;
    setFinalX(finalx1);
    setFinalY(finaly1);
    console.log(' final x:', finalx1, ' final y: ', finaly1);

    /*  e.target.addEventListener('touchmove', (e) => {
          setTempshow('swiped li move');
      });*/
  };

  const handleTouchEnd = (e) => {
    const differx = finalX - initialX;
    console.log('differ x: ', differx);
    dispatch({
      type: CLEAR_TOUCHEDITEM,
    });
    setFinalX(0);
    setInitialX(0);
    setFinalY(0);
    setInitialY(0);

    if (differx < -80) {
      handleDeleting();
    }
    /*
      
      e.target.addEventListener('touchend', (e) => {
          setTempshow('swiped li end became');
          
      });*/
  };

  const diffx = finalX - initialX;
  const diffy = finalY - initialY;

  const direction = useSelector((state) => state.dragAndDrop.dropDirection);

  const tempRef = React.useRef();

  const handleTempClick = () => {
    const rectang = tempRef.current?.getBoundingClientRect();
    console.log('rectang tempooray : ', rectang);

  }

  //console.log('dify:', diffy);
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

  const marginOnDirection =
    direction && direction === 'top' ? '90px 16px 0 0' : '0 16px 90px 0';

  return (
    <>
      <div
        className={`${stuffings__item} mr-2`}
        style={{
          transform:
            item.uniqueId && currentTouchedItem.uniqueId === item.uniqueId
              ? `translate(${diffx + 'px'}, 0px)`
              : 'translate(0px,0px)',
          boxSizing: 'border-box',
          border: '1px solid purple',
          margin: isItemDragging ? marginOnDirection : '0',
        }}
        ref={isMobile ? null : draggedWithinConstructorRef}
      >
        <div
          className={`${constructor__item} mb-4`}
          style={{ backgroundColor: 'black' }}  ref={tempRef}
        >
          {type ? (
            <></>
          ) : (
            <div
              className={`${icon} mr-2`}
              ref={isMobile ? draggedWithinConstructorRef : null}
            >
              <DragIcon type='primary' />
            </div>
          )}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleTempClick}
           
            style={{ boxSizing: 'border-box', width: '100%' }}
          >
            <ConstructorElement
              type={type}
              isLocked={isLocked}
              text={`${text}`}
              price={price}
              thumbnail={thumbnail}
              handleClose={() => {
                handleDeleting();
              }}
            />
          </div>
          {/*(diffx < 0) ? (<div style={{backgroundColor: 'red', width: `${-diff
    x}px`, height: 'auto', display: 'block'}}></div>) : (<></>)*/}
          {/* ${Math.floor(initialY)}px*/}
        </div>
      </div>
      {(isMobile && (diffx < 0) && (currentTouchedItem.uniqueId === item.uniqueId)) ? (
        <div
          className={delete_mobile}
          style={{
            outline: '2px solid grey',
            width:
              item.uniqueId && currentTouchedItem.uniqueId === item.uniqueId
                ? `${-diffx}px`
                : '0',
            top: `${initialY - props.rect1 - 3}px`,
          }}
        >
          <div className={delete_image}></div>
        </div>
      ) : (
        <></>
      )}
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
