import { useState, useEffect, FC, useMemo } from 'react';
import IndividualOrder from '../../../components/individul-order/individual-order';
import PreloaderBurger from '../../../components/preloader/preloader';
import { useDispatch, useSelector } from '../../../hooks/hooks';
import { loadUser } from '../../../services/action-creators/auth-action-creators';
import { loadOrders } from '../../../services/action-creators/order-action-creators';
import { WS_CONNECTION_ORD_CLOSED } from '../../../services/actions/orders-ws-actions';
import style from './orders-id.module.css';

const OrdersId: FC = () => {
  const wsOrdersConnecting = useSelector(
    (state) => state.ordersWs.isConnecting
  );
  const isLogged = useSelector((state) => state.auth.isLogged);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogged) {
      dispatch(loadUser());
    }
  }, [isLogged]);

  useEffect(() => {
    dispatch(loadOrders());
    return () => {
      dispatch({ type: WS_CONNECTION_ORD_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={style.order}>
      {wsOrdersConnecting ? <PreloaderBurger /> : <IndividualOrder />}
    </div>
  );
};

export default OrdersId;
