import { register } from '../../utils/auth';
import { config } from '../../utils/utils';
import { CLEAR_APIMESSAGE, GET_USER, SET_LOGGED, SHOW_APIMESSAGE } from '../actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authApi from '../../utils/auth';
import { performRegister } from './auth-action-creators';


describe('check Auth Creators', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
                  json: async() => {return {data: 'test'}},
                  ok: true,
        });
    });
    afterEach(() => {
    jest.restoreAllMocks();
    });

    test('register creator, 3 actions', async() => {
        const middlewares = [thunk.withExtraArgument({authApi})];
        const mockStore = configureMockStore(middlewares);

        const expectedActions = [{type: SHOW_APIMESSAGE }, {type: CLEAR_APIMESSAGE } ];

        const store = mockStore({});
        /*
        await store.dispatch(performRegister({email: 'email', pass: 'password', name: 'name'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });*/

     await store.dispatch(performRegister({email: 'email', pass: 'password', name: 'name', history: {}})).then((

        result) => {
            expect(result).toEqual(expectedActions);
        });
       
    });  

});

