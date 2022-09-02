import { SET_ALLINGREDIENTS_FAILURE, SET_ALLINGREDIENTS_REQUEST, SET_ALLINGREDIENTS_SUCCESS } from '../actions';
import { ingredientsReducer, initialState } from './ingredients-reducer';
import { fetchAllIngredients } from '../action-creators/ingredients-action-creators';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Проверка экшенов ingredients-reducer', () => {
it ('Запрашивает все игредиенты', () => {
    const expectedAction = {...initialState, isLoading: true};
    expect(ingredientsReducer(initialState , {type: SET_ALLINGREDIENTS_REQUEST})).toEqual(expectedAction) // работает, говорит все ок ))
    // нужно еще проверить - если передаю не то, то что будет? должно быть false 
});

it ('Неудача при получении всех ингредиентов', () => {
    const expectedAction = {...initialState, isLoading: true};
    expect(ingredientsReducer(initialState , {type: SET_ALLINGREDIENTS_FAILURE})).toEqual(expectedAction) // работает, говорит все ок ))
    // нужно еще проверить - если передаю не то, то что будет? должно быть false 
})
}
); /* checking simple actions */ 


describe('асинхронные экшены с запросом к серверу', () => {

  afterEach(() => {
    fetchMock.restore()
  })

  it('проверяем запрос на получение всех ингредиентов SET_ALLINGREDIENTS_SUCCESS', () => {

    fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
    method: 'GET',
      headers: {'Content-Type': 'application/json' },
    })

    const expectedActions = [
      // { type: SET_ALLINGREDIENTS_REQUEST },
      { type: SET_ALLINGREDIENTS_SUCCESS, payload: ''}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch().then(() => {
      // Возвращаем асинхронный экшен
      expect(store.getActions(fetchAllIngredients())).toEqual(expectedActions)
    })
  })
}); 
/* closing describe for async */ 