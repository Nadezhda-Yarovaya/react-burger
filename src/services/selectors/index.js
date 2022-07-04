function ifItsMobile(state) {
    return state.mobile.isMobile;
}

function loadIngredients(state) {
    return state.ingredients.isLoading
}

function getAllIngredients(state) {
    return state.ingredients.listOfIngredients;
}

export {ifItsMobile, loadIngredients, getAllIngredients};