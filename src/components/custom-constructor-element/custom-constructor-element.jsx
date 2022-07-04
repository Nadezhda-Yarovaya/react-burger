import React, { useEffect, useState, useRef } from 'react';
import CustomConstructorStyles from './custom-constructor-element.module.css';

import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import {
  SET_DRAGGEDCONSTRUCTOR,
  DELETE_ITEM,
  SET_TOUCHEDITEM,
  CLEAR_TOUCHEDITEM,
  SET_INITIALS,
  SET_FINALS,
  CLEAR_INITIALS,
  CLEAR_FINALS,
} from '../../services/actions';
import { ifItsMobile } from '../../services/selectors';
import { ingredientType } from '../../utils/types';

const {
  constructor__item,
  icon,
  delete_mobile,
  delete_image,
  stuffings__item,
} = CustomConstructorStyles;

function CustomConstructorElement(props) {
  const { text, price, thumbnail, isLocked, type, item } = props;

  const isMobile = useSelector(ifItsMobile);

  const dispatch = useDispatch();

  const currentTouchedItem = useSelector(
    (state) => state.mobile.currentTouchedItem
  );

  const initialX = useSelector((state) => state.mobile.offsets.initials.x);
  const finalX = useSelector((state) => state.mobile.offsets.finals.x);
  const initialY = useSelector((state) => state.mobile.offsets.initials.y);
  const finalY = useSelector((state) => state.mobile.offsets.finals.y);
  const rectangleTop = useSelector(
    (state) => state.mobile.offsets.rectangle.top
  );
  const rectangleRight = useSelector(
    (state) => state.mobile.offsets.rectangle.right
  );
  const direction = useSelector((state) => state.dragAndDrop.dropDirection);
  const currentTouchedItemRef = useRef();
  const [currentRectangle, setCurrentRectangle] = useState({});
  const itemContainerRef = useRef();
  const diffx = finalX - initialX;
  const diffy = finalY - initialY;
  const [
    { initialIngredientOffset, isItemDragging },
    draggedWithinConstructorRef,
  ] = useDrag({
    type: 'ingredient',
    item: { item },
    collect: (monitor) => ({
      initialIngredientOffset: monitor.getInitialClientOffset(),
      isItemDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dispatch({
      type: SET_DRAGGEDCONSTRUCTOR,
      initialIngredOffset: initialIngredientOffset,
    });
  }, [initialIngredientOffset]);

  const handleDeleting = () => {
    dispatch({
      type: DELETE_ITEM,
      element: item,
    });
  };

  const handleTouchStart = (e) => {
    const initialx1 = e.nativeEvent.touches[0].clientX;
    const initialy1 = Math.floor(
      itemContainerRef.current?.getBoundingClientRect().top
    );

    setCurrentRectangle(currentTouchedItemRef.current?.getBoundingClientRect());
    dispatch({
      type: SET_INITIALS,
      payload: {
        x: initialx1,
        y: initialy1,
      },
    });
    dispatch({
      type: SET_FINALS,
      payload: {
        x: initialx1,
        y: initialy1,
      },
    });
    dispatch({
      type: SET_TOUCHEDITEM,
      payload: item,
    });
  };

  const handleTouchMove = (e) => {
    const finalx1 = e.nativeEvent.touches[0].clientX;
    const finaly1 = e.nativeEvent.touches[0].clientY;

    dispatch({
      type: SET_FINALS,
      payload: {
        x: finalx1,
        y: finaly1,
      },
    });
  };

  const handleTouchEnd = (e) => {
    const differx = finalX - initialX;
    dispatch({
      type: CLEAR_TOUCHEDITEM,
    });
    dispatch({
      type: CLEAR_INITIALS,
    });
    dispatch({
      type: CLEAR_FINALS,
    });

    const ifToDelete = -differx / rectangleRight > 0.4;
    if (ifToDelete) {
      handleDeleting();
    }
  };

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
          margin: isItemDragging ? marginOnDirection : '0',
        }}
        ref={isMobile ? null : draggedWithinConstructorRef}
      >
        <div className={`${constructor__item} mb-4`} ref={itemContainerRef}>
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
            style={{ boxSizing: 'border-box', width: '100%' }}
            ref={currentTouchedItemRef}
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
        </div>
      </div>
      {isMobile &&
      diffx < 0 &&
      currentTouchedItem.uniqueId === item.uniqueId ? (
        <div
          className={delete_mobile}
          style={{
            height: `${currentRectangle.bottom - currentRectangle.top}px`,
            width:
              item.uniqueId && currentTouchedItem.uniqueId === item.uniqueId
                ? `${-diffx}px`
                : '0',
            top: `${initialY - rectangleTop}px`,
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
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  item: ingredientType.isRequired,
};

export default CustomConstructorElement;
