import React, { FC, useEffect } from 'react';
import ordersStyles from './orders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../../services/selectors';
import PersonalMenu from '../../../components/personal-menu/personal-menu';
import initialTempOrderList from '../../../utils/tempdata';
import Order from '../../../components/order/order';
import { SET_POSITIONSDATA } from '../../../services/actions';

const { container, orders, maintitle } = ordersStyles;

const Orders: FC = () => {
  const dispatch = useDispatch();

  const allIngredients = useSelector(getAllIngredients);

  const orderList = useSelector((state: any) => state.order.orderFullList);
  type TList = {};

  return (
    <>
      <div className={container}>
        <PersonalMenu />
        <div className={`${orders} pr-2`}>
          <p className={maintitle}>История заказов</p>
        </div>{' '}
      </div>
    </>
  );
};

export default Orders;
