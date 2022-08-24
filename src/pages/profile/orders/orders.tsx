import { FC, useEffect } from "react";
import ordersStyles from "./orders.module.css";
import PersonalMenu from "../../../components/personal-menu/personal-menu";
import OrdersList from "../../../components/orders-list/orders-list";
import { TPropsFormatDate } from "../../../utils/types";
import { useDispatch } from "../../../hooks/hooks";
import { loadOrders } from "../../../services/action-creators/order-action-creators";
import { WS_CONNECTION_ORD_CLOSED } from "../../../services/actions/orders-ws-actions";

const Orders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
    return () => {
      dispatch({ type: WS_CONNECTION_ORD_CLOSED });
    };
  }, [dispatch]);
  return (
    <div className={ordersStyles.container}>
      <PersonalMenu />
      <OrdersList />
    </div>
  );
};

export default Orders;
