import { FC, useEffect, useState } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import ConstructorList from '../constructor-list/constructor-list';
import { SET_TOTALSUM, SET_IFMOBILEORDERED } from '../../services/actions';
import TotalSum from '../total-sum/total-sum';
import { placeOrder } from '../../services/action-creators/order-action-creators';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/hooks';

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
  const listOfIngredients = useSelector(
    (store) => store.ingredients.listOfIngredients
  );
  const createdStuffingsList = useSelector(
    (store) => store.dragAndDrop.droppedElements
  );
  const isMobile = useSelector((state) => state.mobile.isMobile);
  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);
  const bunSelectedFromStore = useSelector((store) => store.ingredients.bun);
  const isLoading = useSelector((state) => state.ingredients.isLoading);

  const history = useHistory();

  const isLogged = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    if (listOfIngredients) {
      calculateAllPrices(createdStuffingsList);
    }
  }, [bunSelectedFromStore, createdStuffingsList, listOfIngredients]);

  const calculateAllPrices = (stuffings: Array<TIngredient>): void => {
    const allPr1 = stuffings.map((item) => item.price);

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

    createdStuffingsList.forEach((item) => {
      ingredientsFormed.push(item._id);
    });

    ingredientsFormed.push(bunSelectedFromStore._id);
    return ingredientsFormed;
  }

  function handlePerformOrder() {
    const thisOrderList: Array<string> = makeListOfOrder();
    if (isLogged) {
      dispatch(placeOrder(thisOrderList));
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
  const [allIngredForord, setAllingredForOrd] = useState<Array<string>>(['']);

  useEffect(() => {
    setAllingredForOrd(makeListOfOrder());
  }, [createdStuffingsList]);

  const mobileListStyle = isMobileOrdered ? list_displayed : list_notdisplayed;

  const orderNumber = useSelector((store) => store.order.createdOrder.number);
  const email11 = useSelector((store) => store.auth.user.email);

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
                dispatch({
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
