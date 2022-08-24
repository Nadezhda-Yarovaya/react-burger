import { FunctionComponent, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useWindowSize } from '../../hooks/resize';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { fetchAllIngredients } from '../../services/action-creators/ingredients-action-creators'; // требует типизации типа
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import appStyles from './app.module.css';
import { SET_POSITIONSDATA } from '../../services/actions';

import {
  SET_IFMOBILE,
  REMOVE_CURRENT,
  CLEAR_ORDERDATA,
  SET_IFMOBILEORDERED,
  REMOVE_MODALINGREDIENTS,
  CLOSE_MOBILEMENU,
  SET_WINDOWDATA,
  CLEAR_BUN,
  CLEAR_STUFFINGLIST,
  SET_LOGGED,
} from '../../services/actions';

import Main from '../../pages/main';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import Profile from '../../pages/profile/profile';
import NotFound from '../../pages/not-found';
import Orders from '../../pages/profile/orders/orders';
import Feed from '../../pages/feed';
import OrdersId from '../../pages/profile/orders-id/orders-id';
import ProtectedRouteLogged from '../protected-route-logged/protected-route-logged';
import ProtectedRouteNotLogged from '../protected-route-not-logged/protected-route-not-logged';
import ProtectedPass from '../protected-pass/protected-pass';
import IngredientPage from '../ingredient-page/ingredient-page';
import {
  TLocation,
  TIngredient,
  TOrderWithIngredients,
  TOrder,
} from '../../utils/types';
import ResetPassword from '../../pages/reset-password';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { firstIngred, firstorderString } from '../../utils/utils';

const { page } = appStyles;

const App: FunctionComponent = () => {
  const [width, height] = useWindowSize();

  const dispatch = useDispatch();
  const history = useHistory();
  const tempOrderslist: Array<TOrder> = [firstorderString];

  const allIngredients = useSelector(
    (state) => state.ingredients.listOfIngredients
  );

  useEffect(() => {
    handleSetMobile();
    handleSetWindowData();
  }, [width, height]);

  useEffect(() => {
    const tokenExists = localStorage.getItem('refreshToken');
    if (tokenExists) {
      dispatch({
        type: SET_LOGGED,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, []);

  useEffect(() => {
    if (allIngredients[0].name) {
      const filteredTempOrdersList = newListAfterFilter(tempOrderslist);
      dispatch({
        type: SET_POSITIONSDATA,
        payload: filteredTempOrdersList,
      });
    }
  }, [allIngredients]);

  const newListAfterFilter = (
    arr1: Array<TOrder>
  ): Array<TOrderWithIngredients> => {
    return arr1.map((item) => {
      const newPositions = item.ingredients.map((elementId) => {
        const newArrayItem = allIngredients.find(
          (ingredient: TIngredient) => ingredient._id === elementId
        );

        if (newArrayItem) {
          return newArrayItem;
        }
        return firstIngred;
      });

      return {
        ...item,
        ingredients: newPositions,
      };
    });
  };

  const isPerformed = useSelector((state) => state.order.isPerformed);

  const location = useLocation<TLocation>();

  const isMobileMenuOpened = useSelector(
    (state) => state.mobile.isMobileMenuOpened
  );

  function closeIsPerformed() {
    dispatch({
      type: CLEAR_ORDERDATA,
    });

    dispatch({
      type: CLEAR_BUN,
    });

    dispatch({
      type: CLEAR_STUFFINGLIST,
    });
  }

  function closeModalIngredientsShown() {
    history.goBack();
    dispatch({
      type: REMOVE_CURRENT,
      currentIngredient: firstIngred,
    });

    dispatch({
      type: REMOVE_MODALINGREDIENTS,
    });
  }

  const handleSetMobile = () => {
    if (width < 790) {
      dispatch({
        type: SET_IFMOBILE,

        payload: true,
      });
    } else {
      dispatch({
        type: SET_IFMOBILE,

        payload: false,
      });

      dispatch({
        type: SET_IFMOBILEORDERED,

        payload: false,
      });

      if (isMobileMenuOpened) {
        dispatch({
          type: CLOSE_MOBILEMENU,
        });
      }
    }
  };

  const formatDate = (item: TOrderWithIngredients): string => {
    const orderDate = new Date(item.createdAt);
    const today = new Date();
    const daysDiff = Math.round(
      (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)
    );
    const lastDigit = parseInt(daysDiff.toString().slice(-1));
    const howMany =
      daysDiff > 20 && lastDigit === 1
        ? daysDiff + ' день назад'
        : daysDiff + ' дней назад';
    const howManyTwo =
      lastDigit === (2 || 3 || 4) ? daysDiff + ' дня назад' : howMany;
    const isYesterday = daysDiff === 1 ? 'Вчера' : howManyTwo;
    const isOrderOfToday =
      today.toLocaleDateString() === orderDate.toLocaleDateString();
    const dateName = isOrderOfToday ? 'Сегодня' : isYesterday;
    const minutes =
      orderDate.getMinutes() < 10
        ? '0' + orderDate.getMinutes()
        : orderDate.getMinutes();

    const GMTzone = -orderDate.getTimezoneOffset() / 60;
    const signPlusOrMinus = GMTzone > 0 ? '+' : '';
    const finalDate =
      dateName +
      ', ' +
      orderDate.getHours() +
      ':' +
      minutes +
      ' i-GMT' +
      signPlusOrMinus +
      GMTzone;

    return finalDate;
  };

  const handleSetWindowData = () => {
    dispatch({
      type: SET_WINDOWDATA,
      payload: {
        width: width,
        height: height,
      },
    });
  };

  const closeModalFromFeed = () => {
    history.goBack();
  };

  const closeModalFromProileOrders = () => {
    history.goBack();
  };

  const locateModal = location?.state && location?.state?.locate;

  const locateFeedModal = location?.state && location.state?.feedLocate;

  const locateProfileOrdersModal =
    location?.state && location.state?.ordersLocate;

  return (
    <>
      <div className={page}>
        <AppHeader />

        <Switch>
          <Route path='/' exact>
            <Main />{' '}
          </Route>

          <ProtectedRouteNotLogged exact path='/login'>
            <Login />{' '}
          </ProtectedRouteNotLogged>

          <ProtectedRouteNotLogged path='/register' exact>
            <Register />{' '}
          </ProtectedRouteNotLogged>

          <ProtectedRouteNotLogged path='/forgot-password' exact>
            <ForgotPassword />
          </ProtectedRouteNotLogged>

          <ProtectedPass path='/reset-password' exact>
            <ResetPassword />
          </ProtectedPass>

          <ProtectedRouteLogged exact path='/profile'>
            <Profile />
          </ProtectedRouteLogged>

          <Route path='/ingredients/:id' exact>
            <IngredientPage />
          </Route>

          <Route path='/feed' exact>
            <Feed formatDate={formatDate} />
          </Route>

          <Route path='/feed/:id' exact>
            <OrdersId formatDate={formatDate} />
          </Route>

          <ProtectedRouteLogged path='/profile/orders' exact>
            <Orders formatDate={formatDate} />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path='/profile/orders/:id' exact>
            <OrdersId formatDate={formatDate} />
          </ProtectedRouteLogged>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>{' '}
      {isPerformed ? (
        <Modal
          closeModal={closeIsPerformed}
          type='orderPerformed'
          isOpen={true}
        >
          <OrderDetails />
        </Modal>
      ) : (
        <></>
      )}
      {locateModal && (
        <Route path='/ingredients/:id'>
          {' '}
          <Modal closeModal={closeModalIngredientsShown} isOpen={true}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {locateFeedModal && (
        <Route path='/feed/:id'>
          {' '}
          <Modal closeModal={closeModalFromFeed} isOpen={true}>
            <OrdersId formatDate={formatDate} />
          </Modal>
        </Route>
      )}
      {locateProfileOrdersModal && (
        <Route path='/profile/orders/:id'>
          {' '}
          <Modal closeModal={closeModalFromProileOrders} isOpen={true}>
            <OrdersId formatDate={formatDate} />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
