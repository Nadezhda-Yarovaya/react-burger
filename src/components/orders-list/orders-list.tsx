import React, { FC, useEffect } from 'react';
import {
  firstIngred,
  TIngredient,
  TLocation,
  TOrder,
  TOrderWithIngredients,
} from '../../utils/types';
import Order from '../order/order';
import ordersStyles from './orders-list.module.css';

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

const { orders } = ordersStyles;

const OrdersList: FC = () => {
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const allOrdersFromWSFeed = useSelector((state) => state.feedWs.orders);
  const allOrdersFromWSOrders = useSelector((state) => state.ordersWs.orders);
  const isFeed = location.pathname === '/feed';

  const allOrdersFromWS = isFeed ? allOrdersFromWSFeed : allOrdersFromWSOrders;

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);
  const orderList = isFeed ? orderAllList : orderPersList;

  const allIngredients = useSelector(
    (state) => state.ingredients.listOfIngredients
  );

  useEffect(() => {
    if (isFeed) {
      dispatch({ type: WS_CONNECTION_START });
    } else {
      dispatch({ type: WS_CONNECTION_ORD_START });
    }
  }, [location.pathname]);

  useEffect(() => {
    function makeIngredients(arrayStrings : Array<string>) : Array<TIngredient | undefined> {    
  
   return arrayStrings.map((ingredient: string) => {
     return allIngredients.find(
       (item2: TIngredient) => item2._id === ingredient
     );    
   });
     
     }
   
     function makeOrderIngredientsFull(
       orders: Array<TOrder>
     ): Array<TOrderWithIngredients> {
       return orders.map(order => {
        const finalIngredients = makeIngredients(order.ingredients);
        //console.log('final ingred: ', finalIngredients);
   
         return {
           ...order,
           ingredients: finalIngredients,
         };
       });
     }

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
  
  }, [allOrdersFromWS, allIngredients]);

  

  return (
    <div className={`${orders} pr-2`}>
      {orderList
        ? orderList.map((item: TOrderWithIngredients, ind: number) => (
            <Order key={ind} item={item} />
          ))
        : ''}
    </div>
  );
};

export default OrdersList;
