import { FC, useEffect } from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import ConstructorList from '../constructor-list/constructor-list';

import { useSelector, useDispatch } from 'react-redux';

import { SET_TOTALSUM, SET_IFMOBILEORDERED } from '../../services/actions';

import TotalSum from '../total-sum/total-sum';
import { ifItsMobile, loadIngredients } from '../../services/selectors';
import { fetchOrderNumber } from '../../services/action-creators/order-action-creators';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

const {
  constructor__title,
  constructor__order,
  constructor__button,
  list_displayed,
  list_notdisplayed,
  list_flex,
  container,
} = constructorStyles;

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const listOfIngredients = useSelector((store: any) => {
    return store.ingredients.listOfIngredients;
  });
  const createdStuffingsList = useSelector(
    (store: any) => store.dragAndDrop.droppedElements
  );
  const isMobile = useSelector(ifItsMobile);
  const isMobileOrdered = useSelector(
    (store: any) => store.mobile.isMobileOrdered
  );
  const bunSelectedFromStore = useSelector(
    (store: any) => store.ingredients.bun
  );
  const isLoading = useSelector(loadIngredients);

  const history = useHistory();

  const isLogged = useSelector((state: any) => state.auth.isLogged);

  useEffect(() => {
    if (listOfIngredients) {
      calculateAllPrices(createdStuffingsList);
    }
  }, [bunSelectedFromStore, createdStuffingsList, listOfIngredients]);

  const calculateAllPrices = (stuffings: Array<TIngredient>): void => {
    const allPr1 = stuffings.map((item: TIngredient) => item.price);

    const finalNumber =
      allPr1.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) +
      bunSelectedFromStore.price * 2;

    dispatch({ type: SET_TOTALSUM, totalSum: finalNumber });
  };

  function makeListOfOrder() {
    const ingredientsFormed = [];
    ingredientsFormed.push(bunSelectedFromStore._id);

    createdStuffingsList.forEach((item: TIngredient) => {
      ingredientsFormed.push(item._id);
    });

    ingredientsFormed.push(bunSelectedFromStore._id);
    return ingredientsFormed;
  }

  function handlePerformOrder() {
    const thisOrderList: Array<string> = makeListOfOrder();
    if (isLogged) {
      dispatch<any>(fetchOrderNumber(thisOrderList));
    } else {
      localStorage.setItem(
        'listOfOrder',
        JSON.stringify({ list: thisOrderList })
      );
      history.push('/login');
    }
  }

  function handleToggleIfMobile() {
    if (isMobileOrdered) {
      handlePerformOrder();
    }
    dispatch({
      type: SET_IFMOBILEORDERED,
      payload: !isMobileOrdered,
    });
  }

  const mobileListStyle = isMobileOrdered ? list_displayed : list_notdisplayed;

  return (
    <>
      <div
        className={`${container}
    ${isMobile ? mobileListStyle : list_flex}`}
      >
        {isMobile && isMobileOrdered ? (
          <div className={constructor__order}>
            <p className={constructor__title}>Заказ</p>
            <button
              onClick={() => {
                dispatch<any>({
                  type: SET_IFMOBILEORDERED,
                  payload: false,
                });
              }}
              className={constructor__button}
            >
              <CloseIcon type='primary' />
            </button>
          </div>
        ) : (
          <></>
        )}
        <ConstructorList />
      </div>

      {isLoading ? (
        <></>
      ) : (
        <TotalSum
          handleToggleIfMobile={handleToggleIfMobile}
          handlePerformOrder={handlePerformOrder}
        />
      )}
    </>
  );
};

export default BurgerConstructor;