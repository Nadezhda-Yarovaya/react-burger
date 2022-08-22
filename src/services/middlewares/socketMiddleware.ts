import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppActions } from '../../utils/types';
import type { AppDispatch, RootState } from '../..';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
} from '../actions/socket-actions';
import { TSocketActions } from '../action-types/socket-action-types';

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

export const socketMiddleware = ( wsActions: TWsActions) => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      
  let socket: WebSocket | null = null;
  let url = '';

  return (next) => (action) => {
  const {dispatch} = store;
      const {
        wsConnect,
        onSuccess,
        onError,
        onClose,
        onMessage,
      } = wsActions;

      if (action.type === wsConnect) {
        url = action.payload;
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
        }*/
      }

    } // close next action
  } // close store
};