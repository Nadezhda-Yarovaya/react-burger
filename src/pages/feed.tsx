import React, { FC, useEffect } from 'react';
import appStyles from '../components/app/app.module.css';
import OrdersList from '../components/orders-list/orders-list';
import { TOrdersId } from '../utils/types';
import feedStyles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { numberslist } from '../utils/utils';

const {
  container,
  feed,
  section,
  numberOrdersList,
  numberOrderItem,
  numbersShown,
  feedSection,
} = feedStyles;

const { main, ingredients, constructor, section_notdisplayed, section_flex } =
  appStyles;

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
  // const orderAllList = useSelector((state: any) => state.order.orderFullList);
  return (
    <main className={`${main} mb-10`}>
      <section className={`mr-10} ${ingredients} ${section_flex}`}>
        <OrdersList
          listType='feed'
        />
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
    </main>
  );
};
export default Feed;
