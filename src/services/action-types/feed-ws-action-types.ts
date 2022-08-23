import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, 
    WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_GET_ORDERS, WS_SET_ORDERSLIST } from '../actions/feed-ws-actions';
import { TMessage, TOrder } from '../../utils/types';


type wsGotMessages = {
  orders: string;
}

export interface IConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: {error: undefined};
    readonly wsConnected: boolean
  }

export interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    // error: undefined;
    // readonly payload: {orders: string};
    // wsConnected: boolean;
  }

  export interface IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
    // readonly error: string ;
    // readonly wsConnected: boolean;
  }

  export interface IConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: {error: string;}
    readonly wsConnected: boolean;
  }

  export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {orders: string};
    //readonly error: undefined;
    //wsConnected: boolean;
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

  export interface ISetOrders {
    readonly type: typeof WS_SET_ORDERSLIST;
    readonly error: undefined;
    readonly payload: {ordersArray: TOrder[]};
  }
  
export type TFeedWsActions = |IConnectionStart | IConnectionSuccess | IConnectionError | IConnectionClosed | IWsGetMessage | IWsSendMessage | IGetOrders | ISetOrders;

