import React, { useState, useEffect, FC } from 'react';
import ordersIdStyles from './orders-id.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderItem, TOrderFull } from '../../../utils/types';
import { initialElement } from '../../../utils/utils';

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
  const [currentOrderShown, setCurrentOrderShown] =
    useState<TOrderFull>(initialElement);

  console.log('current order: ', currentOrderShown);

  type TParams = {
    id: string;
  };

  const { id } = useParams<TParams>();

  const orderList = useSelector((state: any) => state.order.orderFullList);
  console.log('orderList: ', orderList);

  useEffect(() => {
    const current = orderList.find((item: TOrderItem) => item._id === id);
    if (current) {
      setCurrentOrderShown(current);
    }
  }, [id, orderList]);

  return (
    <>
      <div className={container}>
        <div className={box}>
          <p className={number}>#{currentOrderShown.order.number}</p>
          <p className={name}>{currentOrderShown.name}</p>
          <p className={`${status}`}>{currentOrderShown.status}</p>
          <p className={title}>Состав :</p>
          <ul className={list}>
            {currentOrderShown.positions[0] &&
              currentOrderShown.positions.map((element, ind) => (
                <li key={ind} className={list__item}>
                  <div className={list__iteminfo}>
                    <img src={element.image} alt={element.name} />
                    <p>{element.name}</p>
                  </div>
                  <div className={list__priceinfo}>
                    <p className={price}>1 x {element.price}</p>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrdersId;
