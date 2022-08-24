import { TOrderWithIngredients } from '../../utils/types';
import { TOrdersWsActions } from '../action-types/orders-ws-action-types';
import {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
  WS_SET_ORD_ORDERSLIST,
} from '../actions/orders-ws-actions';

export type TWSState = {
  wsConnected: boolean;
  error?: string | undefined;
  orders: string;
  ordersArray?: Array<TOrderWithIngredients>;
};

const initialState = {
  wsConnected: false,
  error: undefined,
  orders: '',
  ordersArray: [],
};

export const ordersWsReducer = (
  state: TWSState = initialState,
  action: TOrdersWsActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_ORD_START:
      return {
        ...state,
        //error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ORD_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case WS_CONNECTION_ORD_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: '',
        ordersArray: []
      };
    case WS_GET_ORD_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    case WS_GET_ORD_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    case WS_SET_ORD_ORDERSLIST:
      return {
        ...state,
        error: undefined,
        ordersArray: action.payload,
      };

    default:
      return state;
  }
};
