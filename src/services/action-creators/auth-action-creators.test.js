import { registerSuccessMessage } from '../../utils/utils';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SHOW_APIMESSAGE,
} from '../actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authApi from '../../utils/auth';
import { performRegister } from './auth-action-creators';

const middlewares = [thunk.withExtraArgument({ authApi })];
const mockStore = configureMockStore(middlewares);

describe('check Auth Action Creators', () => {
  test('register ACTION CREATOR, if Success', async () => {
    const expectedActions = [
      { type: REGISTER_REQUEST },
      { type: REGISTER_SUCCESS },
      {
        type: SHOW_APIMESSAGE,
        payload: { message: registerSuccessMessage, success: true },
      },
    ];
    const store = mockStore({});
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomEmail = 'emailnew' + randomNumber.toString() + '@yandex.ru';

    await store
      .dispatch(
        performRegister({
          name: 'name',
          email: randomEmail, //random email to run tests again
          password: 'password',
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('register ACTION CREATOR, if Failure', async () => {
    const errorCode = '403';
    const errorMessage = `Ошибка при соединении: ${errorCode}`;

    const expectedActions = [
      { type: REGISTER_REQUEST },
      { type: REGISTER_FAILURE, err: errorMessage },
    ];

    const store = mockStore({});

    await store
      .dispatch(
        performRegister({
          name: 'name',
          email: 'emailnew1@yandex.ru', // Email уже был зарегистрирован, например
          password: 'password',
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
