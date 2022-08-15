import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect } from 'react';
import SingleOrderIngredients from '../single-order-ingredients/single-order-ingredients';
import { Link } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TIngredientUnique } from '../../utils/types';

const {
  order,
  name,
  ingredients,
  list,
  sumcontainer,
  date,
  datecontainer,
  number,
  status,
} = orderStyles;

type TOrderProps = {
  item: TIngredientUnique;
};
const Order: FC<TOrderProps> = ({ item }) => {
  return (
    <>
      <div className={`${order} mr-8 mb-6 pr-6 pl-6 pb-6 pt-6`}>
        <div className={datecontainer}></div>
        {/* close order */}{' '}
      </div>
    </>
  );
};
export default Order;
