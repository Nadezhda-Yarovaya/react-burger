import React, { FC, useEffect, useMemo, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SingleOrderIngredients from '../single-order-ingredients/single-order-ingredients';
import { Link, useLocation } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TLocation, TOrderWithIngredients } from '../../utils/types';

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
  formatDate: (item: TOrderWithIngredients) => string;
};

const Order: FC<TOrderPropsOrder> = ({ item, formatDate }) => {
  const location = useLocation<TLocation>();

  //const currentPath = listType === 'feed' ? '/feed/' : '/profile/orders/';

  const isFeed = location.pathname.includes('/feed');
  const isOrders = location.pathname.includes('/orders');

  type Tlocate1 = {
    feedLocate? : TLocation;
    ordersLocate? : TLocation;
  }

  const [currentLocationState, setcurrentLocationState ] = useState< Tlocate1 | undefined | void>({});

  /*let currentLocationState1 : Tlocate1 | undefined | void = useMemo(()=> {}, []);
    if (isFeed) {currentLocationState1 = { feedLocate: location }; }
    if (isOrders) {currentLocationState1 = { ordersLocate: location }; }
    */

    useEffect(() => {
      if (isFeed) {
      setcurrentLocationState ({ feedLocate: location });
      } 
      if (isOrders) {
        setcurrentLocationState({ ordersLocate: location });
      }

    },[isFeed, isOrders]);



    // console.log('current location state: ', currentLocationState);

  const [orderSum, setOrderSum] = useState<number>(0);

  useEffect(() => {
    if (item) {
      let sumArray: number[] = [];
      sumArray = item.ingredients.map((item) => item?.price || 0);

      const orderTotal =
        sumArray.reduce((prev, current) => prev + current, 0) || 0;
      setOrderSum(orderTotal);
    }
  }, [item]);

  
  const [finalDate, setFinalDate] = useState<string>('');

  useEffect(() => {
    setFinalDate(formatDate(item));
  },[item]);

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
