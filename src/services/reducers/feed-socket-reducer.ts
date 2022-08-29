import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST,
  WS_CONNECTION_START,
} from '../actions/feed-ws-actions';

import { TWSState } from '../../utils/types';
import { TFeedWsActions } from '../action-types/feed-ws-action-types';
import { firstorder } from '../../utils/utils';

const initialState = {
  isConnecting: false,
  wsConnected: false,
  error: undefined,
  orders: '',
  ordersArray: [firstorder],
};

export const feedWsReducer = (
  state: TWSState = initialState,
  action: TFeedWsActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        isConnecting: true,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        isConnecting: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        isConnecting: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        isConnecting: false,
        orders: '',
        ordersArray: [],
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    case WS_SET_ORDERSLIST:
      return {
        ...state,
        error: undefined,
        ordersArray: action.payload,
      };

    default:
      return state;
  }
};
