import { TIngredientUnique } from '../../utils/types';
import { TDndActions } from '../action-types/dnd-action-types';
import {
  INCREASE_DROPPEDELEMENT,
  DELETE_ITEM,
  SET_DROPDIRECTION,
  SET_DRAGGEDCONSTRUCTOR,
  GOUP_POSITION,
  GODOWN_POSITION,
  CLEAR_STUFFINGLIST,
} from '../actions';

export type TDndState = {
  droppedElements: Array<TIngredientUnique> | [];
  dropDirection: string;
  initialIngredOffset: any;
};

export const initialDndState = {
  droppedElements: [],
  dropDirection: '',
  initialIngredOffset: {},
};

export function dndReducer(
  state: TDndState = initialDndState,
  action: TDndActions
): TDndState {
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
        droppedElements: initialDndState.droppedElements,
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
        droppedElements: moveArray(
          [...state.droppedElements],
          action.element,
          'top'
        ),
      };

    case GODOWN_POSITION:
      return {
        ...state,
        droppedElements: moveArray(
          [...state.droppedElements],
          action.element,
          'down'
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

export function moveArray(
  arr: Array<TIngredientUnique>,
  fromIndex1: TIngredientUnique,
  direction: string
): Array<TIngredientUnique> {
  let fromIndex = arr.indexOf(fromIndex1);
  let element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  if (direction === 'top') {
    arr.splice(fromIndex - 1, 0, element);
  } else {
    arr.splice(fromIndex + 1, 0, element);
  }
  return arr;
}
