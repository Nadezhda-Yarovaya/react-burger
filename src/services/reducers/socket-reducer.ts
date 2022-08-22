import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST
} from "../actions/socket-actions";

import type { TSocketActions } from "../action-types/socket-action-types";
import { TMessage } from "../../utils/types";
// лучше создать отдельный файл типов и оттуда брать */

type TWSState = {
  wsConnected: boolean;
  error?: Event;
};

const initialState = {
  wsConnected: false,
  error: undefined,
  orders: '',
  ordersArray: [],
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state: TWSState = initialState, action: TSocketActions) => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
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
