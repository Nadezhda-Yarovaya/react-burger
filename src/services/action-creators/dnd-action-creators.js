import {
  INCREASE_DROPPEDELEMENT,
  GOUP_POSITION,
  GODOWN_POSITION,
} from '../actions';

function _dropIngredient(currentItem, dispatch) {
  dispatch({
    type: INCREASE_DROPPEDELEMENT,
    element: currentItem,
    uniqueId: Math.floor(Date.now()),
  });
}
export function dropElement(currentItem, dispatch) {
  _dropIngredient(currentItem, dispatch);
}

export function dropElementWithinConstructor(currentItem, dispatch, direction) {
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
