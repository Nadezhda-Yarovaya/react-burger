import {
  SET_ALLINGREDIENTS_REQUEST,
  SET_ALLINGREDIENTS_SUCCESS,
  SET_ALLINGREDIENTS_FAILURE,
} from '../actions';
import { getIngredients } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import { AppDispatch } from '../..';

export function fetchAllIngredients(): AppThunk {
  return (dispatch: AppDispatch, getState) => {
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
