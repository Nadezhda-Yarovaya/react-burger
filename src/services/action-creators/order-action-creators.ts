import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
} from '../actions';
import { makeOrderWithToken } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import { AppDispatch } from '../..';
import { getCookie } from '../../utils/auth';

export const placeOrder =
  (ingredientsInOrder: Array<string>): AppThunk =>
  (dispatch: AppDispatch, getState) => {
    dispatch({
      type: GET_ORDERDATA_REQUEST,
    });

    const accessToken = getCookie('token');

    if (accessToken) {
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
    }
  };
