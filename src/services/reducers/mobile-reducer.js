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
  SET_IFMOBILEORDERED,
  SET_WINDOWDATA,
  OPEN_MOBILEMENU,
  CLOSE_MOBILEMENU,
  UNFOLD_SUBMOBILEMENU,
  FOLD_SUBMOBILEMENU,
  SET_TOUCHEDITEM,
  CLEAR_TOUCHEDITEM
} from '../actions';

//[{uniqueId: 0, id: '', name: '', price: 0, image: ''}],

const initialState = {
  isMobile: false,
  isMobileOrdered: false,
  windowData: { width: 0, height: 0 },
  isMobileMenuOpened: false,
  isSubMenuOpened: false,
  currentTouchedItem: {}
};

export function mobileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IFMOBILE:
      return {
        ...state,
        isMobile: action.payload,
      };
    case SET_IFMOBILEORDERED:
      return {
        ...state,
        isMobileOrdered: action.payload,
      };
    case SET_WINDOWDATA:
      return {
        ...state,
        windowData: action.payload,
      };
    case OPEN_MOBILEMENU:
      return {
        ...state,
        isMobileMenuOpened: true,
      };
    case CLOSE_MOBILEMENU:
      return {
        ...state,
        isMobileMenuOpened: false,
      };
      case UNFOLD_SUBMOBILEMENU:
        return {
          ...state,
          isSubMenuOpened: true,
        };
      case FOLD_SUBMOBILEMENU:
        return {
          ...state,
          isSubMenuOpened: false,
        };
      
      case SET_TOUCHEDITEM:
        return {
          ...state,
          currentTouchedItem: action.payload
        };

        case CLEAR_TOUCHEDITEM:
          return {
            ...state,
            currentTouchedItem: {}
          };

    default:
      return state;
  }
}
