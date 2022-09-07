
import {
  GET_USER,
  SET_LOGGED,
} from '../actions';
import { authReducer, initialAuthState } from './auth-reducer';


describe('check auth reducer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => {
        return { data: 'test' };
      },
      ok: true,
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shoult return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialAuthState);
  });

  test('should change on action call of SET_LOGGED', () => {
    const expectedPayload = { ...initialAuthState, isLogged: true };
    expect(authReducer(undefined, { type: SET_LOGGED })).toEqual(
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

});

  