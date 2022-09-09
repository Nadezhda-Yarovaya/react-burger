import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER,
  SET_LOGGED,
  SET_LOGGEDOUT,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
  GET_USER_REQUEST,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
} from '../actions/auth-actions';

type TUser = {
  email: string;
  name: string;
};

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: { user: TUser };
}

export interface IGetUserReq {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUser {
  readonly type: typeof GET_USER;
  readonly payload: TUser;
}

export interface ISetLogged {
  readonly type: typeof SET_LOGGED;
}

export interface ISetLoggedOut {
  readonly type: typeof SET_LOGGEDOUT;
}

export interface IShowApiMessage {
  readonly type: typeof SHOW_APIMESSAGE;
  readonly payload: { message: string; success: boolean };
}

export interface IClearApiMessage {
  readonly type: typeof CLEAR_APIMESSAGE;
}

export interface IRegisterFailure {
  readonly type: typeof REGISTER_FAILURE;
  readonly err: any;
}

export type TAuthActions =
  | IRegisterRequest
  | IRegisterSuccess
  | ILoginSuccess
  | IGetUserReq
  | IGetUser
  | ISetLogged
  | ISetLoggedOut
  | IShowApiMessage
  | IClearApiMessage
  | IRegisterFailure;
