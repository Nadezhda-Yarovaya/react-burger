import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
} from '../actions';
import { makeOrder, makeOrderWithToken } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import { AppDispatch } from '../..';
import { getCookie } from '../../utils/auth';

export const fetchOrderNumber = (ingredientsInOrder : Array<string>): AppThunk =>
   (dispatch : AppDispatch, getState) => {
    dispatch({
      type: GET_ORDERDATA_REQUEST,
    });
    console.log('ingredientsInOrder Make: ', ingredientsInOrder);

    makeOrder(ingredientsInOrder)
      .then((res) => {
        console.log('res FETCH number: ', res);
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


  
export const placeOrder = (ingredientsInOrder : Array<string>): AppThunk =>
(dispatch : AppDispatch, getState) => {
 dispatch({
   type: GET_ORDERDATA_REQUEST,
 });

 const accessToken = getCookie('token');
 console.log('token in place: ', accessToken);
 
 if (accessToken) {
 makeOrderWithToken(ingredientsInOrder, accessToken)
   .then((res) => {
     console.log('res in make Order: ', res);
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
