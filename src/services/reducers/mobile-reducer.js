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
    SET_IFMOBILEORDERED
  } from '../actions';
  
  //[{uniqueId: 0, id: '', name: '', price: 0, image: ''}],
  
  const initialState = {
    isMobile : false,
    isMobileOrdered: false,
  }

  export function mobileReducer(state = initialState, action ) {
    switch (action.type) {
        case SET_IFMOBILE: 
        return {
            ...state,
            isMobile: action.payload
        };
        case SET_IFMOBILEORDERED: 
        return {
            ...state,
            isMobileOrdered: action.payload
        };
        default: return state;
    }
  }