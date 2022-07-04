import React, { useState, useRef, useEffect } from 'react';
import constructorListStyles from './constructor-list.module.css';

import CustomConstructorElement from '../custom-constructor-element/custom-constructor-element';

import { useSelector, useDispatch } from 'react-redux';

import {
  SET_DROPDIRECTION,
  REPLACE_BUN,
  SET_OFFSETS,
} from '../../services/actions';
import { useDrop } from 'react-dnd';
import { ifItsMobile, loadIngredients } from '../../services/selectors';
import { dropElementWithinConstructor } from '../../services/action-creators/dnd-action-creators';

const {
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  list_flex,
  stuffings__empty,
  empty,
} = constructorListStyles;

function ConstructorList() {
  const dispatch = useDispatch();
  const isMobile = useSelector(ifItsMobile);
  const direction = useSelector((state) => state.dragAndDrop.dropDirection);
  const currentBun = useSelector((store) => store.ingredients.bun);
  const isLoading = useSelector(loadIngredients);

  const initialIngredOffset = useSelector(
    (store) => store.dragAndDrop.initialIngredOffset
  );

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

  const [stuffingsEmptyText, setStuffingsEmptyText] = useState('');

  useEffect(() => {
    if (isMobile) {
      setStuffingsEmptyText(
        'Пока нет начинки. Добавляйте на странице ингредиентов'
      );
    } else {
      setStuffingsEmptyText('Пока нет начинки. Перетяните с поля слева');
    }
  }, [isMobile]);

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

  const [{ isHover }, dropContainerRef] = useDrop({
    accept: 'ingredient',

    hover(item, monitor) {
      const hoverBoundingRect = thisRef.current?.getBoundingClientRect();
      const currentOffset = Math.floor(monitor.getClientOffset().y);
      const hoverBoundingRectTop = Math.floor(hoverBoundingRect.top);

      const currentItemOffset = initialIngredOffset.y;

      const initialDistToTop = currentItemOffset - hoverBoundingRectTop;
      const finalPixelsTtoTop = currentOffset - hoverBoundingRectTop;
      const goesToBottom = initialDistToTop < finalPixelsTtoTop;
      const currentPosition = goesToBottom ? 'bottom' : 'top';
      dispatch({
        type: SET_DROPDIRECTION,
        payload: currentPosition,
      });
    },
    drop(item) {
      dropElementWithinConstructor(item.item, dispatch, direction);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const heightOfCont = (stuffingListDropped.length + 1) * 100 + 'px';

  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);

  useEffect(() => {
    if (isMobileOrdered) {
      const rectangle = thisRef.current?.getBoundingClientRect();
      dispatch({
        type: SET_OFFSETS,
        payload: {
          top: Math.floor(rectangle.top),
          right: Math.floor(rectangle.right),
        },
      });
    }
  }, [isMobile, isMobileOrdered, stuffingListDropped]);

  return (
    <>
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
            <li className={`${item_type_stuffing}`} ref={thisRef}>
              <div
                className={`${stuffings} ${
                  stuffingListDropped.length > 5 ? '' : `${empty} pr-2`
                }`}
                style={{
                  padding: isHover ? '0 8px 80px 0' : '0 8px 0 0',
                  backgroundColor: isHover ? 'rgba(0,0,0,0.91)' : 'transparent',
                  border: isHover ? '1px dashed white' : '0',
                  position: 'relative',
                  minHeight: { heightOfCont },
                }}
                ref={dropContainerRef}
              >
                {stuffingListDropped.length === 0 ? (
                  <p className={stuffings__empty}>{stuffingsEmptyText}</p>
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

export default ConstructorList;
