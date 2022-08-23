import React, { FC, useEffect } from 'react';
import ordersStyles from './orders.module.css';
import PersonalMenu from '../../../components/personal-menu/personal-menu';
import OrdersList from '../../../components/orders-list/orders-list';
import { WS_CONNECTION_ORD_START, WS_SET_ORD_ORDERSLIST } from '../../../services/actions/orders-ws-actions';
import { useDispatch, useSelector } from '../../../hooks/hooks';
import { TIngredient, TOrder, TOrderWithIngredients } from '../../../utils/types';

const { container } = ordersStyles;

const Orders: FC = () => {
   // const dispatch = useDispatch();

  // const allIngredients = useSelector((state: any) => state.ingredients.listOfIngredients);

  /*
  const thisOrders = useSelector((state: any) => {
    console.log('state: ', state);
    return state.ordersWs.orders;
  });
  
    useEffect(() => {
    dispatch({ type: WS_CONNECTION_ORD_START });
  }, []);*/

  // console.log('thisOrd: ', thisOrders);



/*
  
  const allOrdersFromWS = useSelector((state: any) => {
    // console.log(state.feedWs);
    return state.ordersWs.orders;});
  
  useEffect(() => {
    // console.log('all ord ws: ', allOrdersFromWS);
    if (allOrdersFromWS) {
    // console.log('all ord ws If exist: ', allOrdersFromWS);
    const allOrders1 = JSON.parse(allOrdersFromWS).orders;
    const allOrders2 = makeOrderIngredientsFull(allOrders1);
     //console.log('all orders1: ', allOrders2); //тут уже финальные 
    dispatch({type: WS_SET_ORD_ORDERSLIST, payload: allOrders2});    
  }


    
  },[allOrdersFromWS]);


  function makeOrderIngredientsFull(orders: Array<TOrder>) : Array<TOrderWithIngredients> {
    return orders.map((order) => {
      let finalIngredients: TIngredient[] = [];
      order.ingredients.forEach((ingredient : string,ind: number) => {
        finalIngredients[ind] = allIngredients.find((item2: TIngredient) => item2._id === ingredient);
        });
    
      return {
        ...order,
        ingredients: finalIngredients,
      }
    })
        } */

  return (
    <>
      <div className={container}>
        <PersonalMenu />
        <OrdersList />
      </div>
    </>
  );
};

export default Orders;
