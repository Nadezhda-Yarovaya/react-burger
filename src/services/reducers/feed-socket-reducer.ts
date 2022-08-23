import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST
} from "../actions/feed-ws-actions";

//import type { TSocketActions } from "../action-types/feed-ws-action-types";
import { TMessage, TOrder, TOrderWithIngredients } from "../../utils/types";
import { TFeedWsActions } from '../action-types/feed-ws-action-types';
// лучше создать отдельный файл типов и оттуда брать */

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

// Создадим редьюсер для WebSocket
export const feedWsReducer = (state: TWSState = initialState, action: TFeedWsActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      //  error: 'Ошибка соединения',
//        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
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
      orders: action.payload
    }

    case WS_SET_ORDERSLIST: 
    return {
      ...state,
      error: undefined,
      ordersArray: action.payload
    }
    default:
      return state;
  }
};
