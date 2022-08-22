import React, { FC, useEffect, useState } from 'react';
import appStyles from '../components/app/app.module.css';
import OrdersList from '../components/orders-list/orders-list';
import feedStyles from './feed.module.css';
import { numberslist } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_GET_ORDERS, WS_SET_ORDERSLIST } 
from '../services/actions/socket-actions';
import { useSelector } from 'react-redux';
import { TIngredient, TOrder, TOrderWithIngredients } from '../utils/types';
import orderDetails from '../components/order-details/order-details.module.css';

const {
  section,
  numberOrdersList,
  numberOrderItem,
  numbersShown,
  feedSection,
  mainTitle,
  par,
  numberOrderItemPending
} = feedStyles;

const { main, ingredients, section_flex } = appStyles;

type TNumbers = {
  title: string;
  number: number;
};

const Numbers: FC<TNumbers> = ({ title, number }) => {
  return (
    <div className={numbersShown}>
      <p className={`${par} text text_type_main-medium pb-6`}>{title}</p>
      <p className={`text text_type_digits-large ${orderDetails.digits} ${feedStyles.number}`}>{number}</p>
    </div>
  );
};

const Feed: FC = () => {
  const dispatch = useDispatch();

  const wsconnected = useSelector((state: any) => {
   
    return state.ws.wsConnected;});

    const allIngredients = useSelector((state: any) => state.ingredients.listOfIngredients);

    const allOrdersFromWS = useSelector((state: any) => {
      // console.log(state.ws);
      return state.ws.orders;});

      const allOrdersFromWSArray = useSelector((state: any) => {
        // console.log(state.ws);
        return state.ws.ordersArray;});

      const [allorders, setAllOrders] = React.useState([]);

    //const editedOrders = JSON.parse(allOrdersFromWS) || {};

    // console.log('only line: ', allOrdersFromWS);
    // console.log(' all ord pars: ', allorders);

    useEffect(() => {
      dispatch({type: WS_CONNECTION_START});      
      if (wsconnected) {
      dispatch({type: WS_CONNECTION_SUCCESS});
      dispatch({type: WS_GET_ORDERS  });
      
    } else {
      dispatch({type: WS_CONNECTION_ERROR});
    }
      /* if (allOrdersFromWS ) { 
        console.log('all orders exist: ', allOrdersFromWS);
       
        setAllOrders(allOrders1);
        console.log('allOrders: ', allOrders1);

      } else {
        dispatch({type: WS_CONNECTION_ERROR});
      } */
  
    },[wsconnected]);
    
    const [total, setTotal] = useState<number>(0);    
    const [totalToday, setTotalToday] = useState<number>(0);


    useEffect(() => {
      // console.log('all ord ws: ', allOrdersFromWS);
      if (allOrdersFromWS) {
        // console.log('all ord ws If exist: ', allOrdersFromWS);
      const allOrders1 = JSON.parse(allOrdersFromWS).orders;
      const allOrders2 = makeOrderIngredientsFull(allOrders1);
      // console.log('all orders1: ', allOrders2);тут уже финальные 
      dispatch({type: WS_SET_ORDERSLIST, payload: allOrders2});    

      setTotal(JSON.parse(allOrdersFromWS).total);
      setTotalToday(JSON.parse(allOrdersFromWS).totalToday);
    }


      
    },[allOrdersFromWS]);

    const [numbersDone, setNumbersDone] = useState<Array<number>>([0]);
    const [numbersPending, setNumbersPending] = useState<Array<number>>([0]);

    function makeOrderNumbers(status : string) : Array<number> {
      return allOrdersFromWSArray.map((order : TOrderWithIngredients) => {
        if (order.status === status) {
        return order.number;
        } else return;
      });
    }

    useEffect(() => {
      if (allOrdersFromWSArray) {
        setNumbersDone(makeOrderNumbers('done').slice(0,20));
        setNumbersPending(makeOrderNumbers('pending').slice(0,20));
      }

    }, [allOrdersFromWSArray]);

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
    }

  return (
    <>
      <main
        className={`${main} mb-10`}
        style={{
          flexDirection: 'column',
        }}
      >
        <h1 className={mainTitle}>Лента заказов</h1>
        <div style ={{display: 'flex'}}>
        <section
          className={`mr-10} ${ingredients} ${section_flex} ${feedStyles.ordersList}`}
        >
          <OrdersList />
        </section>
        <section className={`${feedSection}`}>
          <div style={{ display: 'flex', margin: '0 0 60px 0' }}>
            <div className={`${section} mr-9`}>
              <p className={`${par} text text_type_main-medium pb-6`}>Готовы:</p>
              <ul className={numberOrdersList}>
                {numbersDone.map((item: number, ind: number) => (
                  <li key={ind} className={`${numberOrderItem} text text_type_digits-default`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={section}>
              <p className={`${par} text text_type_main-medium pb-6`}>В работе: </p>
              <div className={numberOrdersList}>
              {numbersPending.map((item: number, ind: number) => (
                  <li key={ind} className={`${numberOrderItemPending} text text_type_digits-default`}>
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>
          <Numbers title='Выполнено за всё время: ' number={total} />
          <Numbers title='Выполнено за сегодня: ' number={totalToday} />
        </section>
        </div>
      </main>
      
    </>
  );
};
export default Feed;
