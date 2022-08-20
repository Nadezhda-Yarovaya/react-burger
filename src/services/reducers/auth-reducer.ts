import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER,
  SET_LOGGED,
  SET_LOGGEDOUT,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE
} from "../actions";

import type { TAuthActions } from '../../utils/auth-types';

const initialState = {
  user: { email: "", name: "" },
  isLogged: false,
  apiData: {message: '', success: false},
};

export function authReducer(state = initialState, action: TAuthActions) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
  user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    case SET_LOGGEDOUT:
      return {
        ...state,
        isLogged: false,
      };
      case SHOW_APIMESSAGE: 
      return {
        ...state,
        apiData: action.payload,
      };
      case CLEAR_APIMESSAGE:
        return {
          ...state,
          apiData: initialState.apiData
        }

    default:
      return state;
  }
}
