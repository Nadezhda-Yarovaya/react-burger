import React, { useEffect, useState, useRef, FC, SyntheticEvent } from 'react';
import CustomConstructorStyles from './custom-constructor-element.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
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
import {
  TIngredient,
  TIngredientUniq2,
  TIngredientUnique,
  TRectangle,
} from '../../utils/types';
import { SynthesizedComment } from 'typescript';

import { ConstructorElement } from '../../utils/typesLibrary';

import { useDispatch, useSelector } from '../../hooks/hooks';

const {
  constructor__item,
  icon,
  delete_mobile,
  delete_image,
  stuffings__item,
} = CustomConstructorStyles;

type TCustomElementProps = {
  text: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
  item: TIngredientUnique;
};

type TCustomElementPropsBun = {
  text: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
  item: TIngredient; // вот тут так и надо
};

export const CustomConstructorElementBun: FC<TCustomElementPropsBun> = ({
  text,
  price,
  thumbnail,
  isLocked,
  type,
  item,
}) => (
  <>
    <div className={`${stuffings__item} mr-2`}>
      <div className={`${constructor__item} mb-4`}>
        <div style={{ boxSizing: 'border-box', width: '100%' }}>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${text}`}
            price={price}
            thumbnail={thumbnail}
          />
        </div>
      </div>
    </div>
  </>
);

export const CustomConstructorElement: FC<TCustomElementProps> = ({
  text,
  price,
  thumbnail,
  isLocked,
  type,
  item,
}) => {
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
  const currentTouchedItemRef = useRef<HTMLDivElement>(null);
  const [currentRectangle, setCurrentRectangle] = useState<TRectangle>(
    { top: 0, left: 0, bottom: 0, right: 0 } || null
  );
  const itemContainerRef = useRef<HTMLDivElement>(null);

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

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const initialx1 = e?.nativeEvent?.touches[0].clientX;
    const initialy1 = Math.floor(
      itemContainerRef.current!.getBoundingClientRect().top
    );

    setCurrentRectangle(
      (
        currentTouchedItemRef as React.MutableRefObject<HTMLDivElement>
      ).current.getBoundingClientRect() || 0
    );
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

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
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

  const handleTouchEnd = (e: SyntheticEvent) => {
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
  const top: number = currentRectangle?.top || 0;
  const bottom: number = currentRectangle?.bottom || 0;
  const diff1: number = bottom - top;
  const isUniqIdCompared = item.uniqueId
    ? currentTouchedItem.uniqueId === item.uniqueId
    : false;

  const marginOnDirection =
    direction && direction === 'top' ? '90px 16px 0 0' : '0 16px 90px 0';

  const stuffingItemStyle: React.CSSProperties = {
    transform: isUniqIdCompared
      ? `translate(${diffx + 'px'}, 0px)`
      : 'translate(0px,0px)',
    boxSizing: 'border-box',
    margin: isItemDragging ? marginOnDirection : '0',
  };

  const mobileItemStyle: React.CSSProperties = {
    height: `${currentRectangle ? diff1 ?? 0 : 0}px`,
    width: isUniqIdCompared ? `${-diffx}px` : '0',
    top: `${initialY - rectangleTop}px`,
  };

  return (
    <>
      <div
        className={`${stuffings__item} mr-2`}
        style={stuffingItemStyle}
        ref={isMobile ? null : draggedWithinConstructorRef}
      >
        <div className={`${constructor__item} mb-4`} ref={itemContainerRef}>
          <div
            className={`${icon} mr-2`}
            ref={isMobile ? draggedWithinConstructorRef : null}
          >
            <DragIcon type='primary' />
          </div>

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
        <div className={delete_mobile} style={mobileItemStyle}>
          <div className={delete_image}></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
