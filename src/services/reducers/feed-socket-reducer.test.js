import { firstorderString } from '../../utils/utils';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST,
} from '../actions/feed-ws-actions';
import { feedWsReducer, initialFeedWSState } from './feed-socket-reducer';

describe('check feed socket reducer', () => {
  test('shoulf return initial state', () => {
    expect(feedWsReducer(undefined, {})).toEqual(initialFeedWSState);
  });

  test('should change on action call of WS_CONNECTION_START', () => {
    const expectedPayload = {
      error: undefined,
      isConnecting: true,
    };
    expect(feedWsReducer({}, { type: WS_CONNECTION_START })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_CONNECTION_SUCCESS', () => {
    const expectedPayload = {
      error: undefined,
      wsConnected: true,
      isConnecting: false,
    };
    expect(feedWsReducer({}, { type: WS_CONNECTION_SUCCESS })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_CONNECTION_ERROR', () => {
    const errorMessage = 'test error';
    const expectedPayload = {
      error: errorMessage,
      wsConnected: false,
      isConnecting: false,
    };
    expect(
      feedWsReducer({}, { type: WS_CONNECTION_ERROR, payload: errorMessage })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of WS_CONNECTION_CLOSED', () => {
    const expectedPayload = {
      error: undefined,
      wsConnected: false,
      isConnecting: false,
      orders: '',
      ordersArray: [],
    };
    expect(feedWsReducer({}, { type: WS_CONNECTION_CLOSED })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_GET_MESSAGE', () => {
    const orders = [firstorderString];
    const expectedPayload = {
      orders,
    };
    expect(
      feedWsReducer({}, { type: WS_GET_MESSAGE, payload: orders })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of WS_GET_ORDERS', () => {
    const orders = [firstorderString];
    const expectedPayload = {
      error: undefined,
      orders,
    };
    expect(feedWsReducer({}, { type: WS_GET_ORDERS, payload: orders })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of WS_SET_ORDERSLIST', () => {
    const ordersArray = [firstorderString];
    const expectedPayload = {
      error: undefined,
      ordersArray,
    };
    expect(
      feedWsReducer({}, { type: WS_SET_ORDERSLIST, payload: ordersArray })
    ).toEqual(expectedPayload);
  });
});
