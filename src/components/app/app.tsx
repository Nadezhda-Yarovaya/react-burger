import { FunctionComponent, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useWindowSize } from '../../hooks/resize';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { fetchAllIngredients } from '../../services/action-creators/ingredients-action-creators'; // требует типизации типа
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import appStyles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';

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
import { TLocation } from '../../utils/types';
import ResetPassword from '../../pages/reset-password';

const { page } = appStyles;

const App: FunctionComponent = () => {
  const [width, height] = useWindowSize();

  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch<any>(fetchAllIngredients());
  }, []);

  const isPerformed = useSelector((state: any) => state.order.isPerformed);

  const location = useLocation<TLocation>();

  const isMobileMenuOpened = useSelector(
    (state: any) => state.mobile.isMobileMenuOpened
  );

  function closeIsPerformed() {
    dispatch<any>({
      type: CLEAR_ORDERDATA,
    });

    dispatch<any>({
      type: CLEAR_BUN,
    });

    dispatch<any>({
      type: CLEAR_STUFFINGLIST,
    });
  }

  function closeModalIngredientsShown() {
    dispatch<any>({
      type: REMOVE_CURRENT,
    });

    dispatch<any>({
      type: REMOVE_MODALINGREDIENTS,
    });
    history.goBack();
  }

  const handleSetMobile = () => {
    if (width < 790) {
      dispatch<any>({
        type: SET_IFMOBILE,

        payload: true,
      });
    } else {
      dispatch<any>({
        type: SET_IFMOBILE,

        payload: false,
      });

      dispatch<any>({
        type: SET_IFMOBILEORDERED,

        payload: false,
      });

      if (isMobileMenuOpened) {
        dispatch<any>({
          type: CLOSE_MOBILEMENU,
        });
      }
    }
  };

  const handleSetWindowData = () => {
    dispatch<any>({
      type: SET_WINDOWDATA,
      payload: {
        width: width,
        height: height,
      },
    });
  };

  const locateModal = location?.state && location?.state?.locate;

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

          <ProtectedRouteLogged path='/feed' exact>
            <Feed />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path='/profile/orders' exact>
            <Orders />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path='/profile/orders/:id' exact>
            <OrdersId />
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
    </>
  );
};

export default App;
