/*import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppActions } from '../../utils/types';
import type { AppDispatch, RootState } from '../..';

// import { TFeedWsActions, TSocketActions } from '../action-types/feed-ws-action-types';

type TWsActions = {
  wsConnect: typeof WS_CONNECTION_START;
  onSuccess: typeof WS_CONNECTION_SUCCESS,
  onError: typeof WS_CONNECTION_ERROR,  
  onClose: typeof WS_CONNECTION_CLOSED,
  onMessage: typeof WS_GET_MESSAGE,
  onSendMessage: typeof WS_SEND_MESSAGE,
  onGetOrders: typeof WS_GET_ORDERS,  
  // onSetOrdersList: typeof WS_SET_ORDERSLIST
};

export const socketMiddleware = ( wsUrl: string, wsActions: TWsActions):  Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
  let url = '';

  return (next) => (action) => {
  const {dispatch} = store;
      const {
        wsConnect, onSuccess, onError, onClose, onMessage
      } = wsActions;

      if (action.type === wsConnect) {
        url = wsUrl;
        socket = new WebSocket(url);
        dispatch({ type: wsConnect });
      }


      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onSuccess });
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: onError, payload: event.code.toString });
          } else {
            dispatch({ type: onClose });
          }
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: JSON.stringify(event) });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

     /*   if (action.type === wsDisconnect) {
          socket.close();
        }
      }

    } // close next action
  } // close store
};
*/
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
import { WS_CONNECTION_ORD_START, WS_CONNECTION_ORD_ERROR, WS_CONNECTION_ORD_SUCCESS, 
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS, } from '../actions/orders-ws-actions';


type TWsActions = {
  wsConnect: typeof WS_CONNECTION_START | typeof WS_CONNECTION_ORD_START;
  onSuccess: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ORD_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ORD_ERROR;
  onClose: typeof WS_CONNECTION_CLOSED| typeof WS_CONNECTION_ORD_CLOSED;
  onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_ORD_MESSAGE;
  onSendMessage?: typeof WS_SEND_MESSAGE;
  onGetOrders: typeof WS_GET_ORDERS | typeof WS_GET_ORD_ORDERS;
  // onSetOrdersList: typeof WS_SET_ORDERSLIST
};

// socketMiddleware.ts

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsConnect, onSuccess, onError, onClose, onMessage } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
          socket.onopen = (event) => {
          dispatch({ type: onSuccess });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event.type });
        };


        socket.onmessage = (event) => {
          const { data } = event;
          //console.log('on message:', data);
          dispatch({ type: onMessage, payload: data });
        };

        socket.onclose = (event) => {
          // dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
