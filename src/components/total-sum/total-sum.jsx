import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import totalSumStyles from './total-sum.module.css';

import currencyBig from '../../images/currency36x36.svg';

const { container, sum } = totalSumStyles;

function TotalSum(props) {
  const {
    handleToggleIfMobile,
    isMobileOrdered,
    buttonSize,
    isMobile,
    handlePerformOrder,
    totalSumOrder,
  } = props;

  return (
    <div className={`pr-4 mt-10 ${container}`}>
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
        size={buttonSize}
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
  buttonSize: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  handlePerformOrder: PropTypes.func.isRequired,
  totalSumOrder: PropTypes.number.isRequired,
};

export default TotalSum;
