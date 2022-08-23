import { TOrderWithIngredients } from '../../utils/types';
import {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
  WS_SET_ORD_ORDERSLIST
} from '../actions/orders-ws-actions';

export interface IConnectionStart {
  readonly type: typeof WS_CONNECTION_ORD_START;
  // readonly wsConnected: boolean;
}

export interface IConnectionSuccess {
  readonly type: typeof WS_CONNECTION_ORD_SUCCESS;
  // error: undefined;
  // readonly payload: {orders: string};
  // wsConnected: boolean;
}

export interface IConnectionError {
  readonly type: typeof WS_CONNECTION_ORD_ERROR;
  readonly payload: Event;
  // readonly error: string ;
  // readonly wsConnected: boolean;
}

export interface IConnectionClosed {
  readonly type: typeof WS_CONNECTION_ORD_CLOSED;
  readonly payload: { error: string };
  readonly wsConnected: boolean;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_ORD_MESSAGE;
  readonly payload:  string ;
  //readonly error: undefined;
  //wsConnected: boolean;
}

export interface IGetOrders {
  readonly type: typeof WS_GET_ORD_ORDERS;
  readonly error: undefined;
  readonly payload: string;
}


export interface ISetOrders {
  readonly type: typeof WS_SET_ORD_ORDERSLIST;
  readonly payload: TOrderWithIngredients[];
}

export type TOrdersWsActions =
  | IConnectionStart
  | IConnectionSuccess
  | IConnectionError
  | IConnectionClosed
  | IWsGetMessage
  | IGetOrders
  |ISetOrders;
