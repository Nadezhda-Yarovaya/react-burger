import { useState, useEffect, FC, useMemo } from 'react';
import ordersIdStyles from './orders-id.module.css';
import { useLocation, useParams } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLocation, TOrderWithIngredients } from '../../../utils/types';
import { initialElement } from '../../../utils/utils';
import { useSelector } from '../../../hooks/hooks';
import OrdersDataWrapper from '../../../components/orders-data-wrapper/orders-data-wrapper';

const {
  container,
  box,
  number,
  status,
  list,
  price,
  list__item,
  list__iteminfo,
  list__priceinfo,
  image,
  status_performed,
  footer,
  date,
  list__image,
  list__item2
} = ordersIdStyles;

type OrdersIdProps = {
  formatDate: (item: TOrderWithIngredients) => string;
}

const OrdersId: FC<OrdersIdProps> = ({ formatDate} ) => {
  const [currentOrderShown, setCurrentOrderShown] =
    useState<TOrderWithIngredients>(initialElement);
  const location = useLocation<TLocation>();

  // console.log('current order: ', currentOrderShown);
  const [statusText, setStatusText] = useState<string>('');

  function makeStatus(status: string) {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'created':
        return 'Выполнен';
      case 'pending':
        return 'Создан';
      default:
        return 'Выполнен';
    }
  }

  useEffect(() => {
    setStatusText(makeStatus(currentOrderShown.status));
  }, [currentOrderShown]);


  type TParams = {
    id: string;
  };

  const { id } = useParams<TParams>();

  const isFeed = location.pathname.includes('/feed');
  const isOrders = location.pathname.includes('/orders');
  console.log('location ordId:', location);

  let orderList: TOrderWithIngredients[] | undefined = useMemo(() => {
    return [initialElement];
  }, []);

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersList = useSelector((state) => state.ordersWs.ordersArray);

  if (isFeed) {
    orderList = orderAllList;
  }
  if (isOrders) {
    orderList = orderPersList;
  }

  useEffect(() => {
    if (orderList) {
      const current = orderList.find((item) => item._id === id);
      if (current) {
        setCurrentOrderShown(current);
      }
    }
  }, [id, orderList]);

  const [finalDate, setFinalDate] = useState<string>('');

useEffect(() => {
  setFinalDate(formatDate(currentOrderShown));
},[currentOrderShown]);


  return (
    <OrdersDataWrapper>
      <div className={container}>
        <div className={box}>
          <p className={`${number} text text_type_digits-default mb-10`}>
            #{currentOrderShown.number}
          </p>
          <p className='text text_type_main-medium mb-3'>
            {currentOrderShown.name}
          </p>
          <p
            className={`${status} ${status_performed} text text_type_main-default`}
          >
            {statusText}
          </p>
          <p className='text text_type_main-medium mb-6'>Состав :</p>
          <ul className={list}>
            {currentOrderShown.ingredients[0] &&
              currentOrderShown.ingredients.map((element, ind) => (
                <li key={ind} className={list__item}>
                
                  <div className={list__iteminfo}>
                    <div className={list__item2}>
                    <div className={list__image} style={{ backgroundImage: `url('${element!.image}')` }} ></div>
                   {/*} <img
                      src={element!.image}
                      alt={element!.name}
                      className={image}
              /> */}
              </div>
                    <p>{element!.name}</p>
                  </div>
                  <div className={list__priceinfo}>
                    <p className={`${price} text text_type_digits-default`}>
                      1 x {element!.price}
                    </p>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              ))}
          </ul>
          <div className={footer}>
          <p className={date}>{finalDate}</p>
          <div className={list__priceinfo}>
                    <p className={`${price} text text_type_digits-default`}>
                      {50}
                    </p>
                    <CurrencyIcon type='primary' />
                  </div>
        </div>

        </div>
        
      </div>
    </OrdersDataWrapper>
  );
};

export default OrdersId;
