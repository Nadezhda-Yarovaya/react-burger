import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, 
    WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_GET_ORDERS } from '../../services/action-types/socket-action-types';
import { TMessage, TOrderFull } from '../../utils/types';


type wsGotMessages = {
  orders: string;
}

export interface IConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    //readonly error: undefined;
    readonly payload: {error: undefined};
    readonly wsConnected: boolean
  }

export interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly error: undefined;
    readonly payload: {orders: string};
    readonly wsConnected: boolean
  }

  export interface IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: { error: string};
    readonly wsConnected: boolean
  }

  export interface IConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    //readonly error: undefined;
    readonly payload: {error: undefined};
    readonly wsConnected: boolean
  }

  export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {messages: TMessage[]};
    readonly wsConnected: boolean
  }

  export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: {messages: TMessage[]};
    readonly wsConnected: boolean
  }

  export interface IGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    readonly error: undefined;
    readonly payload: string;
  }
  
export type TSocketActions = |IConnectionStart | IConnectionSuccess | IConnectionError | IConnectionClosed | IWsGetMessage | IWsSendMessage | IGetOrders;

