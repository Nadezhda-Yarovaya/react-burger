import { AppDispatch } from '../..';
import { TIngredient, TIngredientUnique } from '../../utils/types';
import {
  INCREASE_DROPPEDELEMENT,
  GOUP_POSITION,
  GODOWN_POSITION,
} from '../actions';

const _dropIngredient = (currentItem: TIngredient, dispatch: AppDispatch) => {
  const uniqId: string = (Math.floor(Date.now())).toString();
  dispatch({
    type: INCREASE_DROPPEDELEMENT,
    element: currentItem,
    uniqueId: uniqId,
  });
}

export function dropElement(currentItem: TIngredient, dispatch: AppDispatch) {
  _dropIngredient(currentItem, dispatch);
}

export function dropElementWithinConstructor(currentItem: TIngredientUnique, dispatch: AppDispatch, direction: string) {
  if (currentItem.uniqueId) {
    if (direction === 'top') {
      dispatch({
        type: GOUP_POSITION,
        element: currentItem,
      });
    } else {
      dispatch({
        type: GODOWN_POSITION,
        element: currentItem,
      });
    }
  } else {
    _dropIngredient(currentItem, dispatch);
  }
}
