import React, { FC, useEffect, useState } from 'react';
import { TOrderItem, TOrdersId, TOrderFull } from '../../utils/types';
import Order from '../order/order';
import ordersStyles from './orders-list.module.css';
import { getAllIngredients } from '../../services/selectors';
import { SET_POSITIONSDATA } from '../../services/actions';
import initialTempOrderList from '../../utils/tempdata';
import { useDispatch, useSelector } from 'react-redux';

const { container, orders, maintitle } = ordersStyles;

type TOrderstype = {
  listType: string;
};

const OrdersList: FC<TOrderstype> = ({ listType }) => {
  const orderAllList = useSelector((state: any) => state.order.orderFullList);

  const orderPersList = useSelector((state: any) => state.order.orderFullList);

  const orderList = orderPersList ? orderPersList : orderAllList;

  console.log('order list final:', orderAllList);
  /*
  const areOrders = orderList.length > 1;
  const [showorders, setShowOrders] = useState<boolean>(false);
  useEffect(()=>{
if (areOrders) {
  setShowOrders(true);
}
  }, [areOrders]);*/
  return (
    <div className={`${orders} pr-2`}>
      <p className={maintitle}>История заказов</p>

      {orderList.map((item: TOrderFull, ind: number) => (
        <Order
          key={ind}
          item={item}
          listType={listType}
        />
      ))}
    </div>
  );
};

export default OrdersList;
