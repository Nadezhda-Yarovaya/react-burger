import React, { useContext } from 'react';
import constructorListStyles from './constructor-list.module.css';

import PropTypes from 'prop-types';
import CustomConstructorElement from '../custom-constructor-element/custom-constructor-element';

import { IfMobileContext } from '../../services/app-contexts';
import { ingredientType } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';

import {
  SET_ORDERDATA,
  UPDATE_COUNTER,
  INCREASE_DROPPEDELEMENT,
} from '../../services/actions';
import { useDrop } from 'react-dnd';

const {
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  stuffings__item,
  list_flex,
} = constructorListStyles;

/* will perform later delete by swipe on mobile */

function ConstructorList(props) {
  const dispatch = useDispatch();

  const currentTimeInSeconds = Math.floor(Date.now() / 10);

  const handleDrop = (currentItem) => {
    // updating counter for main ingredient
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
  };

  const [, dropContainerRef] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  const stuffingListDropped = useSelector((store) => {
    console.log('store:', store.droppedElements);
    return store.droppedElements;
  });
  const { bunSelected, stuffingsList, isLoading } = props;
  const { isMobile } = useContext(IfMobileContext);

  return (
    <ul className={`${list} ${isMobile ? '' : list_flex}`}>
      {isLoading ? (
        <li style={{ alignSelf: 'flex-start' }}>
          <p className='text text_type_main-small'>Загрузка...</p>
        </li>
      ) : (
        <>
          <li className={`${item} ${item_type_bun}`}>
            <CustomConstructorElement
              type='top'
              isLocked={true}
              text={`${bunSelected.name} (верх)`}
              price={bunSelected.price}
              thumbnail={bunSelected.image}
            />
          </li>
          <li className={`${item_type_stuffing}`}>
            <ul
              className={`${stuffings} ${
                stuffingListDropped.length > 5 ? '' : 'pr-2'
              }`}
              ref={dropContainerRef}
            >
              {stuffingListDropped.map((item) => (
                <li className={`${stuffings__item} mr-2`} key={item.uniqueId}>
                  <CustomConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              ))}
            </ul>
          </li>
          <li className={`${item} ${item_type_bun} mt-4`}>
            <CustomConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bunSelected.name} (низ)`}
              price={bunSelected.price}
              thumbnail={bunSelected.image}
            />
          </li>
        </>
      )}
    </ul>
  );
}

ConstructorList.propTypes = {
  /* bunSelected: ingredientType.isRequired,
  stuffingsList: PropTypes.arrayOf(ingredientType).isRequired,
  isLoading: PropTypes.bool.isRequired,*/
};

export default ConstructorList;
