  import {
   GET_ORDERDATA_SUCCESS,
   GET_ORDERDATA_REQUEST,
   GET_ORDERDATA_FAILURE,
} from "../actions";
import api from "../../utils/api";

export function fetchOrderNumber(ingredientsInOrder) {
  
  return (dispatch, getState) => {
    dispatch({
      type: GET_ORDERDATA_REQUEST,
    });

    api
      .makeOrder({ ingredients: ingredientsInOrder })
      .then((res) => {
        //setIsPerformed(!isPerformed);
        console.log('list', res);
        dispatch({
          type: GET_ORDERDATA_SUCCESS,
          createdOrder: {
            number: res.order.number,
            positions: ingredientsInOrder,
          },
        });
        //setOrderNumber(res.order.number);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
            type: GET_ORDERDATA_FAILURE,
          });
      });
  };
}
