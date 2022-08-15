import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../../utils/typesLibrary';

import totalSumStyles from './total-sum.module.css';

import currencyBig from '../../images/currency36x36.svg';

import { useSelector } from 'react-redux';
import { ifItsMobile } from '../../services/selectors';
import TotalSumButton from '../total-sum-button/total-sum-button';
import { FC } from 'react';

const { container, sum, button_visible, button_hidden } = totalSumStyles;

type TTotalSumProps = {
  handleToggleIfMobile: () => void;
  handlePerformOrder: () => void;
};

const TotalSum: FC<TTotalSumProps> = ({
  handleToggleIfMobile,
  handlePerformOrder,
}) => {
  const stuffingsList = useSelector(
    (state: any) => state.dragAndDrop.droppedElements
  );
  const bunSelected = useSelector((state: any) => state.ingredients.bun);

  const isMobileOrdered = useSelector(
    (store: any) => store.mobile.isMobileOrdered
  );

  const totalSumOrder = useSelector((store: any) => store.order.totalSum);

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
};

export default TotalSum;
