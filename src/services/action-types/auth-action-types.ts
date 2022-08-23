import {REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,GET_USER
    , SET_LOGGED, SET_LOGGEDOUT, SHOW_APIMESSAGE, CLEAR_APIMESSAGE, GET_USER_REQUEST
    } from '../actions/auth-actions';
    
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
        readonly payload: { message: string, success: boolean; };
      }
    
      export interface IClearApiMessage {
        readonly type: typeof CLEAR_APIMESSAGE;
      }
    
      
     
    /*
    export interface IRegisterFailure {
        readonly type: typeof REGISTER_FAILURE;
          readonly user: TUser;
      } */
    
    export type TAuthActions = 
        | IRegisterSuccess
        | ILoginSuccess
        | IGetUserReq
               | IGetUser
        | ISetLogged
        | ISetLoggedOut
        | IShowApiMessage
        | IClearApiMessage;