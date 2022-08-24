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

  const [wsConnected, setWsConnected] = useState<boolean | undefined>(false);

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);

  const wsFeedConnected = useSelector((state) => state.feedWs.wsConnected);
  const wsOrdersConnected = useSelector((state) => state.ordersWs.wsConnected);

  useEffect(() => {
    if (isFeed) {
      setOrderListFinal(orderAllList);
      setWsConnected(wsFeedConnected);
    }
    if (isOrders) {
      setOrderListFinal(orderPersList);
      setWsConnected(wsOrdersConnected);
    }
  }, [orderAllList, orderPersList]);

  const ordersMessage =
    orderListFinal && orderListFinal?.length > 0
      ? ''
      : 'Список заказов пока пуст';

  const textMessage = wsConnected
    ? ordersMessage
    : 'Невозможно загрузить ленту заказов. Нет соединения';

  return (
    <OrdersDataWrapper>
      <div className={`${orders} pr-2 mt-8`}>
        {wsConnected && orderListFinal && orderListFinal?.length > 0 ? (
          orderListFinal.map((item: TOrderWithIngredients) => (
            <Order key={item._id} item={item} formatDate={formatDate} />
          ))
        ) : (
          <p className='text text_type_main-default'>{textMessage}</p>
        )}
      </div>
    </OrdersDataWrapper>
  );
};

export default OrdersList;
