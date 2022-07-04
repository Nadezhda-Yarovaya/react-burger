import {
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

    GOUP_POSITION,
    GODOWN_POSITION
  } from '../actions';
  
  //[{uniqueId: 0, id: '', name: '', price: 0, image: ''}],
  
  const initialState = {
    droppedElements: [],
    dropDirection: '',
    initialIngredOffset: {},
  };
  
  export function dndReducer(state = initialState, action) {
    //console.log('bun:', action.bun);
    switch (action.type) {
     
     
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
  
      case GOUP_POSITION:
        return {
          ...state,
          droppedElements: arraymoveUp(
            [...state.droppedElements],
            state.droppedElements.indexOf(action.element)
          ),
        };

        case GODOWN_POSITION:
          return {
            ...state,
            droppedElements: arraymoveDown(
              [...state.droppedElements],
              state.droppedElements.indexOf(action.element)
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
          dropDirection: action.payload,
        };
  
      default:
        return state;
    }
  }

function arraymoveUp(arr, fromIndex) {
  let element = arr[fromIndex];  
  arr.splice(fromIndex, 1);
  arr.splice(fromIndex - 1, 0, element);
  return arr;
}

function arraymoveDown(arr, fromIndex) {
  let element = arr[fromIndex];  
  arr.splice(fromIndex, 1);
  arr.splice(fromIndex + 1, 0, element);
  return arr;
}
      /* case UPDATE_COUNTER : 
      return {
        ...state,
        listOfIngredients: state.listOfIngredients.map
        action.currentElementId
      };*/
      /* 0 is how many removed */