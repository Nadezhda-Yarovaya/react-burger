import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
} from '../actions';
import { makeOrderWithToken } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import { getCookie, refreshToken, setCookie } from '../../utils/auth';
import { WS_CONNECTION_ORD_START } from '../actions/orders-ws-actions';
import { handleUpdateTokens } from './auth-action-creators';
const baseUrl = 'wss://norma.nomoreparties.space/orders';

/* functions that require RefreshToken */
export const placeOrder =
  (ingredientsInOrder: Array<string>): AppThunk =>
  (dispatch) => {
    dispatch({
      type: GET_ORDERDATA_REQUEST,
    });
    const accessToken = getCookie('token');
    if (accessToken) {
      return dispatch(handlePlaceOrder(ingredientsInOrder, accessToken));
    } else {
      const refreshSaved = localStorage.getItem('refreshToken');
      if (refreshSaved) {
        return dispatch(handleRefreshTokenForPlaceNewOrder(ingredientsInOrder));
      }
    }
  };

export const loadOrders = (): AppThunk => (dispatch) => {
  const accessToken = getCookie('token');

  if (accessToken) {
    console.log('accesstok success load orders: ', accessToken);
    return dispatch(handleLoadOrders(accessToken));
  } else {
    console.log('accesstok fail refreshing token: ', accessToken);
    const refreshSaved = localStorage.getItem('refreshToken');
    console.log('accesstok fail REFRESHSVED: ', refreshSaved);
    if (refreshSaved) {
      return dispatch(handleRefreshTokenInLoadOrders(refreshSaved));
    }
  }
};

/* functions to UpdateToken */
export const handleRefreshTokenForPlaceNewOrder =
  (ingredientsInOrder: Array<string>): AppThunk =>
  (dispatch) => {
    const refreshSaved = localStorage.getItem('refreshToken');
    if (refreshSaved) {
      refreshToken(refreshSaved)
        .then((res) => {
          let authToken = handleUpdateTokens(res.refreshToken, res.accessToken);
          return dispatch(handlePlaceOrder(ingredientsInOrder, authToken));
        })
        .catch((err) => console.log(err));
    }
  };

export const handleRefreshTokenInLoadOrders = (refreshSaved: string): AppThunk => (dispatch) => {
  if (refreshSaved) {
    refreshToken(refreshSaved)
      .then((res) => {
        let authToken = handleUpdateTokens(res.refreshToken, res.accessToken);
        return dispatch(handleLoadOrders(authToken));
      })
      .catch((err) => console.log(err));
  }
};

/* handle functions */
const handlePlaceOrder =
  (ingredientsInOrder: Array<string>, accessToken: string): AppThunk =>
  (dispatch) => {
    makeOrderWithToken(ingredientsInOrder, accessToken)
      .then((res) => {
        dispatch({
          type: GET_ORDERDATA_SUCCESS,
          createdOrder: {
            number: res.order.number,
            positions: ingredientsInOrder,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDERDATA_FAILURE,
        });
      });
  };

const handleLoadOrders =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    dispatch({
      type: WS_CONNECTION_ORD_START,
      payload: `${baseUrl}?token=${accessToken}`,
    });
  };
