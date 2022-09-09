import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  GET_USER_REQUEST,
  GET_USER,
  SET_LOGGED,
  SET_LOGGEDOUT,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
} from '../actions';

import { authReducer, initialAuthState } from './auth-reducer';

describe('check auth reducer', () => {
  test('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialAuthState);
  });

  test('should change on action call of REGISTER_REQUEST', () => {
    const expectedPayload = { isRequestingRegister: true };
    expect(authReducer({}, { type: REGISTER_REQUEST })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of REGISTER_SUCCESS', () => {
    const expectedPayload = {
      isRegisterSuccess: true,
      isRequestingRegister: false,
    };
    expect(authReducer({}, { type: REGISTER_SUCCESS })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of REGISTER_FAILURE', () => {
    const errorCode = '403';
    const errorMessage = `Ошибка при соединении: ${errorCode}`;

    const expectedPayload = {
      isRegisterSuccess: false,
      isRequestingRegister: false,
      err: errorMessage,
    };
    expect(
      authReducer({}, { type: REGISTER_FAILURE, err: errorMessage })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of LOGIN_SUCCESS', () => {
    const expectedPayload = {
      isRegisterSuccess: true,
      isRequestingRegister: false,
    };
    expect(authReducer({}, { type: LOGIN_SUCCESS })).toEqual(expectedPayload);
  });

  test('should change on action call of SET_LOGGED', () => {
    const expectedPayload = { ...initialAuthState, isLogged: true };
    expect(authReducer(undefined, { type: SET_LOGGED })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of GET_USER_REQUEST', () => {
    const expectedPayload = { isUserLoding: true };
    expect(authReducer({}, { type: GET_USER_REQUEST })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of GET_USER', () => {
    const serverResUser = { user: 'testuser' };
    const expectedPayload = { ...initialAuthState, user: serverResUser };
    expect(
      authReducer(undefined, { type: GET_USER, payload: serverResUser })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_LOGGEDOUT', () => {
    const expectedPayload = { isLogged: false };
    expect(authReducer({}, { type: SET_LOGGEDOUT })).toEqual(expectedPayload);
  });

  test('should change on action call of SHOW_APIMESSAGE', () => {
    const testMessage = 'test api message';
    const expectedPayload = { apiData: 'test api message' };
    expect(
      authReducer({}, { type: SHOW_APIMESSAGE, payload: testMessage })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of CLEAR_APIMESSAGE', () => {
    const expectedPayload = { apiData: initialAuthState.apiData };
    expect(authReducer({}, { type: CLEAR_APIMESSAGE })).toEqual(
      expectedPayload
    );
  });
});
