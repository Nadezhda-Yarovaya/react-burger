import {REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,GET_USER
, SET_LOGGED, SET_LOGGEDOUT, SHOW_APIMESSAGE, CLEAR_APIMESSAGE
} from '../services/actions/auth-actions';

type TUser ={
    email: string;
    name: string;
}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
    readonly payload: { user: TUser };
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: { user: TUser };
  }

  
export interface IGetUser {
    readonly type: typeof GET_USER;
    readonly payload: { user: TUser };
  }

  export interface ISetLogged {
    readonly type: typeof SET_LOGGED;
    readonly isLogged: boolean;
  }

  export interface ISetLoggedOut {
    readonly type: typeof SET_LOGGEDOUT;
    readonly isLogged: boolean;
  }

  export interface IShowApiMessage {
    readonly type: typeof SHOW_APIMESSAGE;
    readonly payload: { apiData: string };
  }

  export interface IClearApiMessage {
    readonly type: typeof CLEAR_APIMESSAGE;
    readonly payload: { apiData: string };
  }

  
 
/*
export interface IRegisterFailure {
    readonly type: typeof REGISTER_FAILURE;
      readonly user: TUser;
  } */

export type TAuthActions = 
    | IRegisterSuccess
    | ILoginSuccess
    | IGetUser
    | ISetLogged
    | ISetLoggedOut
    | IShowApiMessage
    | IClearApiMessage;