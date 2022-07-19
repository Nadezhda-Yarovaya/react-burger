import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import totalSumStyles from './total-sum.module.css';

import currencyBig from '../../images/currency36x36.svg';

import { useSelector } from 'react-redux';
import { ifItsMobile } from '../../services/selectors';
import TotalSumButton from '../total-sum-button/total-sum-button';

const { container, sum, button_visible, button_hidden } = totalSumStyles;

function TotalSum(props) {
  const { handleToggleIfMobile, handlePerformOrder } = props;

  const stuffingsList = useSelector(
    (state) => state.dragAndDrop.droppedElements
  );
  const bunSelected = useSelector((state) => state.ingredients.bun);

  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);

  const totalSumOrder = useSelector((store) => store.order.totalSum);

  const isMobile = useSelector(ifItsMobile);

  const isDisabled = stuffingsList.length === 0 || bunSelected._id === '1';

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
      {isMobile ? (
        <>
          <div className={isMobileOrdered ? button_hidden : button_visible}>
            <Button type='primary' size='small' onClick={handleToggleIfMobile}>
              Смотреть заказ
            </Button>
          </div>
          <div className={isMobileOrdered ? button_visible : button_hidden}>
            <TotalSumButton
              size='small'
              handleClick={handlePerformOrder}
              btnText='Оформить'
              isDisabled={isDisabled}
            />
          </div>
        </>
      ) : (
        <TotalSumButton
          size='large'
          handleClick={handlePerformOrder}
          btnText='Оформить заказ'
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
}

TotalSum.propTypes = {
  handleToggleIfMobile: PropTypes.func.isRequired,
  handlePerformOrder: PropTypes.func.isRequired,
};

export default TotalSum;
