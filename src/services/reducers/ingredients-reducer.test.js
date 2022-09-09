import { firstIngred } from '../../utils/utils';
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

import {
  ingredientsReducer,
  initialIngredientsState,
} from './ingredients-reducer';

describe('check inggredients reducer', () => {
  test('should return initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialIngredientsState);
  });

  test('should change on action call of SET_ALLINGREDIENTS_REQUEST', () => {
    const expectedPayload = { isLoading: true };
    expect(
      ingredientsReducer({}, { type: SET_ALLINGREDIENTS_REQUEST })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_ALLINGREDIENTS_SUCCESS', () => {
    const listOfIngredients = [firstIngred, firstIngred];

    const expectedPayload = {
      isLoading: false,
      listOfIngredients,
    };
    expect(
      ingredientsReducer(
        {},
        { type: SET_ALLINGREDIENTS_SUCCESS, payload: listOfIngredients }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_ALLINGREDIENTS_FAILURE', () => {
    const expectedPayload = {
      isLoading: false,
    };
    expect(
      ingredientsReducer({}, { type: SET_ALLINGREDIENTS_FAILURE })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_INGREDIENTSBYCAT', () => {
    const ingredientsByCategory = {
      bun: [firstIngred],
      sauce: [firstIngred],
      main: [firstIngred],
    };

    const expectedPayload = {
      ingredientsByCategory,
    };
    expect(
      ingredientsReducer(
        {},
        { type: SET_INGREDIENTSBYCAT, payload: ingredientsByCategory }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of REPLACE_BUN', () => {
    const bun = firstIngred;
    const expectedPayload = {
      bun,
    };
    expect(ingredientsReducer({}, { type: REPLACE_BUN, bun })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of CLEAR_BUN', () => {
    const expectedPayload = {
      bun: initialIngredientsState.bun,
    };
    expect(
      ingredientsReducer(
        {},
        { type: CLEAR_BUN, bun: initialIngredientsState.bun }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_CURRENT', () => {
    const currentIngredient = firstIngred;
    const expectedPayload = {
      currentIngredient,
    };
    expect(
      ingredientsReducer({}, { type: SET_CURRENT, currentIngredient })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of REMOVE_CURRENT', () => {
    const currentIngredient = {};
    const expectedPayload = {
      currentIngredient,
    };
    expect(
      ingredientsReducer({}, { type: REMOVE_CURRENT, currentIngredient })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_MODALINGREDIENTS', () => {
    const expectedPayload = {
      areIngredientsShown: true,
    };
    expect(ingredientsReducer({}, { type: SET_MODALINGREDIENTS })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of REMOVE_MODALINGREDIENTS', () => {
    const expectedPayload = {
      areIngredientsShown: false,
    };
    expect(ingredientsReducer({}, { type: REMOVE_MODALINGREDIENTS })).toEqual(
      expectedPayload
    );
  });
});
