import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  GET_USER_REQUEST,
  GET_USER,
  SET_LOGGED,
  SET_LOGGEDOUT,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
} from '../actions';

import type { TAuthActions } from '../action-types/auth-action-types';
import { SET_ACTOKEN } from '../actions/auth-actions';

export type TAuthType = {
  user: {
    email: string;
    name: string;
  };
  isLogged: boolean;
  apiData: { message: string; success: boolean };
  isUserLoding: boolean;
  isRegisterSuccess: boolean;
  isRequestingRegister: boolean;
  err: any;
  actoken: string;
};

export const initialAuthState: TAuthType = {
  user: { email: '', name: '' },
  isLogged: false,
  apiData: { message: '', success: false },
  isUserLoding: false,
  isRegisterSuccess: false,
  isRequestingRegister: false,
  err: {},
  actoken: '',
};

export function authReducer(
  state: TAuthType = initialAuthState,
  action: TAuthActions
): TAuthType {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRequestingRegister: true };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      console.log('success: ', action);
      return {
        ...state,
        isRegisterSuccess: true,
        isRequestingRegister: false,
      };
    }
    case REGISTER_FAILURE:
      return {
        ...state,
        isRequestingRegister: false,
        isRegisterSuccess: false,
        err: action.err,
      };

    case GET_USER_REQUEST:
      return { ...state, isUserLoding: true };
    case GET_USER:
      { console.log('paylod: ', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }

    case SET_LOGGED:
      return {
        ...state,
        isLogged: true,
      };
    case SET_ACTOKEN: {
      console.log('token in reducer: ', action);
        return {
          ...state,
          actoken: action.payload,
        };
      }
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
        apiData: initialAuthState.apiData,
      };

    default:
      return state;
  }
}
