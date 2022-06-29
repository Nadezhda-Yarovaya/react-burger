import React, { useContext } from 'react';
import constructorListStyles from './constructor-list.module.css';

import PropTypes from 'prop-types';
import CustomConstructorElement from '../custom-constructor-element/custom-constructor-element';

import { IfMobileContext } from '../../services/app-contexts';
import { ingredientType } from '../../utils/types';

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
                stuffingsList.length > 5 ? '' : 'pr-2'
              }`}
            >
              {stuffingsList.map((item) => (
                <li className={`${stuffings__item} mr-2`} key={item._id}>
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
  bunSelected: ingredientType.isRequired,
  stuffingsList: PropTypes.arrayOf(ingredientType).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ConstructorList;
