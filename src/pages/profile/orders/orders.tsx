import { FC } from 'react';
import ordersStyles from './orders.module.css';
import PersonalMenu from '../../../components/personal-menu/personal-menu';
import OrdersList from '../../../components/orders-list/orders-list';
import { TPropsFormatDate } from '../../../utils/types';

const Orders: FC<TPropsFormatDate> = ({formatDate}) => {
  return (
    <div className={ordersStyles.container}>
      <PersonalMenu />
      <OrdersList formatDate={formatDate}/>
    </div>
  );
};

export default Orders;
