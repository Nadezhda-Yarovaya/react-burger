import { FC, useEffect, useMemo } from 'react';
import {
  TAssignQty,
  TIngredient,
  TIngredientQty,
  TLocation,
  TOrder,
  TOrderWithIngredients,
} from '../../utils/types';

import { useLocation } from 'react-router-dom';

import {
  WS_CONNECTION_ORD_CLOSED,
  WS_SET_ORD_ORDERSLIST,
} from '../../services/actions/orders-ws-actions';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_SET_ORDERSLIST,
} from '../../services/actions/feed-ws-actions';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { firstIngred, firstIngredQty, initialElement } from '../../utils/utils';
import { loadOrders } from '../../services/action-creators/order-action-creators';

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

  const baseUrl = 'wss://norma.nomoreparties.space/orders';
  /*
  useEffect(() => {
    if (isFeed) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `${baseUrl}/all`,
      });
    }
    if (isOrders) {
      dispatch(loadOrders());
    }
/*
    return () => {
      if (isFeed) {
        dispatch({ type: WS_CONNECTION_CLOSED });
      } else if (isOrders) {
        dispatch({ type: WS_CONNECTION_ORD_CLOSED });
      }
    }; 
  }, [isFeed, isOrders, dispatch]);
  */
  // TIngredient | undefined

  useEffect(() => {
    function makeIngredients(
      arrayStrings: Array<string>
    ): Array<TIngredientQty | undefined> {
      let newArrayWithData = [];
      let iteration = 0;
      let previousPositions: Array<string> = [];

      console.log('arraystrings: ', arrayStrings);

      for (let i = 0; i < arrayStrings.length; i++) {
        let count = 0;
        const current = arrayStrings[i];

        if (previousPositions.includes(current)) {
          previousPositions[i] = current;
          continue;
        }
        for (let y = 0; y < arrayStrings.length; y++) {
          if (arrayStrings[y] === current) {
            count++;
          }
        }
        // console.log('current: ', current, ' count: ', count); ну тут вроде пашет
        newArrayWithData[iteration] = {
          _id: current,
          qty: count,
        };
        iteration++;
      }
      console.log('new formed array: ', newArrayWithData);

      /*const similar: arrTT = arrayStrings.reduce((prev: any, cur: any) => {     
        prev[cur] = (prev[cur] || 0) + 1; 
        return prev;
      }, 0);*/
      /*
      const similar = {'sdfsf': 0, 'sdf': 0};

      console.log ('similar: ', similar);

      const similarKeys = Object.keys(similar);
      const similarValues = Object.values(similar);

      let finalKeysValues: Array<TAssignQty> = [];

      similarKeys.forEach((keyId, index) => {
        // console.log('keyId: ', keyId );
        finalKeysValues[index] = {
          _id: keyId,
          qty: similarValues[index],
        }
      });*/

      const arrayOfIngredients = newArrayWithData.map((ingredient) => {
        // console.log('ingredient:', ingredient); // тут id of strings
        if (allIngredients) {
          const newr = {
            ...allIngredients.find(
              (ingredientInArray) => ingredientInArray._id === ingredient._id
            ),
            qty: ingredient.qty,
          };
          return newr;
        }
        return [firstIngredQty];
      });

      return arrayOfIngredients; //ну тут надо добавлять еще количество же )
    }

    function makeOrderIngredientsFull(
      orders: Array<TOrder>
    ): Array<TOrderWithIngredients> {
      const newOrders = orders.map((order) => {
        const finalIngredients = makeIngredients(order.ingredients);

        console.log('finalIngredients: ', finalIngredients);

        return {
          ...order,
          ingredients: finalIngredients,
        };
      });
      console.log('new Ord: ', newOrders);
      return newOrders;
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
