import React, { useEffect } from 'react';
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
  const { text, price, thumbnail, isLocked, type, item } = props;

  const dispatch= useDispatch();

  const [{initialIngredientOffset}, draggedWithinConstructorRef] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      initialIngredientOffset: monitor.getInitialClientOffset()
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


  return (
    <>
 <div className={`${stuffings__item} mr-2`} ref={draggedWithinConstructorRef} onTouchStart={props.touch2}>
      <div className={`mb-4 ${constructor__item}`}>
        {type ? (
          <></>
        ) : (
          <div className={`${icon} mr-2`}>
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
