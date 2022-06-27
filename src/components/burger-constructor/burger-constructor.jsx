import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import MobileConstructorElement from '../mobile-constructor-element/mobile-constructor-element';

import { ingredientType } from '../../utils/types';

import { IngredientsContext } from '../../contexts/appContexts';

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
  const {
    isMobileOrdered,
    isMobile,
    setMobiledOrdered,
    isLoading,
    bunSelected,
  } = props;

  const ingredientsFromContext = useContext(IngredientsContext);
  const stuffingsList = ingredientsFromContext.stuffingsList;

  const text = bunSelected.name;
  const price = parseInt(bunSelected.price).toString();
  const thumbnail = bunSelected.image;

  return (
    <>
      {isMobile && isMobileOrdered ? (
        <div className={constructor__order}>
          <p className={constructor__title}>Заказ</p>
          <button
            onClick={() => {
              setMobiledOrdered(false);
            }}
            className={constructor__button}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
      ) : (
        <></>
      )}
      <ul className={`${list}`}>
        {isLoading ? (
          <li style={{ alignSelf: 'flex-start' }}>
            <p className='text text_type_main-small'>Загрузка...</p>
          </li>
        ) : (
          <>
            <li className={`${item} ${item_type_bun} pr-4 pl-4`}>
              <div className={`mb-4 ${constructor__item}`}>
                {isMobile ? (
                  <MobileConstructorElement
                    text={`${text} (верх)`}
                    price={price}
                    thumbnail={thumbnail}
                  />
                ) : (
                  <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${text} (верх)`}
                    price={price}
                    thumbnail={thumbnail}
                  />
                )}
              </div>
            </li>
            <li className={`${item_type_stuffing} pl-4`}>
              <ul className={stuffings}>
                {stuffingsList.map((item, index, arr) => (
                  <li
                    className={`${
                      index !== stuffingsList.length - 1 ? 'mb-4 ' : ''
                    }${stuffings__item} mr-2`}
                    key={item._id}
                  >
                    <div className={`${constructor__item}`}>
                      {isMobile ? (
                        <MobileConstructorElement
                          text={`${item.name}`}
                          price={item.price.toString()}
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
                    text={`${text} (низ)`}
                    price={price}
                    thumbnail={thumbnail}
                  />
                ) : (
                  <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${text} (низ)`}
                    price={price}
                    thumbnail={thumbnail}
                  />
                )}
              </div>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

BurgerConstructor.propTypes = {
  isMobileOrdered: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setMobiledOrdered: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  bunSelected: ingredientType.isRequired,
};

export default BurgerConstructor;
