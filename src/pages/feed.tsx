import React, { FC, useEffect, useState } from 'react';
import appStyles from '../components/app/app.module.css';
import OrdersList from '../components/orders-list/orders-list';
import feedStyles from './feed.module.css';
import { numberslist } from '../utils/utils';

import orderDetails from '../components/order-details/order-details.module.css';
import { useDispatch, useSelector } from '../hooks/hooks';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../services/actions/feed-ws-actions';

const {
  section,
  numberOrdersList,
  numberOrderItem,
  numbersShown,
  feedSection,
  mainTitle,
  par,
  numberOrderItemPending,
  feedPage,
  feedContainer,
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
      <p
        className={`text text_type_digits-large ${orderDetails.digits} ${feedStyles.number}`}
      >
        {number}
      </p>
    </div>
  );
};

const Feed: FC = () => {
  const allOrdersFromWS = useSelector((state) => state.feedWs.orders);
  const allOrdersFromWSArray = useSelector((state) => state.feedWs.ordersArray);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
  const [numbersDone, setNumbersDone] = useState<Array<number>>([0]);
  const [numbersPending, setNumbersPending] = useState<Array<number>>([0]);

  const dispatch = useDispatch();

  const baseUrl = 'wss://norma.nomoreparties.space/orders';

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${baseUrl}/all`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  function makeOrderNumbers(status: string): Array<number> {
    if (allOrdersFromWSArray) {
      const temporaryArrayNumbers = allOrdersFromWSArray.map((order) => {
        if (order.status === status) {
          return order.number;
        } else return 0;
      });
      const finalOrderNumbers = temporaryArrayNumbers.filter(
        (item) => item !== 0
      );
      return finalOrderNumbers;
    }
    return numberslist;
  }

  useEffect(() => {
    if (allOrdersFromWS) {
      setTotal(JSON.parse(allOrdersFromWS).total);
      setTotalToday(JSON.parse(allOrdersFromWS).totalToday);
    }
  }, [allOrdersFromWS]);

  useEffect(() => {
    if (allOrdersFromWSArray) {
      setNumbersDone(makeOrderNumbers('done').slice(0, 20));
      setNumbersPending(makeOrderNumbers('pending').slice(0, 20));
    }
  }, [allOrdersFromWSArray]);

  return (
    <>
      <main className={`${main} ${feedPage} mb-10`}>
        <h1 className={mainTitle}>Лента заказов</h1>
        <div className={feedContainer}>
          <section
            className={`mr-10} ${ingredients} ${section_flex} ${feedStyles.ordersList}`}
          >
            <OrdersList />
          </section>
          <section className={`${feedSection}`}>
            <div style={{ display: 'flex', margin: '0 0 60px 0' }}>
              <div className={`${section} mr-9`}>
                <p className={`${par} text text_type_main-medium pb-6`}>
                  Готовы:
                </p>
                <ul className={numberOrdersList}>
                  {numbersDone.map((item) => (
                    <li
                      key={item}
                      className={`${numberOrderItem} text text_type_digits-default`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={section}>
                <p className={`${par} text text_type_main-medium pb-6`}>
                  В работе:{' '}
                </p>
                <div className={numberOrdersList}>
                  {numbersPending.length > 0 &&
                    numbersPending.map((item) => (
                      <li
                        key={item}
                        className={`${numberOrderItemPending} text text_type_digits-default`}
                      >
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
