import { register } from '../../utils/auth';
import { config } from '../../utils/utils';
import { CLEAR_APIMESSAGE, GET_USER, SET_LOGGED, SHOW_APIMESSAGE } from '../actions';
import { authReducer, initialAuthState } from './auth-reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authApi from '../../utils/auth';
import { performRegister } from '../action-creators/auth-action-creators';

describe('check auth reducer', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
                  json: async() => {return {data: 'test'}},
                  ok: true,
        });
    });
    afterEach(() => {
    jest.restoreAllMocks();
    });
    

    test('return initial state', ()=>{
        expect(authReducer(undefined, {})).toEqual(initialAuthState);
    });

    test('should change on action call of SET_LOGGED', () => {
        const expectedPayload = {...initialAuthState, isLogged: true};
        expect(authReducer(undefined, {type: SET_LOGGED})).toEqual(expectedPayload);

    } );

    test('should change on action call of GET_USER', () => {
        const serverResUser = {user: 'testuser'};
        const expectedPayload = {...initialAuthState, user: serverResUser};
        expect(authReducer(undefined,{type: GET_USER, payload: serverResUser})).toEqual(expectedPayload);

    } );
 /*

    test('register creator, 3 actions', async() => {
        const middlewares = [thunk.withExtraArgument({authApi})];
        const mockStore = configureMockStore(middlewares);

        const expectedActions = [{type:SHOW_APIMESSAGE }, {type:CLEAR_APIMESSAGE } ];

        const store = mockStore({});
        await store.dispatch(performRegister({email: 'email', password: 'password', name: 'name'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });  

});

describe('check register', () => {
beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
              json: async() => {return {data: 'test'}},
              ok: true,
    });
});
afterEach(() => {
jest.restoreAllMocks();
});

test ('успех при регистрации', async() => {
    const result = await register('email', 'password', 'name');
    const expectedOutput = {data: 'test'};
    expect(result).toEqual(expectedOutput);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${config.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ email: 'email', password: 'password', name: 'name' })
    });
})
*/
});