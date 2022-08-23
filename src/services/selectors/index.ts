import { TAppActions } from '../../utils/types';

function ifItsMobile(state) {
    return state.mobile.isMobile;
}

function loadIngredients(state: TAppActions) {
    return state.ingredients.isLoading
}

function getAllIngredients(state : TAppActions) {
    return state.ingredients.listOfIngredients;
}

export {ifItsMobile, loadIngredients, getAllIngredients};