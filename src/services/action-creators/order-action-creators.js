import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
} from '../actions';
import api from '../../utils/api';

export function fetchOrderNumber(ingredientsInOrder) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_ORDERDATA_REQUEST,
    });

    api
      .makeOrder({ ingredients: ingredientsInOrder })
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
}
