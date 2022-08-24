import React, { FC, useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SingleOrderIngredients from '../single-order-ingredients/single-order-ingredients';
import { Link, useLocation } from 'react-router-dom';
import orderStyles from './order.module.css';
import {
  TLocation,
  TOrderWithIngredients,
} from '../../utils/types';

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
  sum,
  statusWhite,
  statusBlue,
} = orderStyles;

type TOrderPropsOrder = {
  item: TOrderWithIngredients;
};

const Order: FC<TOrderPropsOrder> = ({ item }) => {
  const location = useLocation<TLocation>();

  //const currentPath = listType === 'feed' ? '/feed/' : '/profile/orders/';

  const currentLocationState =
    location.pathname === '/feed'
      ? { feedLocate: location }
      : { ordersLocate: location };

  const [orderSum, setOrderSum] = useState<number>(0);

  useEffect(() => {
    if (item) {
      console.log('item order: ', item);
      console.log('item Id: ', item._id);
      let sumArray: number[] = [];
      sumArray = item.ingredients.map((item) => (item?.price || 0)) ;
      console.log('sumArray: ', sumArray);
     
      
      const orderTotal = sumArray.reduce((prev, current) => prev + current, 0) || 0;
      setOrderSum(orderTotal);
    }
  }, [item]);

  // formatting date
  const orderDate = new Date(item.createdAt);
  const today = new Date();
  const daysDiff = Math.round(
    (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)
  );
  const lastDigit = parseInt(daysDiff.toString().slice(-1));
  const howMany =
    daysDiff > 20 && lastDigit === 1
      ? daysDiff + ' день назад'
      : daysDiff + 'дней назад';
  const howManyTwo =
    lastDigit === (2 | 3 | 4) ? daysDiff + ' дня назад' : howMany;
  const isYesterday = daysDiff === 1 ? 'Вчера' : howManyTwo;
  const isOrderOfToday =
    today.toLocaleDateString() === orderDate.toLocaleDateString();
  const dateName = isOrderOfToday ? 'Сегодня' : isYesterday;
  const minutes =
    orderDate.getMinutes() < 10
      ? '0' + orderDate.getMinutes()
      : orderDate.getMinutes();

      const GMTzone = (-orderDate.getTimezoneOffset() / 60 );
      const signPlusOrMinus = GMTzone > 0 ? '+' : '';
  const finalDate =
    dateName + ', ' + orderDate.getHours() + ':' + minutes + ' i-GMT' + signPlusOrMinus + GMTzone;



  const [statusText, setStatusText] = useState<string>('');

  function makeStatus(status: string) {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'created':
        return 'Выполнен';
      case 'pending':
        return 'Создан';
      default:
        return 'Выполнен';
    }
  }

  useEffect(() => {
    setStatusText(makeStatus(item.status));
  }, [item]);

  
  return (
    <Link
      to={{
        pathname: `${location.pathname}/${item._id}`,
        state: currentLocationState,
      }}
      className={link}
    >
      <div className={`${order} mr-8 mb-6 pr-6 pl-6 pb-6 pt-6`}>
        <div className={datecontainer}>
          <p className={`${number} text text_type_digits-default`}>
            #{item.number}
          </p>
          <p className={date}>{finalDate}</p>
        </div>
        <p className={`${name} mt-6 mb-6 text text_type_main-medium`}>
          {item.name}
        </p>
        {location.pathname === '/feed' ? (
          ''
        ) : (
          <p
            className={`${status} mb-6 ${
              item.status === ('pending' || 'created')
                ? statusWhite
                : statusBlue
            }`}
          >
            {statusText}
          </p>
        )}
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
