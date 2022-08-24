import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST,
} from '../actions/feed-ws-actions';
import { TMessage, TOrderWithIngredients } from '../../utils/types';

export interface IConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: Event;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: string;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { messages: TMessage[] };
  readonly wsConnected: boolean;
}

export interface IGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: string;
}

export interface ISetOrders {
  readonly type: typeof WS_SET_ORDERSLIST;
  readonly payload: TOrderWithIngredients[];
}

export type TFeedWsActions =
  | IConnectionStart
  | IConnectionSuccess
  | IConnectionError
  | IConnectionClosed
  | IWsGetMessage
  | IWsSendMessage
  | IGetOrders
  | ISetOrders;
