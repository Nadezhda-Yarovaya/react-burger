import {
  SET_ALLINGREDIENTS_REQUEST,
  SET_ALLINGREDIENTS_SUCCESS,
  SET_ALLINGREDIENTS_FAILURE,
} from '../actions';
import { getIngredients } from '../../utils/api';

export function fetchAllIngredients() {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ALLINGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        dispatch({
          type: SET_ALLINGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ALLINGREDIENTS_FAILURE,
        });
      });
  };
}
