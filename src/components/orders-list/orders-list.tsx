import React, { FC } from 'react';
import { TOrder, TOrderWithIngredients } from '../../utils/types';
import Order from '../order/order';
import ordersStyles from './orders-list.module.css';
import { useSelector } from 'react-redux';

const { orders, maintitle } = ordersStyles;


const OrdersList: FC = () => {
  const orderAllList = useSelector((state: any) => state.ws.ordersArray);
  const orderPersList = useSelector((state: any) => state.order.orderFullList); // надо сделать тут диспатч другой ссылки с токеном 
  const orderList = orderAllList;

  // console.log('list: ', orderAllList);

  return (
    <div className={`${orders} pr-2`}>
      {orderList.map((item: TOrderWithIngredients, ind: number) => (
        <Order key={ind} item={item} />
      ))}
    </div>
  );
};

export default OrdersList;
