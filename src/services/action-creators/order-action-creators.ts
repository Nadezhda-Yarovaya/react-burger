import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
} from '../actions';
import { makeOrderWithToken } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import { getCookie, refreshToken, setCookie } from '../../utils/auth';
import { WS_CONNECTION_ORD_START } from '../actions/orders-ws-actions';

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
        return dispatch(
          handleRefreshTokenInOrder(
            refreshSaved,
            handlePlaceOrder,
            ingredientsInOrder
          )
        );
      }
    }
  };

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

export const handleRefreshTokenInOrder =
  (
    refeshSaved: string,
    handlePlaceOrder: (
      ingredientsInOrder: Array<string>,
      accessToken: string
    ) => AppThunk,
    ingredientsInOrder: Array<string>
  ): AppThunk =>
  (dispatch) => {
    refreshToken(refeshSaved).then((res) => {
      localStorage.removeItem('refreshToken');
      localStorage.setItem('refreshToken', res.refreshToken);
      let authToken;
      authToken = res.accessToken.split('Bearer ')[1];
      if (authToken) {
        setCookie('token', authToken, { expires: 1 }); // expires in minutes
      }

      return dispatch(handlePlaceOrder(ingredientsInOrder, authToken));
    });
  };

const baseUrl = 'wss://norma.nomoreparties.space/orders';

export const loadOrders = (): AppThunk => (dispatch) => {
  const accessToken = getCookie('token');

  if (accessToken) {
    return dispatch(handleLoadOrders(accessToken));
  } else {
    const refreshSaved = localStorage.getItem('refreshToken');
    if (refreshSaved) {
      return dispatch(
        handleRefreshTokenInLoadOrders(refreshSaved, handleLoadOrders)
      );
    }
  }
};

const handleLoadOrders =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    dispatch({
      type: WS_CONNECTION_ORD_START,
      payload: `${baseUrl}?token=${accessToken}`,
    });
  };

export const handleRefreshTokenInLoadOrders =
  (
    refeshSaved: string,
    handleLoadOrders: (accessToken: string) => AppThunk
  ): AppThunk =>
  (dispatch) => {
    refreshToken(refeshSaved).then((res) => {
      localStorage.removeItem('refreshToken');
      localStorage.setItem('refreshToken', res.refreshToken);
      let authToken;
      authToken = res.accessToken.split('Bearer ')[1];
      if (authToken) {
        setCookie('token', authToken, { expires: 1 }); // expires in minutes
      }

      return dispatch(handleLoadOrders(authToken));
    });
  };
