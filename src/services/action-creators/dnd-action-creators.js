import {
    SET_ALLINGREDIENTS,
    SET_CURRENT,
    SET_IFMOBILE,
    REMOVE_CURRENT,
    NULL_ORDERDATA,
    SET_IFMOBILEORDERED,
    SET_MODALINGREDIENTS,
    REMOVE_MODALINGREDIENTS,
    UPDATE_COUNTER,
    INCREASE_DROPPEDELEMENT,
    CHANGE_POSITION,
    GOUP_POSITION,
    GODOWN_POSITION

  } from '../actions';

  /*
export function dropElement(currentItem, dispatch) {
  if (!currentItem.item.uniqueId) {
    console.log('dropElement: ', currentItem.item);
        dispatch({
          type: UPDATE_COUNTER,
          currentElementId: currentItem._id,
        });
    
          dispatch({
          type: INCREASE_DROPPEDELEMENT,
          element: currentItem,
          uniqueId: Math.floor(Date.now()),
        });
      }
    }

    */
export function dropElementWithinConstructor(currentItem, dispatch, direction) {
    
  console.log('currentItem', currentItem);
    if (currentItem.item.uniqueId) {
      console.log('we are just moving, not creating', currentItem.item.uniqueId);
      if (direction === 'top') {
        dispatch({
          type: GOUP_POSITION,
          element: currentItem.item,
        });
      } else {
        dispatch({
          type: GODOWN_POSITION,
          element: currentItem.item,
        });
      }
      } else {
        console.log('we are creating', currentItem.item);
        dispatch({
          type: UPDATE_COUNTER,
          currentElementId: currentItem.item._id,
        });
        dispatch({
          type: INCREASE_DROPPEDELEMENT,
          element: currentItem.item,
          uniqueId: Math.floor(Date.now()),
        });
}
}