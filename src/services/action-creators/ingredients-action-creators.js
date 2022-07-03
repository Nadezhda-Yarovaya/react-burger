import { SET_ALLINGREDIENTS_REQUEST, SET_ALLINGREDIENTS_SUCCESS, SET_ALLINGREDIENTS_FAILURE } from "../actions";
import api from '../../utils/api';

export function fetchAllIngredients() {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ALLINGREDIENTS_REQUEST
        });
    api.getIngredients()
    .then((res) => {
      // console.log('res got from middleare: ', res.data);
      dispatch({
        type: SET_ALLINGREDIENTS_SUCCESS,
        payload: res.data,
      });
 })
    .catch((err) => {
      // console.log('Ошибка при соединении с сервером: ', err);
      dispatch({
        type: SET_ALLINGREDIENTS_FAILURE
    });
    });
    };
}