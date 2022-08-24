import { useState, useEffect, FC, useMemo } from 'react';
import IndividualOrder from '../../../components/individul-order/individual-order';
import { useDispatch } from '../../../hooks/hooks';
import { loadOrders } from '../../../services/action-creators/order-action-creators';
import { WS_CONNECTION_ORD_CLOSED } from '../../../services/actions/orders-ws-actions';



const OrdersId: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
    return () => {
      dispatch({ type: WS_CONNECTION_ORD_CLOSED });
    };
  }, [dispatch]);

  return (
    <IndividualOrder />
  );
};

export default OrdersId;
