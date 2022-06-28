import React from 'react';
import CustomConstructorStyles from './custom-constructor-element.module.css';

import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const { constructor__item, icon } = CustomConstructorStyles;

function CustomConstructorElement(props) {
  const { text, price, thumbnail, isLocked, type } = props;
  return (
    <>
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
          text={`${text} (верх)`}
          price={price}
          thumbnail={thumbnail}
        />
      </div>
    </>
  );
}

CustomConstructorElement.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default CustomConstructorElement;
