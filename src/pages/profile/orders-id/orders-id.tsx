import { useState, useEffect, FC, useMemo } from 'react';
import IndividualOrder from '../../../components/individul-order/individual-order';
import PreloaderBurger from '../../../components/preloader/preloader';
import { useDispatch, useSelector } from '../../../hooks/hooks';
import { loadOrders } from '../../../services/action-creators/order-action-creators';
import { WS_CONNECTION_ORD_CLOSED } from '../../../services/actions/orders-ws-actions';
import style from './orders-id.module.css';

const OrdersId: FC = () => {


  const {isLogged, actoken, isMobileMenuOpened, wsOrdersConnecting} = useSelector((state: any) => ({
    isLogged: state.auth.isLogged,
    actoken: state.auth.actoken,
    isMobileMenuOpened: state.mobile.isMobileMenuOpened,
    wsOrdersConnecting: state.ordersWs.isConnecting
}));


  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogged) {
      // loadUser(dispatch, actoken); // not sure yet
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
