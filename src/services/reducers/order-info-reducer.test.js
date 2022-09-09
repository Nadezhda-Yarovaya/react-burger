import { firstIngredUniq } from '../../utils/utils';
import {
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_FAILURE,
  SET_TOTALSUM,
  CLEAR_ORDERDATA,
} from '../actions';
import { initialOrderState, orderInfoReducer } from './order-info-reducer';

describe('check auth reducer', () => {
  test('should return initial state', () => {
    expect(orderInfoReducer(undefined, {})).toEqual(initialOrderState);
  });

  test('should change on action call of GET_ORDERDATA_REQUEST', () => {
    const expectedPayload = { isOrderLoading: true, isPerformed: true };
    expect(orderInfoReducer({}, { type: GET_ORDERDATA_REQUEST })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of GET_ORDERDATA_SUCCESS', () => {
    const createdOrder = { number: '12345', positions: [firstIngredUniq] };

    const expectedPayload = { createdOrder, isOrderLoading: false };
    expect(
      orderInfoReducer({}, { type: GET_ORDERDATA_SUCCESS, createdOrder })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of CLEAR_ORDERDATA', () => {
    const expectedPayload = {
      isPerformed: false,
      createdOrder: initialOrderState.createdOrder,
    };
    expect(orderInfoReducer({}, { type: CLEAR_ORDERDATA })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of GET_ORDERDATA_FAILURE', () => {
    const expectedPayload = { isOrderLoading: false };
    expect(orderInfoReducer({}, { type: GET_ORDERDATA_FAILURE })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of SET_TOTALSUM', () => {
    const totalSum = 2050;
    const expectedPayload = { totalSum };
    expect(orderInfoReducer({}, { type: SET_TOTALSUM, totalSum })).toEqual(
      expectedPayload
    );
  });
});
