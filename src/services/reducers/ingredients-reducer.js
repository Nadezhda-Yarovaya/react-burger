import {
    SET_ALLINGREDIENTS_REQUEST,
    SET_ALLINGREDIENTS_SUCCESS,
    SET_ALLINGREDIENTS_FAILURE,
    SET_INGREDIENTSBYCAT,
    REPLACE_BUN
  } from '../actions';

  const initialState = {
    listOfIngredients: [{name: '', price: 0, image: ''}],
    isLoading: false,
    ingredientsByCategory: {
      buns: [],
      sauce: [],
      main: [],
    },
    
    bun: {
      name: 'добавьте булочку в конструктор бургера',
      _id: '1',
      price: 0,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
  } 

  export function ingredientsReducer (state = initialState, action) {
    
    switch (action.type) {
        case SET_ALLINGREDIENTS_REQUEST:
          return {
            ...state,
            isLoading: true,
          };
          case SET_ALLINGREDIENTS_SUCCESS:
          return {
            ...state,
            listOfIngredients: action.payload,
            isLoading: false,
          };
          case SET_ALLINGREDIENTS_FAILURE:
          return {
            ...state,
            isLoading: false,
          };
          case SET_INGREDIENTSBYCAT:
            return {
              ...state,
              ingredientsByCategory: action.payload,
            };
          default: return state;
          case REPLACE_BUN:
            return {
              ...state,
              bun: action.bun,
            };
      
        }
  }