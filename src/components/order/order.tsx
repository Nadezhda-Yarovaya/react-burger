import React, { FC, useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SingleOrderIngredients from '../single-order-ingredients/single-order-ingredients';
import { Link, useLocation } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TLocation, TOrder, TOrderProps, TOrderWithIngredients } from '../../utils/types';

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
  link,
  sum
} = orderStyles;

type TOrderPropsOrder = {
  item: TOrderWithIngredients;
};

const Order: FC<TOrderPropsOrder> = ({ item }) => {
  
  const location = useLocation<TLocation>();

  //const currentPath = listType === 'feed' ? '/feed/' : '/profile/orders/';

  const currentLocationState = location.pathname === '/feed' ? {feedLocate: location} : {ordersLocate: location};

  const [orderSum, setOrderSum] = useState<number>(0);

  useEffect(() => {
    if (item) {
      const sumArray = item.ingredients.map(item => item.price);
    // console.log(sumArray);
    const new1 = sumArray.reduce((a,b) => a +b, 0) ;
    setOrderSum(new1);
    }
  }, [item]);


  // formatting date
  const orderDate = new Date(item.createdAt);
  const today = new Date();
  const daysDiff = Math.round((today.getTime() - orderDate.getTime())/ (1000 * 3600 * 24));
  const lastDigit = parseInt(daysDiff.toString().slice(-1));
  const howMany = ((daysDiff > 20) && (lastDigit === 1)) ? daysDiff  + ' день назад' : daysDiff  + 'дней назад';
  const howManyTwo = (lastDigit === (2 | 3 | 4)) ? daysDiff  + ' дня назад' : howMany;
  const isYesterday = (daysDiff === 1) ? 'Вчера' : howManyTwo;
  const isOrderOfToday = today.toLocaleDateString() === orderDate.toLocaleDateString();
  const dateName = (isOrderOfToday) ? 'Сегодня' : isYesterday;
  const minutes = (orderDate.getMinutes() < 10) ? '0' + orderDate.getMinutes() : orderDate.getMinutes();
  const finalDate = dateName + ', ' + orderDate.getHours() + ":" + minutes  + ', ';

  return (
      <Link to={{
        pathname: `${location.pathname}/${item._id}`,
      state: currentLocationState,
      }} className={link}>
      <div className={`${order} mr-8 mb-6 pr-6 pl-6 pb-6 pt-6`}>
        <div className={datecontainer}>
          <p className={`${number} text text_type_digits-default`}>#{item.number}</p>
          <p className={date}>{finalDate}</p>
        </div>
        <p className={`${name} mt-6 mb-6 text text_type_main-medium`}>{item.name}</p>
         { /* listType === 'feed' ? '' : <p className={`${status} mb-6`}>{item.status}</p> */}
         <p className={`${status} mb-6`}>{item.status}</p>
        <div className={ingredients}>
          <ul className={list}>
            {item &&
              item.ingredients
                .slice(0, 6)
                .map((ingredient, index) => (
                  <SingleOrderIngredients
                    key={index}
                    index={index}
                    positions={item.ingredients}
                    ingredient={ingredient}
                  />
                ))}
          </ul>

          <div className={`${sumcontainer}`}>
            {' '}
            <p className={`${sum} mr-2 text text_type_digits-default`}>
              {orderSum}
            </p>{' '}
            <CurrencyIcon type='primary' />
          </div>
        </div>
        {/* close order */}{' '}
      </div>
    </Link>
  );
};
export default Order;
