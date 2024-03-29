import React, { useState, useRef, useEffect, FC } from 'react';
import constructorListStyles from './constructor-list.module.css';

import {
  SET_DROPDIRECTION,
  REPLACE_BUN,
  SET_OFFSETS,
} from '../../services/actions';
import { useDrop } from 'react-dnd';
import { dropElementWithinConstructor } from '../../services/action-creators/dnd-action-creators';
import { TIngredientUnique } from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/hooks';
import {
  CustomConstructorElement,
  CustomConstructorElementBun,
} from '../custom-constructor-element/custom-constructor-element';

const {
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  list_flex,
  stuffings__empty,
  empty,
  bunShort,
  bunLong,
} = constructorListStyles;

const ConstructorList: FC = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.mobile.isMobile);
  const direction = useSelector((state) => state.dragAndDrop.dropDirection);
  const currentBun = useSelector((state) => state.ingredients.bun);
  const isLoading = useSelector((state) => state.ingredients.isLoading);

  const initialIngredOffset = useSelector(
    (store) => store.dragAndDrop.initialIngredOffset
  );

  const stuffingListDropped = useSelector(
    (state) => state.dragAndDrop.droppedElements
  );

  const thisRef = useRef<HTMLLIElement>(null);
  type TItem = {
    item: TIngredientUnique;
  };

  const handleBunDrop = (currentItem: TItem): void => {
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
    drop(item: TItem) {
      handleBunDrop(item);
    },
    collect: (monitor: any) => ({
      isBunHover: monitor.isOver(),
    }),
  });

  const [{ isBunBottomHover }, dropContainerBunBottom] = useDrop({
    accept: 'bun',
    drop(item: TItem) {
      handleBunDrop(item);
    },
    collect: (monitor) => ({
      isBunBottomHover: monitor.isOver(),
    }),
  });

  const [{ isHover }, dropContainerRef] = useDrop({
    accept: 'ingredient',
    hover(item, monitor) {
      const hoverBoundingRect = (
        thisRef as React.MutableRefObject<HTMLLIElement>
      ).current.getBoundingClientRect();
      const currentOffset = Math.floor((monitor as any).getClientOffset().y);
      const hoverBoundingRectTop = Math.floor(hoverBoundingRect.top);
      let initialIngredOffsetFinal = initialIngredOffset || {};

      const currentItemOffset = initialIngredOffsetFinal.y;

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
      dropElementWithinConstructor((item as TItem).item, dispatch, direction);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const stuffingsStyles: React.CSSProperties = {
    padding: isHover ? '0 8px 80px 0' : '0 8px 0 0',
    backgroundColor: isHover ? 'rgba(0,0,0,0.91)' : 'transparent',
    border: isHover ? '1px dashed white' : '0',
    position: 'relative',
    minHeight: (stuffingListDropped.length + 1) * 30 + 'px',
  };

  const bunTopStyle: React.CSSProperties = {
    backgroundColor: isBunHover ? 'rgba(0,0,0,0.91)' : 'transparent',
    border: isBunHover ? '1px dashed white' : '0',
  };

  const bunBottomStyle: React.CSSProperties = {
    backgroundColor: isBunBottomHover ? 'rgba(0,0,0,0.91)' : 'transparent',
    border: isBunBottomHover ? '1px dashed white' : '0',
  };

  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);

  useEffect(() => {
    if (isMobileOrdered) {
      const rectangle = (
        thisRef as React.MutableRefObject<HTMLLIElement>
      ).current?.getBoundingClientRect();
      dispatch({
        type: SET_OFFSETS,
        payload: {
          top: Math.floor(rectangle.top),
          right: Math.floor(rectangle.right),
        },
      });
    }
  }, [isMobile, isMobileOrdered, stuffingListDropped]);

  const scrollVisible = stuffingListDropped.length > 4;

  return (
    <ul className={`${list} ${isMobile ? '' : list_flex}`}>
      {isLoading ? (
        <li style={{ alignSelf: 'flex-start' }}>
          <p className='text text_type_main-small'>Загрузка...</p>
        </li>
      ) : (
        <>
          <li
            className={`${item} ${item_type_bun} ${
              scrollVisible ? bunShort : bunLong
            } mb-4`}
            ref={dropContainerBunTop}
            style={bunTopStyle}
            data-testid='drop_cont-buns'
          >
            <CustomConstructorElementBun
              type='top'
              isLocked={true}
              text={`${currentBun.name} ${
                currentBun.price !== 0 ? ' (верх)' : ''
              }`}
              price={currentBun.price}
              thumbnail={currentBun.image}
              item={currentBun}
              scrollVisible={scrollVisible}
            />
          </li>
          <li
            className={`${item_type_stuffing}`}
            ref={thisRef}
            data-testid='drop_cont-stuffings'
          >
            <div
              className={`${stuffings} ${scrollVisible ? '' : `${empty} pr-2`}`}
              style={stuffingsStyles}
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
            className={`${item} ${item_type_bun} ${
              scrollVisible ? bunShort : bunLong
            } mt-4`}
            ref={dropContainerBunBottom}
            style={bunBottomStyle}
          >
            <CustomConstructorElementBun
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
  );
};

export default ConstructorList;
