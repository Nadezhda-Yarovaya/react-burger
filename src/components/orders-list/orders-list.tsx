import React, { FC, useEffect } from 'react';
import {
  TIngredient,
  TLocation,
  TOrder,
  TOrderWithIngredients,
} from '../../utils/types';
import Order from '../order/order';
import ordersStyles from './orders-list.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTION_ORD_START,
  WS_SET_ORD_ORDERSLIST,
} from '../../services/actions/orders-ws-actions';
import {
  WS_CONNECTION_START,
  WS_SET_ORDERSLIST,
} from '../../services/actions/feed-ws-actions';

const { orders } = ordersStyles;

const OrdersList: FC = () => {
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const allOrdersFromWSFeed = useSelector((state: any) => state.feedWs.orders);
  const allOrdersFromWSOrders = useSelector(
    (state: any) => state.ordersWs.orders
  );
  const isFeed = location.pathname === '/feed';

  const allOrdersFromWS = isFeed ? allOrdersFromWSFeed : allOrdersFromWSOrders;

  const orderAllList = useSelector((state: any) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state: any) => state.ordersWs.ordersArray);
  const orderList = isFeed ? orderAllList : orderPersList;

  const allIngredients = useSelector(
    (state: any) => state.ingredients.listOfIngredients
  );

  useEffect(() => {
    if (isFeed) {
      dispatch({ type: WS_CONNECTION_START });
    } else {
      dispatch({ type: WS_CONNECTION_ORD_START });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (allOrdersFromWS) {
      const allOrdersArray = JSON.parse(allOrdersFromWS).orders;
      const allOrdersWithIngredients = makeOrderIngredientsFull(allOrdersArray);
      if (isFeed) {
        dispatch({
          type: WS_SET_ORDERSLIST,
          payload: allOrdersWithIngredients,
        });
      } else {
        dispatch({
          type: WS_SET_ORD_ORDERSLIST,
          payload: allOrdersWithIngredients,
        });
      }
    }
  }, [allOrdersFromWS]);

  function makeOrderIngredientsFull(
    orders: Array<TOrder>
  ): Array<TOrderWithIngredients> {
    return orders.map((order) => {
      let finalIngredients: TIngredient[] = [];
      order.ingredients.forEach((ingredient: string, ind: number) => {
        finalIngredients[ind] = allIngredients.find(
          (item2: TIngredient) => item2._id === ingredient
        );
      });

      return {
        ...order,
        ingredients: finalIngredients,
      };
    });
  }

  return (
    <div className={`${orders} pr-2`}>
      {orderList.map((item: TOrderWithIngredients, ind: number) => (
        <Order key={ind} item={item} />
      ))}
    </div>
  );
};

export default OrdersList;
