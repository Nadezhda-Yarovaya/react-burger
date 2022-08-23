import {
  SET_ALLINGREDIENTS_REQUEST,
  SET_ALLINGREDIENTS_SUCCESS,
  SET_ALLINGREDIENTS_FAILURE,
  SET_INGREDIENTSBYCAT,
  REPLACE_BUN,
  SET_CURRENT,
  REMOVE_CURRENT,
  SET_MODALINGREDIENTS,
  REMOVE_MODALINGREDIENTS,
  CLEAR_BUN,
} from '../actions';
import { TIngedientsActions } from '../action-types/ingredients-action-types';
import { TByCategory, TIngredient } from '../../utils/types';

export type ingredientsState = {
  listOfIngredients: Array<TIngredient>;
  isLoading: boolean;
  ingredientsByCategory: TByCategory;
  bun: TIngredient;
  currentIngredient: TIngredient;
  areIngredientsShown: boolean;
};

const firstIngred = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  _id: '60d3b41abdacab0026a733c6',
};

const initialState = {
  listOfIngredients: [firstIngred],
  isLoading: false,
  ingredientsByCategory: {
    bun: [firstIngred],
    sauce: [firstIngred],
    main: [firstIngred],
  },
  bun: firstIngred,
  currentIngredient: firstIngred,
  areIngredientsShown: false,
};

export function ingredientsReducer(
  state: ingredientsState = initialState,
  action: TIngedientsActions
) : ingredientsState {
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

    case CLEAR_BUN:
      return {
        ...state,
        bun: initialState.bun,
      };
    case SET_INGREDIENTSBYCAT:
      return {
        ...state,
        ingredientsByCategory: action.payload,
      };

    case REPLACE_BUN:
      return {
        ...state,
        bun: action.bun,
      };

    case SET_CURRENT:
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };

    case REMOVE_CURRENT:
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };

    case SET_MODALINGREDIENTS:
      return {
        ...state,
        areIngredientsShown: true,
      };

    case REMOVE_MODALINGREDIENTS:
      return {
        ...state,
        areIngredientsShown: false,
      };

    default:
      return state;
  }
}
