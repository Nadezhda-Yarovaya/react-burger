import { firstorderString } from '../../utils/utils';
import {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
  WS_SET_ORD_ORDERSLIST,
} from '../actions/orders-ws-actions';

import { initialOrdersWsState, ordersWsReducer } from './orders-socket-reducer';

describe('check feed socket reducer', () => {
  test('should return initial state', () => {
    expect(ordersWsReducer(undefined, {})).toEqual(initialOrdersWsState);
  });

  test('should change on action call of WS_CONNECTION_ORD_START', () => {
    const expectedPayload = {
      error: undefined,
      isConnecting: true,
    };
    expect(ordersWsReducer({}, { type: WS_CONNECTION_ORD_START })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_CONNECTION_ORD_SUCCESS', () => {
    const expectedPayload = {
      error: undefined,
      wsConnected: true,
      isConnecting: false,
    };
    expect(ordersWsReducer({}, { type: WS_CONNECTION_ORD_SUCCESS })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_CONNECTION_ORD_ERROR', () => {
    const errorMessage = 'test error orders';
    const expectedPayload = {
      error: errorMessage,
      wsConnected: false,
      isConnecting: false,
    };
    expect(
      ordersWsReducer(
        {},
        { type: WS_CONNECTION_ORD_ERROR, payload: errorMessage }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of WS_CONNECTION_ORD_CLOSED', () => {
    const expectedPayload = {
      error: undefined,
      wsConnected: false,
      isConnecting: false,
      orders: '',
      ordersArray: [],
    };
    expect(ordersWsReducer({}, { type: WS_CONNECTION_ORD_CLOSED })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_GET_ORD_MESSAGE', () => {
    const orders = [firstorderString];
    const expectedPayload = {
      orders,
    };
    expect(
      ordersWsReducer({}, { type: WS_GET_ORD_MESSAGE, payload: orders })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of WS_GET_ORD_ORDERS', () => {
    const orders = [firstorderString];
    const expectedPayload = {
      error: undefined,
      orders,
    };
    expect(
      ordersWsReducer({}, { type: WS_GET_ORD_ORDERS, payload: orders })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of WS_SET_ORD_ORDERSLIST', () => {
    const ordersArray = [firstorderString];
    const expectedPayload = {
      error: undefined,
      ordersArray,
    };
    expect(
      ordersWsReducer({}, { type: WS_SET_ORD_ORDERSLIST, payload: ordersArray })
    ).toEqual(expectedPayload);
  });
});
