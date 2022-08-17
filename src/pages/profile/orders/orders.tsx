import React, { FC } from 'react';
import ordersStyles from './orders.module.css';
import PersonalMenu from '../../../components/personal-menu/personal-menu';
import OrdersList from '../../../components/orders-list/orders-list';

const { container } = ordersStyles;

const Orders: FC = () => {
  return (
    <>
      <div className={container}>
        <PersonalMenu />
        <OrdersList listType='profile' />
      </div>
    </>
  );
};

export default Orders;
