import { FC, useEffect, useMemo } from 'react';
import {
  TIngredient,
  TLocation,
  TOrder,
  TOrderWithIngredients,
} from '../../utils/types';

import { useLocation } from 'react-router-dom';

import {
  WS_CONNECTION_ORD_START,
  WS_SET_ORD_ORDERSLIST,
} from '../../services/actions/orders-ws-actions';
import {
  WS_CONNECTION_START,
  WS_SET_ORDERSLIST,
} from '../../services/actions/feed-ws-actions';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { initialElement } from '../../utils/utils';

type TOrdersDataWrapperProps = {
  children: React.ReactNode;
};

const OrdersDataWrapper: FC<TOrdersDataWrapperProps> = ({ children }) => {
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const isFeed = location.pathname.includes('/feed');
  const isOrders = location.pathname.includes('/orders');
  let allOrdersFromWS: string | undefined = useMemo(() => {
    return '';
  }, []);
  let orderList: TOrderWithIngredients[] | undefined = useMemo(() => {
    return [initialElement];
  }, []);

  const allOrdersFromWSFeed = useSelector((state) => state.feedWs.orders);
  const allOrdersFromWSOrders = useSelector((state) => state.ordersWs.orders);
  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);

  if (isFeed) {
    allOrdersFromWS = allOrdersFromWSFeed;
    orderList = orderAllList;
  }
  if (isOrders) {
    allOrdersFromWS = allOrdersFromWSOrders;
    orderList = orderPersList;
  }

  const allIngredients = useSelector(
    (state) => state.ingredients.listOfIngredients
  );

  useEffect(() => {
    if (isFeed) {
      dispatch({ type: WS_CONNECTION_START });
    } else if (isOrders) {
      dispatch({ type: WS_CONNECTION_ORD_START });
    }
  }, [isFeed, isOrders, dispatch]);

  useEffect(() => {
    function makeIngredients(
      arrayStrings: Array<string>
    ): Array<TIngredient | undefined> {
      return arrayStrings.map((ingredient: string) => {
        return allIngredients.find(
          (item2: TIngredient) => item2._id === ingredient
        );
      });
    }

    function makeOrderIngredientsFull(
      orders: Array<TOrder>
    ): Array<TOrderWithIngredients> {
      return orders.map((order) => {
        const finalIngredients = makeIngredients(order.ingredients);

        return {
          ...order,
          ingredients: finalIngredients,
        };
      });
    }

    if (allOrdersFromWS) {
      const allOrdersArray = JSON.parse(allOrdersFromWS).orders;
      if (allOrdersArray) {
        const allOrdersWithIngredients =
          makeOrderIngredientsFull(allOrdersArray);
        if (isFeed) {
          dispatch({
            type: WS_SET_ORDERSLIST,
            payload: allOrdersWithIngredients,
          });
        }
        if (isOrders) {
          dispatch({
            type: WS_SET_ORD_ORDERSLIST,
            payload: allOrdersWithIngredients.reverse(),
          });
        }
      }
    }
  }, [allOrdersFromWS, allIngredients, isFeed, isOrders, dispatch]);

  return <>{children}</>;
};

export default OrdersDataWrapper;
