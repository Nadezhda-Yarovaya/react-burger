import {
  SET_INGREDIENTS,
  SET_ALLINGREDIENTS,
  SET_CURRENT,
  REMOVE_CURRENT,
  SET_ORDERDATA,
  SET_IFMOBILE,
  INCREASE_DROPPEDELEMENT,
  UPDATE_COUNTER,
} from '../actions';

//[{uniqueId: 0, id: '', name: '', price: 0, image: ''}],

const initialState = {
  ingredientsByCategory: {
    buns: [],
    sauce: [],
    main: [],
  },
  listOfIngredients: [{ name: '', price: 0, image: '', chosen: 0 }],
  currentIngredient: { name: '', price: 0, image: '' },
  createdOrder: { number: 0, positions: [''] },
  isMobile: false,
  droppedElements: [
    { _id: '', uniqueId: 0, name: 'пока в начинке пусто', price: 0, image: '' },
  ],
  id: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredientsByCategory: action.ingredientsByCategory,
      };
    case SET_ALLINGREDIENTS:
      return {
        ...state,
        listOfIngredients: action.listOfIngredients,
      };

    case SET_ORDERDATA:
      return {
        ...state,
        createdOrder: {
          ...state.createdOrder,
          number: action.createdOrder.number,
          positions: action.createdOrder.positions,
        },
      };

    case SET_CURRENT:
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };

    case REMOVE_CURRENT:
      return {
        ...state,
        currentIngredient: { name: '', price: 0, image: '' },
      };
    case SET_IFMOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      };
    case INCREASE_DROPPEDELEMENT:
      return {
        ...state,
        droppedElements: [
          ...state.droppedElements,
          {
            ...action.element,
            uniqueId: action.uniqueId,
          },
        ],
      };
    /* case UPDATE_COUNTER : 
    return {
      ...state,
      listOfIngredients: state.listOfIngredients.map
      action.currentElementId
    };*/

    default:
      return state;
  }
}

export { rootReducer };

/*
 droppedElements: {
        ...state.droppedElements,
        ...action.droppedIngredient,
        uniqueId: action.uniqueId
      }*/

/* to STORE: 
список всех полученных ингредиентов,
список всех ингредиентов в текущем конструкторе бургера,
объект текущего просматриваемого ингредиента,
объект созданного заказа.
*/
