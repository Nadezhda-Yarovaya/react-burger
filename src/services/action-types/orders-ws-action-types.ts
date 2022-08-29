import { TOrderWithIngredients } from '../../utils/types';
import {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
  WS_SET_ORD_ORDERSLIST,
} from '../actions/orders-ws-actions';

export interface IConnectionStart {
  readonly type: typeof WS_CONNECTION_ORD_START;
}

export interface IConnectionSuccess {
  readonly type: typeof WS_CONNECTION_ORD_SUCCESS;
}

export interface IConnectionError {
  readonly type: typeof WS_CONNECTION_ORD_ERROR;
  readonly payload: string;
}

export interface IConnectionClosed {
  readonly type: typeof WS_CONNECTION_ORD_CLOSED;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_ORD_MESSAGE;
  readonly payload: string;
}

export interface IGetOrders {
  readonly type: typeof WS_GET_ORD_ORDERS;
  readonly error: undefined;
  readonly payload: string;
}

export interface ISetOrders {
  readonly type: typeof WS_SET_ORD_ORDERSLIST;
  readonly payload: Array<any>;
}

export type TOrdersWsActions =
  | IConnectionStart
  | IConnectionSuccess
  | IConnectionError
  | IConnectionClosed
  | IWsGetMessage
  | IGetOrders
  | ISetOrders;
