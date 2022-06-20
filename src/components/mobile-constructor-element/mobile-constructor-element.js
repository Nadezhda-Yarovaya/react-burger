import mobileConstructorStyles from './mobile-constructor.module.css';

import PropTypes from 'prop-types';

import {
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const {
  element,
  element__image,
  element__text,
  element__description,
  element__pricing,
} = mobileConstructorStyles;

function MobileConstructorElement(props) {
  const { text, price, thumbnail } = props;

  return (
    <>
      <div className='mr-2'>
        <DragIcon type='primary' />
      </div>
      <div className={`mr-2 ${element}`}>
        <div className={element__description}>
          <img src={thumbnail} alt={text} className={element__image} />
          <p className={element__text}>{text}</p>
        </div>
        <div className={element__pricing}>
          <p className='text text_type_digits-default mr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </>
  );
}

MobileConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default MobileConstructorElement;
