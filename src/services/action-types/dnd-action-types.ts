import { XYCoord } from 'react-dnd';
import {
  TIngredient,
  TIngredientUnique,
  TItem,
  TMonitor,
  TNewItem,
} from '../../utils/types';
import {
  INCREASE_DROPPEDELEMENT,
  DELETE_ITEM,
  SET_DROPDIRECTION,
  SET_DRAGGEDCONSTRUCTOR,
  GOUP_POSITION,
  GODOWN_POSITION,
  CLEAR_STUFFINGLIST,
} from '../actions';

type TCreatedOrder = {
  number: number;
  positions: Array<string>;
};

export interface IIncreaseDropElement {
  readonly type: typeof INCREASE_DROPPEDELEMENT;
  readonly element: TIngredient;
  readonly uniqueId: string;
}

export interface IClearStuffingList {
  readonly type: typeof CLEAR_STUFFINGLIST;
}

export interface ISetDraggedConstructor {
  readonly type: typeof SET_DRAGGEDCONSTRUCTOR;
  readonly initialIngredOffset: any;
}

export interface IGoUpPosition {
  readonly type: typeof GOUP_POSITION;
  readonly element: TIngredientUnique;
}

export interface IGoDownPosition {
  readonly type: typeof GODOWN_POSITION;
  readonly element: TIngredientUnique;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly element: TIngredientUnique;
}

export interface ISetDropDirection {
  readonly type: typeof SET_DROPDIRECTION;
  readonly payload: string ;
}

/*
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
  }; */

export type TDndActions =
  | IIncreaseDropElement
  | IDeleteItem
  | IClearStuffingList
  | ISetDraggedConstructor
  | IGoUpPosition
  | IGoDownPosition
  | ISetDropDirection;
