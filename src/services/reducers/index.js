import {
  SET_INGREDIENTS,
  SET_ALLINGREDIENTS,
  SET_CURRENT,
  REMOVE_CURRENT,
  SET_ORDERDATA,
  SET_IFMOBILE,
  INCREASE_DROPPEDELEMENT,
  UPDATE_COUNTER,
  CHANGE_POSITION,
  DELETE_ITEM,
  SET_DROPDIRECTION,
  SET_DRAGGEDCONSTRUCTOR,
  SET_TOTALSUM,
  REPLACE_BUN,
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
  droppedElements: [],
  dropDirection: '',
  initialIngredOffset: {},
  totalSum: 0,
  bun: {
    name: 'добавьте булочку в конструктор бургера',
    _id: '1',
    price: 0,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  },
};

function rootReducer(state = initialState, action) {
  //console.log('bun:', action.bun);
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
    case SET_DRAGGEDCONSTRUCTOR: {
      return {
        ...state,
        initialIngredOffset: action.initialIngredOffset,
      };
    }
    /* case UPDATE_COUNTER : 
    return {
      ...state,
      listOfIngredients: state.listOfIngredients.map
      action.currentElementId
    };*/
    /* 0 is how many removed */
    case CHANGE_POSITION:
      return {
        ...state,
        droppedElements: arraymove(
          [...state.droppedElements],
          state.droppedElements.indexOf(action.element),
          action.dropDirection
        ),
      };

    case DELETE_ITEM:
      return {
        ...state,
        droppedElements: [...state.droppedElements].filter((item, index) => {
          if (item.uniqueId === action.element.uniqueId) {
          } else {
            return item;
          }
        }),
      };

    case SET_DROPDIRECTION:
      return {
        ...state,
        dropDirection: action.dropDirection,
      };

    case SET_TOTALSUM:
      return {
        ...state,
        totalSum: action.totalSum,
      };
    case REPLACE_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    default:
      return state;
  }
}

/* for counter say    droppedElements: [...state.droppedElements].map(item =>
item.uniqueId === action.item.uniqueId ? { ...item, qty: ++item.qty } : item
) */

//[...state.droppedElements].splice([...state.droppedElements].indexOf(action.element) +1, 0, [...state.droppedElements].splice([...state.droppedElements].indexOf(action.element),1)[0])
// [...state.droppedElements].splice(2, 0, [...state.droppedElements].splice(1,1))

// state.droppedElements.splice([...state.droppedElements].indexOf(action.element.uniqueId), 1) - returns only this element
/*
arraymove(state.droppedElements, state.droppedElements.indexOf(action.element), state.droppedElements.indexOf(action.element)+1)
.map((item, index, arr) => {
        if (index === 2) {        
          arr[index+1] = item;
        } else {
        return arr[index];
        }
      }
      )
       
*/

function arraymove(arr, fromIndex, dropDirection) {
  console.log('arr', arr, 'DIRECTION: ', dropDirection);
  let element = arr[fromIndex];
  let toIndex = 0;
  if (dropDirection === 'bottom') {
    toIndex = fromIndex + 1;
  } else {
    toIndex = fromIndex - 1;
  }
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  console.log('arr final', arr);
  /* fromIndex=3;
  toIndex=2;*/
  /*arr.map((item,index,arr) => {
    
  })*/
  return arr;
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
