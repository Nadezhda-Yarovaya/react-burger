import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SingleOrderIngredients from '../single-order-ingredients/single-order-ingredients';
import { Link } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TOrderProps } from '../../utils/types';

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

type TOrderPropsOrder = TOrderProps & {
  listType: string;
};

const Order: FC<TOrderPropsOrder> = ({ item, listType }) => {
  const orderPage = listType === 'feed' ? '/feed/' : '/profile/orders/';

  return (
    <>
      <div className={`${order} mr-8 mb-6 pr-6 pl-6 pb-6 pt-6`}>
        <div className={datecontainer}>
          <p className={number}>#{item.order.number}</p>
          <p className={date}>{item.date}</p>
        </div>
        <Link to={`${orderPage}${item._id}`}>Моя страница заказа</Link>
        <p className={`${name} mt-6 mb-2`}>{item.name}</p>
        <p className={`${status} mb-6`}>{item.status}</p>
        <div className={ingredients}>
          <ul className={list}>
            {item &&
              item.positions
                .slice(0, 6)
                .map((ingredient, index) => (
                  <SingleOrderIngredients
                    key={index}
                    index={index}
                    positions={item.positions}
                    ingredient={ingredient}
                  />
                ))}
          </ul>

          <div className={`${sumcontainer}`}>
            {' '}
            <p className={`mr-2 text text_type_digits-small`}>
              {item.sum}
            </p>{' '}
            <CurrencyIcon type='primary' />
          </div>
        </div>
        {/* close order */}{' '}
      </div>
    </>
  );
};
export default Order;
