import React from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerData } from '../../utils/data';
import constructorStyles from './burger-constructor.module.css';
import MobileConstructorElement from '../MobileConstructorElement/MobileConstructorElement';

const {
  constructor__item,
  stuffings,
  item,
  item_type_bun,
  item_type_stuffing,
  list,
  constructor__title,
  constructor__order,
  constructor__button,
  stuffings__item,
  icon,
} = constructorStyles;

function BurgerConstructor(props) {
  const { isMobileOrdered, isMobile, handleToggleIfMobile } = props;
  const tempList = burgerData.filter((item, index) => index > 3 && index < 10);
  return (
    <>
      {isMobile && isMobileOrdered ? (
        <div className={constructor__order}>
          <p className={constructor__title}>Заказ</p>
          <button
            onClick={handleToggleIfMobile}
            className={constructor__button}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
      ) : (
        <></>
      )}
      <ul className={`${list}`}>
        <li className={`${item} ${item_type_bun} pr-4 pl-4`}>
          <div className={`mb-4 ${constructor__item}`}>
            {isMobile ? (
              <MobileConstructorElement
                text={`${burgerData[0].name} (верх)`}
                price={burgerData[0].price}
                thumbnail={burgerData[0].image}
              />
            ) : (
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${burgerData[0].name} (верх)`}
                price={burgerData[0].price}
                thumbnail={burgerData[0].image}
              />
            )}
          </div>
        </li>
        <li className={`${item_type_stuffing} pl-4`}>
          <ul className={stuffings}>
            {tempList.map((item, index, arr) => (
              <li
                className={`${
                  index !== tempList.length - 1 ? 'mb-4 ' : ''
                }${stuffings__item} mr-2`}
                key={item._id}
              >
                <div className={`${constructor__item}`}>
                  {isMobile ? (
                    <MobileConstructorElement
                      text={`${item.name}`}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  ) : (
                    <>
                      <button className={`mr-2 ${icon}`}>
                        <DragIcon type='primary' />
                      </button>
                      <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className={`${item} ${item_type_bun} pr-4 pl-4`}>
          <div className={`mt-4 ${constructor__item}`}>
            {isMobile ? (
              <MobileConstructorElement
                text={`${burgerData[0].name} (верх)`}
                price={burgerData[0].price}
                thumbnail={burgerData[0].image}
              />
            ) : (
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${burgerData[0].name} (низ)`}
                price={burgerData[0].price}
                thumbnail={burgerData[0].image}
              />
            )}
          </div>
        </li>
      </ul>
    </>
  );
}

BurgerConstructor.propTypes = {
  isMobileOrdered: PropTypes.bool,
  isMobile: PropTypes.bool,
  handleToggleIfMobile: PropTypes.func,
};

export default BurgerConstructor;
