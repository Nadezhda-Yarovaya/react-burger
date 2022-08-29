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
import PreloaderBurger from '../preloader/preloader';
import ordersStyles from './orders-list.module.css';

const { orders } = ordersStyles;

const OrdersList: FC = () => {
  const location = useLocation<TLocation>();
  const isFeed = location.pathname.includes('/feed');
  const isOrders = location.pathname.includes('/profile/orders');

  const [orderListFinal, setOrderListFinal] = useState<
    TOrderWithIngredients[] | undefined
  >([initialElement]);

  const [wsConnecting, setWsConnecting] = useState<boolean | undefined>(true);
  const [wsConnected, setWsConnected] = useState<boolean | undefined>(false);

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);

  const wsFeedConnecting = useSelector((state) => state.feedWs.isConnecting);
  const wsOrdersConnecting = useSelector(
    (state) => state.ordersWs.isConnecting
  );

  const wsFeedConnected = useSelector((state) => state.feedWs.wsConnected);
  const wsOrdersConnected = useSelector((state) => state.ordersWs.wsConnected);

  useEffect(() => {
    if (isFeed) {
      setOrderListFinal(orderAllList);
      setWsConnecting(wsFeedConnecting);
      setWsConnected(wsFeedConnected);
    }
    if (isOrders) {
      setOrderListFinal(orderPersList);
      setWsConnected(wsOrdersConnected);
      setWsConnecting(wsOrdersConnecting);
    }
  }, [orderAllList, orderPersList]);

  const ordersMessage =
    orderListFinal && orderListFinal?.length > 0
      ? ''
      : 'Список заказов пока пуст';

  const textMessage = wsConnected
    ? ordersMessage
    : 'Невозможно загрузить ленту заказов. Нет соединения';

  const list =
    wsConnected && orderListFinal && orderListFinal?.length > 0 ? (
      orderListFinal.map((item) => <Order key={item._id} item={item} />)
    ) : (
      <p className='text text_type_main-default'>{textMessage}</p>
    );

  return (
    <OrdersDataWrapper>
      <div className={`${orders} pr-2`}>
        {wsConnecting ? <PreloaderBurger /> : list}
      </div>
    </OrdersDataWrapper>
  );
};

export default OrdersList;
