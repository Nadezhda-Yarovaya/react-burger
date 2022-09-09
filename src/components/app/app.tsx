import { FunctionComponent, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useWindowSize } from '../../hooks/resize';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { fetchAllIngredients } from '../../services/action-creators/ingredients-action-creators'; // требует типизации типа
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import appStyles from './app.module.css';

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
import IngredientPage from '../../pages/ingredient-page';
import { TLocation } from '../../utils/types';
import ResetPassword from '../../pages/reset-password';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { firstIngred } from '../../utils/utils';
import FeedId from '../../pages/feed-id';
import IndividualOrder from '../individul-order/individual-order';
const { page } = appStyles;

const App: FunctionComponent = () => {
  const [width, height] = useWindowSize();

  const dispatch = useDispatch();
  const history = useHistory();
  const isPerformed = useSelector((state) => state.order.isPerformed);
  const location = useLocation<TLocation>();
  const isMobileMenuOpened = useSelector(
    (state) => state.mobile.isMobileMenuOpened
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
            {locateModal ? <Main /> : <IngredientPage />}
          </Route>

          <Route path='/feed' exact>
            <Feed />
          </Route>

          <Route path='/feed/:id' exact>
            {locateFeedModal ? <Feed /> : <FeedId />}
          </Route>

          <ProtectedRouteLogged path='/profile/orders' exact>
            <Orders />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path='/profile/orders/:id' exact>
            {locateProfileOrdersModal ? <Orders /> : <OrdersId />}
          </ProtectedRouteLogged>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
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
          <Modal closeModal={closeModalIngredientsShown} isOpen={true}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {locateFeedModal && (
        <Route path='/feed/:id'>
          <Modal closeModal={closeModalFromFeed} isOpen={true}>
            <IndividualOrder />
          </Modal>
        </Route>
      )}
      {locateProfileOrdersModal && (
        <Route path='/profile/orders/:id'>
          <Modal closeModal={closeModalFromProileOrders} isOpen={true}>
            <IndividualOrder />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
