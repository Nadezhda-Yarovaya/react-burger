import React, { useContext, useState, useRef, useEffect } from 'react';
import constructorListStyles from './constructor-list.module.css';

import PropTypes from 'prop-types';
import CustomConstructorElement 
from '../custom-constructor-element/custom-constructor-element';
import { DndProvider } from 'react-dnd';

import { ingredientType } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';

import { TouchBackend } from 'react-dnd-touch-backend';

import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
  CHANGE_POSITION,
  SET_DROPDIRECTION,
  REPLACE_BUN,
} from '../../services/actions';
import { useDrag, useDrop } from 'react-dnd';

const opts= {
    enableMouseEvents: true

};

const {
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  stuffings__item,
  list_flex,
  stuffings__empty,
  empty,
  candrop__style,
  cantdrop__style,
  buttonswipestyle
} = constructorListStyles;

/* will perform later delete by swipe on mobile */

/*
требования к работе 
Для каждого экшена, который связан с запросом к API создан усилитель. Для таких экшенов описан тип _REQUEST ,
тип _SUCCESS , _ERROR .
Экшен описывает лишь одно действие. Например, экшена DECREASE_OR_INCREASE_ITEM быть не должно.
Редьюсеры — чистые функции.
*/

/*
Если при выполнении запроса к API в усилителе произошла ошибка, то содержимое хранилища соответствующего
элемента приводится к начальному состоянию. Например, если пользователь оформил заказ, а при оформлении
следующего у него произошла ошибка — в модальном окне не должен отображаться старый номер заказа.
Аналогично при работе со списком ингредиентов.*/

/*
Каждый редьюсер решает только свою задачу: загрузка и хранение ингредиентов, работа конструктора, управление
модальным окном ингредиента или оформлением заказа.
Редьюсеры объединены в один с помощью combineReducers 
*/

function ConstructorList(props) {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((store) => {
   // console.log('mobile? ', store.isMobile);
    return store.isMobile;
  });
  //const droppedElements = useSelector(store => store.droppedElements);
  const currentBun1 = useSelector((store) => {
    //console.log('whers bun?? ', store.bun);
    return store.bun;
  });
  const currentBun = currentBun1;

  const stuffingListDropped = useSelector((store) => {
    //console.log('store in constr list:', store);
    return store.droppedElements;
  });
  const [direction, setDirection] = useState('');

  const thisRef = useRef();

  const currentTimeInSeconds = Math.floor(Date.now() / 2);

  const handleBunDrop = (currentItem) => {
    console.log('indrop', currentItem);
    dispatch({
      type: REPLACE_BUN,
      bun: currentItem.item,
    });
  };

  const handleDrop = (currentItem) => {
    //e.preventDefault();
    // updating counter for main ingredient
    //   console.log('cur item in dropped: ', currentItem);
    // console.log('cur item in dropped unique: ', currentItem.item.uniqueId);

    if (currentItem.item.uniqueId) {
      console.log('такой уже есть в списке');
      dispatch({
        type: CHANGE_POSITION,
        element: currentItem.item,
        dropDirection: direction,
      });
    } else {
      dispatch({
        type: UPDATE_COUNTER,
        currentElementId: currentItem.item._id,
      });
      //setting dropped elements
      /*
     droppedIngredient: currentItem,
      uniqueId: currentTimeInSeconds*/
      dispatch({
        type: INCREASE_DROPPEDELEMENT,
        element: currentItem.item,
        uniqueId: currentTimeInSeconds,
      });
      /*setDraggedElements([
        ...draggedElements,
        ...elements.filter(element => element.id === itemId.id)
    ]);*/
    }
  };

  const { bunSelected, stuffingsList, isLoading } = props;

  const initialIngredOffset = useSelector((store) => store.initialIngredOffset);

  const [{ isBunHover }, dropContainerBunTop] = useDrop({
    accept: 'bun',
    drop(item) {
      handleBunDrop(item);
    },
    collect: (monitor) => ({
      isBunHover: monitor.isOver(),
    }),
  });

  const [{ isBunBottomHover }, dropContainerBunBottom] = useDrop({
    accept: 'bun',
    drop(item) {
      handleBunDrop(item);
    },
    collect: (monitor) => ({
      isBunBottomHover: monitor.isOver(),
    }),
  });

  const [{ canDrop, isHover, currentOffset }, dropContainerRef] = useDrop({
    accept: 'ingredient',

    hover(item, monitor) {
      const hoverBoundingRect = thisRef.current?.getBoundingClientRect();
      const currentOffset = monitor.getClientOffset().y;

      const currentItemOffset = initialIngredOffset.y;
      // console.log('initialIngredOffset Y: ', initialIngredOffset.y);

      const initialDistToTop = currentItemOffset - hoverBoundingRect.top;
      // console.log('initial pixels to top : ', initialDistToTop);
      //const hoverItemRect = item.getBoundingClientRect();

      const finalPixelsTtoTop = currentOffset - hoverBoundingRect.top;
      //console.log('FINAL pixels to top : ', finalPixelsTtoTop);

      // console.log('rect. item bottom: ', hoverItemRect.bottom , ' rect item top: ', hoverItemRect.top);

      // console.log('rect. bottom: ', hoverBoundingRect.bottom , ' rect top: ', hoverBoundingRect.top);
      const goesToBottom = initialDistToTop < finalPixelsTtoTop;
      // console.log('raznica: ',hoverBoundingRect.bottom - hoverBoundingRect.top, ' offset: ', currentOffset);

      const currentPosition = goesToBottom ? 'bottom' : 'top';
      //console.log(' CUR position: ', currentPosition);
      setDirection(currentPosition);

      
      /*  dispatch({
        type: SET_DROPDIRECTION,        
        dropDirection: currentPosition
      })*/
    },
    drop(itemId) {
      handleDrop(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

const [target1, setTarget1] = useState({});

  const emptyText = isMobile
    ? 'Пока нет начинки. Добавляйте на странице ингредиентов'
    : 'Пока нет начинки. Перетяните с поля слева';
 // console.log('ismob:', isMobile, 'empty:', emptyText);
  //{span.constructor-element__action}

  const heightOfCont = (stuffingListDropped.length + 1) * 100 + 'px';
  
  const [tempShow, setTempshow] =useState('');
  
  
  useEffect(() => {
      document.getElementById('buttonswipe').addEventListener('touchstart', (e) => {
          setTempshow('swiped');
      });
  },[]);
  
  const [initialX, setInitialX] = useState(0);
   const [finalX, setFinalX] = useState(0);
  
   const [initialY, setInitialY] = useState(0);
   const [finalY, setFinalY] = useState(0);
  

  return (
    <>
    <div style={{ minHeight: '200px', boxSizing : 'border-box', border: '2px solid blue'}}>
            
    <button id='buttonswipe' className={buttonswipestyle}>swipe???</button>
    <p>{tempShow}</p>
    <p>initial: {Math.floor(initialX)} final: {Math.floor(finalX)}</p>
    <p> diff: {finalX- initialX}</p>
    <p> show obj etarget: {Object.keys(target1)}</p>
    </div>
      <ul className={`${list} ${isMobile ? '' : list_flex}`}>
        {isLoading ? (
          <li style={{ alignSelf: 'flex-start' }}>
            <p className='text text_type_main-small'>Загрузка...</p>
          </li>
        ) : (
          <>
            <li
              className={`${item} ${item_type_bun}`}
              ref={dropContainerBunTop}
              style={{
                backgroundColor: isBunHover
                  ? 'rgba(0,0,0,0.91)'
                  : 'transparent',
                border: isBunHover ? '1px dashed white' : '0',
              }}
            >
              <CustomConstructorElement
                type='top'
                isLocked={true}
                text={`${currentBun.name} ${
                  currentBun.price !== 0 ? ' (верх)' : ''
                }`}
                price={currentBun.price}
                thumbnail={currentBun.image}
                item={currentBun}
              />
            </li>
            <li className={`${item_type_stuffing}`} ref={thisRef} >
              <div
                className={`${stuffings} ${
                  stuffingListDropped.length > 5 ? '' : `${empty} pr-2`
                }`}
                style={{
                  minHeight: isHover ? heightOfCont : '80px',
                  backgroundColor: isHover ? 'rgba(0,0,0,0.91)' : 'transparent',
                  border: isHover ? '1px dashed white' : '0',
                  position: 'relative'
                }}
                ref={dropContainerRef}
              >
                {stuffingListDropped.length === 0 ? (
                  <p className={stuffings__empty}>
                    Пока нет начинки. Добавляйте со страницы ингредиентов
                  </p>
                ) : (
                  <></>
                )}
                {stuffingListDropped.map((item) => (
                  <CustomConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    item={item}
                    key={item.uniqueId}
                    setTempshow={setTempshow}
setTarget1={setTarget1}
                    finalX={finalX}
                    initialX={initialX}
                    setFinalX={setFinalX}
                    setInitialX={setInitialX}
                    finalY={finalY}
                    initialY={initialY}
                    setFinalY={setFinalY}
                    setInitialY={setInitialY}
                  />
                ))}
              </div>
            </li>
            <li
              className={`${item} ${item_type_bun} mt-4`}
              ref={dropContainerBunBottom}
              style={{
                backgroundColor: isBunBottomHover
                  ? 'rgba(0,0,0,0.91)'
                  : 'transparent',
                border: isBunBottomHover ? '1px dashed white' : '0',
              }}
            >
              <CustomConstructorElement
                type='bottom'
                isLocked={true}
                text={`${currentBun.name} ${
                  currentBun.price !== 0 ? ' (низ)' : ''
                }`}
                price={currentBun.price}
                thumbnail={currentBun.image}
                item={currentBun}
              />
            </li>
          </>
        )}
      </ul>
     
    </>
  );
}

ConstructorList.propTypes = {
  /* bunSelected: ingredientType.isRequired,
  stuffingsList: PropTypes.arrayOf(ingredientType).isRequired,
  isLoading: PropTypes.bool.isRequired,*/
};

export default ConstructorList;
