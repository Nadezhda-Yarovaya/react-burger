import React, { FC, useEffect, useState } from 'react';
import appStyles from '../components/app/app.module.css';
import OrdersList from '../components/orders-list/orders-list';
import feedStyles from './feed.module.css';
import { numberslist } from '../utils/utils';

import { TOrderWithIngredients, TPropsFormatDate } from '../utils/types';
import orderDetails from '../components/order-details/order-details.module.css';
import { useSelector } from '../hooks/hooks';

const {
  section,
  numberOrdersList,
  numberOrderItem,
  numbersShown,
  feedSection,
  mainTitle,
  par,
  numberOrderItemPending,
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

const Feed: FC<TPropsFormatDate> = ({ formatDate }) => {
  const allOrdersFromWS = useSelector((state) => state.feedWs.orders);
  const allOrdersFromWSArray = useSelector((state) => state.feedWs.ordersArray);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);
  const [numbersDone, setNumbersDone] = useState<Array<number | undefined>>([
    0,
  ]);
  const [numbersPending, setNumbersPending] = useState<
    Array<number | undefined>
  >([0]);

  function makeOrderNumbers(status: string): Array<number | undefined> {
    if (allOrdersFromWSArray) {
      return allOrdersFromWSArray.map((order: TOrderWithIngredients) => {
        if (order.status === status) {
          return order.number;
        } else return undefined;
      });
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
      <main
        className={`${main} mb-10`}
        style={{
          flexDirection: 'column',
        }}
      >
        <h1 className={mainTitle}>Лента заказов</h1>
        <div style={{ display: 'flex' }}>
          <section
            className={`mr-10} ${ingredients} ${section_flex} ${feedStyles.ordersList}`}
          >
            <OrdersList formatDate={formatDate} />
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
                  {numbersPending.map(
                    (item: number | undefined) => (
                      <li
                        key={item}
                        className={`${numberOrderItemPending} text text_type_digits-default`}
                      >
                        {item}
                      </li>
                    )
                  )}
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
