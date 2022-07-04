import {
  INCREASE_DROPPEDELEMENT,
  DELETE_ITEM,
  SET_DROPDIRECTION,
  SET_DRAGGEDCONSTRUCTOR,
  GOUP_POSITION,
  GODOWN_POSITION,
  CLEAR_STUFFINGLIST,
} from '../actions';

const initialState = {
  droppedElements: [],
  dropDirection: '',
  initialIngredOffset: {},
};

export function dndReducer(state = initialState, action) {
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

    case CLEAR_STUFFINGLIST:
      return {
        ...state,
        droppedElements: initialState.droppedElements,
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
        droppedElements: [...state.droppedElements].filter((item) => {
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
