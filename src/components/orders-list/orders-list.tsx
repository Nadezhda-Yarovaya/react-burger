import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';
import {
  TLocation,
  TOrderWithIngredients,
  TPropsFormatDate,
} from '../../utils/types';
import { initialElement } from '../../utils/utils';
import Order from '../order/order';
import OrdersDataWrapper from '../orders-data-wrapper/orders-data-wrapper';
import ordersStyles from './orders-list.module.css';

const { orders } = ordersStyles;

const OrdersList: FC<TPropsFormatDate> = ({ formatDate }) => {
  const location = useLocation<TLocation>();
  const isFeed = location.pathname.includes('/feed');
  const isOrders = location.pathname.includes('/profile/orders');

  const [orderListFinal, setOrderListFinal] = useState<
    TOrderWithIngredients[] | undefined
  >([initialElement]);

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);

  useEffect(() => {
    if (isFeed) {
      setOrderListFinal(orderAllList);
    }
    if (isOrders) {
      setOrderListFinal(orderPersList);
    }
  }, [orderAllList, orderPersList]);

  return (
    <OrdersDataWrapper>
      <div className={`${orders} pr-2 mt-8`}>
        {orderListFinal && orderListFinal.length > 0 ? (
          orderListFinal.map((item: TOrderWithIngredients, ind: number) => (
            <Order key={ind} item={item} formatDate={formatDate} />
          ))
        ) : (
          <p className='text text_type_main-default'>
            У вас пока нет заказов. Сделайте первый заказ на главной странице.
          </p>
        )}
      </div>
    </OrdersDataWrapper>
  );
};

export default OrdersList;
