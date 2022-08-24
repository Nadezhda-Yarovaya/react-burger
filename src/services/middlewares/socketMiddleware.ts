import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../..';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
} from '../actions/feed-ws-actions';
import {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
} from '../actions/orders-ws-actions';

type TWsActions = {
  wsConnect: typeof WS_CONNECTION_START | typeof WS_CONNECTION_ORD_START;
  onSuccess: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ORD_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ORD_ERROR;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_ORD_CLOSED;
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_ORD_MESSAGE;
  onSendMessage?: typeof WS_SEND_MESSAGE;
  onGetOrders: typeof WS_GET_ORDERS | typeof WS_GET_ORD_ORDERS;
};

export const socketMiddleware = (
  wsActions: TWsActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, onSuccess, onError, onClose, onMessage } = wsActions;

      if (type === wsConnect) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onSuccess });
        };

        socket.onerror = (error) => {
          dispatch({ type: onError, payload: JSON.stringify(error) });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: data });
        };

        socket.onclose = (event) => {
        
          if (event.code !== 1000) {
          dispatch({ type: onError, payload: event.code.toString() });
          } else {
       
            dispatch({ type: onClose});
          }
        };


      }

      next(action);
    };
  }) as Middleware;
};
