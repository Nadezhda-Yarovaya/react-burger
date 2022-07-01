import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import totalSumStyles from './total-sum.module.css';

import currencyBig from '../../images/currency36x36.svg';

/* посмотреть, как тотал сам теперь высчитывать "динамически" */

//import { IfMobileContext } from '../../services/app-contexts';
import { useSelector } from 'react-redux';

const { container, sum } = totalSumStyles;

function TotalSum(props) {
  const { handleToggleIfMobile, isMobileOrdered, handlePerformOrder } = props;

  //  const { totalSumOrder } = useContext(TotalSumContext);

  const totalSumOrder = useSelector((store) => {
    //console.log('store:', store);
    return store.totalSum;
  });

  /*
const totalSumOrder ={
totalSum: 2300,
};*/

  const isMobile = useSelector((store) => store.isMobile);

  return (
    <div className={`pr-4 ${container}`}>
      <div className={`${isMobile ? 'mr-3' : 'mr-10'} ${sum}`}>
        <p
          className={`mr-2 text ${
            isMobile ? 'text_type_digits-default' : 'text_type_digits-medium'
          }`}
        >
          {totalSumOrder}
        </p>
        {isMobile ? (
          <CurrencyIcon type='primary' />
        ) : (
          <img src={currencyBig} alt='итого' />
        )}
      </div>
      <Button
        type='primary'
        size={isMobile ? 'small' : 'large'}
        onClick={isMobile ? handleToggleIfMobile : handlePerformOrder}
      >
        {isMobile
          ? isMobileOrdered
            ? 'Оформить'
            : 'Смотреть заказ'
          : 'Оформить заказ'}
      </Button>
    </div>
  );
}

TotalSum.propTypes = {
  handleToggleIfMobile: PropTypes.func.isRequired,
  isMobileOrdered: PropTypes.bool.isRequired,
  handlePerformOrder: PropTypes.func.isRequired,
  //totalSumOrder: PropTypes.number.isRequired,
};

export default TotalSum;
