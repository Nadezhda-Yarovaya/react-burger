
/*const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';*/
const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
/*const REGISTER_FAILURE: 'REGISTER_FAILURE' = 'REGISTER_FAILURE';*/

const RESET_PASSWORD_REQUEST : 'RESET_PASSWORD_REQUEST'= 'RESET_PASSWORD_REQUEST';

const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';

const LOGIN_SUCCESS: 'LOGIN_SUCCESS'='LOGIN_SUCCESS';
const LOGIN_REQUEST: 'LOGIN_REQUEST'='LOGIN_REQUEST';

const LOGIN_FAILURE: 'LOGIN_FAILURE'='LOGIN_FAILURE';

const GET_USER: 'GET_USER'='GET_USER';

const SET_LOGGED: 'SET_LOGGED' = 'SET_LOGGED';

const  SET_LOGGEDOUT: 'SET_LOGGEDOUT'='SET_LOGGEDOUT';

const SHOW_APIMESSAGE: 'SHOW_APIMESSAGE'='SHOW_APIMESSAGE';
const CLEAR_APIMESSAGE : 'CLEAR_APIMESSAGE'='CLEAR_APIMESSAGE';

export {
REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,GET_USER
, SET_LOGGED, SET_LOGGEDOUT, SHOW_APIMESSAGE, CLEAR_APIMESSAGE
};

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