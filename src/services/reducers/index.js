
import {SET_INGREDIENTS} from '../actions';

const initialState ={
    ingredients: {},
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case SET_INGREDIENTS : 
        return {
            ...state,
            ingredients: action.ingredients
        };
        default: return state;
    }
}

export {rootReducer};


/* to STORE: 
список всех полученных ингредиентов,
список всех ингредиентов в текущем конструкторе бургера,
объект текущего просматриваемого ингредиента,
объект созданного заказа.
*/