import React, { FC } from 'react';
import { TOrderFull } from '../../utils/types';
import Order from '../order/order';
import ordersStyles from './orders-list.module.css';
import { useSelector } from 'react-redux';

const { orders, maintitle } = ordersStyles;

type TOrderstype = {
  listType: string;
};

const OrdersList: FC<TOrderstype> = ({ listType }) => {
  const orderAllList = useSelector((state: any) => state.order.orderFullList);
  const orderPersList = useSelector((state: any) => state.order.orderFullList); // надо сделать тут диспатч
  const orderList = orderPersList ? orderPersList : orderAllList;

  return (
    <div className={`${orders} pr-2`}>
      <p className={maintitle}>История заказов</p>

      {orderList.map((item: TOrderFull, ind: number) => (
        <Order key={ind} item={item} listType={listType} />
      ))}
    </div>
  );
};

export default OrdersList;
