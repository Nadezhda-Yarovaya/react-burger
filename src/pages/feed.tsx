import React, { FC, useEffect } from 'react';
import appStyles from '../components/app/app.module.css';
import OrdersList from '../components/orders-list/orders-list';
import feedStyles from './feed.module.css';
import { numberslist } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_GET_ORDERS } from '../services/action-types/socket-action-types';
import { useSelector } from 'react-redux';

const {
  section,
  numberOrdersList,
  numberOrderItem,
  numbersShown,
  feedSection,
  mainTitle,
} = feedStyles;

const { main, ingredients, section_flex } = appStyles;

type TNumbers = {
  title: string;
  number: number;
};

const Numbers: FC<TNumbers> = ({ title, number }) => {
  return (
    <div className={numbersShown}>
      <p>{title}</p>
      <p>{number}</p>
    </div>
  );
};



const Feed: FC = () => {
  const dispatch = useDispatch();

  const wsconnected = useSelector((state: any) => {
    console.log(state.ws);
    return state.ws.wsConnected;});

    const allOrdersFromWS = useSelector((state: any) => {
      return state.ws.orders;});

      const [allorders, setAllOrders] = React.useState([]);

    //const editedOrders = JSON.parse(allOrdersFromWS) || {};

    // console.log('only line: ', allOrdersFromWS);
    console.log(' all ord pars: ', allorders);

    useEffect(() => {
      dispatch({type: WS_CONNECTION_START});
      
      if (wsconnected) {
      dispatch({type: WS_CONNECTION_SUCCESS});
      dispatch({type: WS_GET_ORDERS  });
      console.log('all ord ws: ', allOrdersFromWS);
      if (allOrdersFromWS ) { setAllOrders(JSON.parse(allOrdersFromWS).orders);}
      } else {
        dispatch({type: WS_CONNECTION_ERROR});
      }
  
    },[wsconnected]);

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
          <OrdersList listType='feed' />
        </section>
        <section className={`${feedSection}`}>
          <div style={{ display: 'flex' }}>
            <div className={section}>
              <p>Готовы:</p>
              <ul className={numberOrdersList}>
                {numberslist.map((item: number, ind: number) => (
                  <li key={ind} className={numberOrderItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={section}>
              <p>Готовятся: </p>
              <div className={numberOrdersList}></div>
            </div>
          </div>
          <Numbers title='Выполнено за всё время: ' number={45526} />
          <Numbers title='Выполнено за сегодня: ' number={120} />
        </section>
        </div>
      </main>
      
    </>
  );
};
export default Feed;
