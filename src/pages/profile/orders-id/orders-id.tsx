import React, { useState, useEffect, FC } from 'react';
import ordersIdStyles from './orders-id.module.css';
import initialTempOrderList from '../../../utils/tempdata';
import { useParams } from 'react-router-dom'; // импортируем хук
import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const {
  container,
  box,
  number,
  name,
  status,
  title,
  list,
  price,
  list__item,
  list__iteminfo,
  list__priceinfo,
} = ordersIdStyles;

const OrdersId: FC = () => {
  const [currentOrderShown, setCurrentOrderShown] = useState(
    initialTempOrderList[0]
  );

  return (
    <>
      <div className={container}>
        <div className={box}>
          <p className={number}>#{currentOrderShown.order.number}</p>
          <p className={name}>{currentOrderShown.name}</p>
          <p className={`${status}`}>{currentOrderShown.status}</p>
          <p className={title}>Состав :</p>
          <ul className={list}></ul>
        </div>
      </div>
    </>
  );
};

export default OrdersId;
