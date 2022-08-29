import { FC, useEffect, useMemo } from 'react';
import { TLocation, TOrder } from '../../utils/types';

import { useLocation } from 'react-router-dom';

import { WS_SET_ORD_ORDERSLIST } from '../../services/actions/orders-ws-actions';
import { WS_SET_ORDERSLIST } from '../../services/actions/feed-ws-actions';
import { useDispatch, useSelector } from '../../hooks/hooks';

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

  const allOrdersFromWSFeed = useSelector((state) => state.feedWs.orders);
  const allOrdersFromWSOrders = useSelector((state) => state.ordersWs.orders);

  if (isFeed) {
    allOrdersFromWS = allOrdersFromWSFeed;
  }
  if (isOrders) {
    allOrdersFromWS = allOrdersFromWSOrders;
  }

  const allIngredients = useSelector(
    (state) => state.ingredients.listOfIngredients
  );

  useEffect(() => {
    function makeIngredients(arrayStrings: Array<string>) {
      let newArrayWithData = [];
      let iteration = 0;
      let previousPositions: Array<string> = [];

      // формирую список с количеством каждого ингредиента
      for (let i = 0; i < arrayStrings.length; i++) {
        let count = 0;
        const current = arrayStrings[i];

        if (previousPositions.includes(current)) {
        } else {
          for (let y = 0; y < arrayStrings.length; y++) {
            if (arrayStrings[y] === current) {
              count++;
            }
          }
          newArrayWithData[iteration] = {
            _id: current,
            qty: count,
          };
          iteration++;
        }
        previousPositions[i] = current;
      }

      const arrayOfIngredients = newArrayWithData.map((ingredient) => {
        if (allIngredients) {
          const newr = {
            ...allIngredients.find(
              (ingredientInArray) => ingredientInArray._id === ingredient._id
            ),
            qty: ingredient.qty,
          };
          return newr;
        }
        return {};
      });
      return arrayOfIngredients;
    }

    if (allOrdersFromWS) {
      const allOrdersArray: Array<TOrder> = JSON.parse(allOrdersFromWS).orders;
      if (allOrdersArray) {
        const allOrdersWithIngredients = allOrdersArray.map((order) => {
          const finalIngredients = makeIngredients(order.ingredients);

          return {
            ...order,
            ingredients: finalIngredients,
          };
        });

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
