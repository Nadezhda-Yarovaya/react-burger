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
import { ifItsMobile } from '../../services/selectors';
import { dropElementWithinConstructor } from '../../services/action-creators/dnd-action-creators';

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

/*
Если при выполнении запроса к API в усилителе произошла ошибка, то содержимое хранилища соответствующего
элемента приводится к начальному состоянию. Например, если пользователь оформил заказ, а при оформлении
следующего у него произошла ошибка — в модальном окне не должен отображаться старый номер заказа.
Аналогично при работе со списком ингредиентов.*/

function ConstructorList(props) {
  const dispatch = useDispatch();
  const { isMobile } = useSelector(ifItsMobile);
  const direction = useSelector(state=>state.dragAndDrop.dropDirection);
  const currentBun = useSelector((store) => {
    return store.ingredients.bun;
  });
  const isLoading  = useSelector(store=>store.ingredients.isLoading) ;

  const initialIngredOffset = useSelector((store) => store.dragAndDrop.initialIngredOffset);

  const stuffingListDropped = useSelector((store) => {
    return store.dragAndDrop.droppedElements;
  });

  const thisRef = useRef();


  const handleBunDrop = (currentItem) => {
    dispatch({
      type: REPLACE_BUN,
      bun: currentItem.item,
    });
  };




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
      const currentOffset = Math.floor(monitor.getClientOffset().y);
      const hoverBoundingRectTop=Math.floor(hoverBoundingRect.top);

      const currentItemOffset = initialIngredOffset.y;

      const initialDistToTop = currentItemOffset - hoverBoundingRectTop;
      const finalPixelsTtoTop = currentOffset - hoverBoundingRectTop;
      const goesToBottom = initialDistToTop < finalPixelsTtoTop;
      //console.log('goesToBottom', goesToBottom, ' if true === bottom', ' diff init, final top: ', initialDistToTop,  finalPixelsTtoTop);
      const currentPosition = goesToBottom ? 'bottom' : 'top';
      //setDirection(currentPosition);
      dispatch ({
        type: SET_DROPDIRECTION,
        payload: currentPosition
      });
    },
    drop(itemId) {
      dropElementWithinConstructor(itemId, dispatch, direction);
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
  const [initialX, setInitialX] = useState(0);
  const [finalX, setFinalX] = useState(0);
 
  const [initialY, setInitialY] = useState(0);
  const [finalY, setFinalY] = useState(0);

  const [rect1, setRect1] = useState(0);
 
  
  /*
  useEffect(() => {
      document.getElementById('buttonswipe').addEventListener('touchstart', (e) => {
          setTempshow('swiped');
      });
  },[]);*/
  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);

  useEffect(() => {
    if (isMobileOrdered) {
   const rectang = thisRef.current?.getBoundingClientRect();
   console.log('rectang : ', rectang);
   setRect1(Math.floor(rectang.top));
    }
    
},[isMobile, isMobileOrdered, stuffingListDropped]);
  

   /* minHeight: isHover ? heightOfCont : '80px',*/

  return (
    <>
    <div style={{ minHeight: '200px', boxSizing : 'border-box', border: '2px solid blue'}}>
            
    <button id='buttonswipe' className={buttonswipestyle}>swipe???</button>
    <p>{tempShow}</p>
    <p>initial Y: {Math.floor(initialX)} final: {Math.floor(finalX)}</p>
    <p>initial Y: {Math.floor(initialY)} final: {Math.floor(finalY)}</p>
    <p> diff x: {finalX- initialX}</p>
    <p> diff y: {finalY- initialY}</p>
    <p> show target RECT measures: {rect1}</p>
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
                    setRect1={setRect1}
                    rect1 = {rect1}
                    isHover = {isHover}
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
