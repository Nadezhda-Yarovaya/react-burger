import { TIngredientUnique } from '../../utils/types';
import {
    SET_IFMOBILE,
    SET_IFMOBILEORDERED,
    SET_WINDOWDATA,
    OPEN_MOBILEMENU,
    CLOSE_MOBILEMENU,
    UNFOLD_SUBMOBILEMENU,
    FOLD_SUBMOBILEMENU,
    SET_TOUCHEDITEM,
    CLEAR_TOUCHEDITEM,
    SET_OFFSETS,
    SET_INITIALS,
    SET_FINALS,
    CLEAR_INITIALS,
    CLEAR_FINALS,
  } from '../actions';
  
  type TCreatedOrder =  {
    number: number;
    positions: Array<string>;
  };  
  
  export interface ISetIfMobile{
    readonly type: typeof SET_IFMOBILE;
    readonly payload: {isMobile: boolean};
  }
  
  export interface ISetIfMobileOrdered{
    readonly type: typeof SET_IFMOBILEORDERED;
    readonly payload: {isMobileOrdered: boolean};
  }

  export interface ISetWindowData{
    readonly type: typeof SET_WINDOWDATA;
    readonly payload: {isMobile: boolean};
  }
  
  export interface IOpenMobileMenu{
    readonly type: typeof OPEN_MOBILEMENU;
    readonly isMobileMenuOpened: boolean;
  }

  export interface ICloseMobileMenu{
    readonly type: typeof CLOSE_MOBILEMENU;
    readonly isMobileMenuOpened: boolean;
  }

  export interface ISubMobileMenu{
    readonly type: typeof UNFOLD_SUBMOBILEMENU;
    readonly isSubMenuOpened: boolean;
  }

  export interface IFoldSubMobileMenu{
    readonly type: typeof FOLD_SUBMOBILEMENU;
    readonly isSubMenuOpened: boolean;
  }

  export interface ISetTouchedItem{
    readonly type: typeof SET_TOUCHEDITEM;
    readonly payload : {currentTouchedItem: TIngredientUnique};
  }

  export interface IClearTouchedItem{
    readonly type: typeof SET_TOUCHEDITEM;
    readonly payload : {currentTouchedItem: {}};
  }


  case SET_OFFSETS:
    return {
      ...state,
      offsets: {
        ...state.offsets,
        rectangle: action.payload,
      },
    };
  case SET_INITIALS:
    return {
      ...state,
      offsets: {
        ...state.offsets,
        initials: action.payload,
      },
    };

  case SET_FINALS:
    return {
      ...state,
      offsets: {
        ...state.offsets,
        finals: action.payload,
      },
    };

  case CLEAR_INITIALS:
    return {
      ...state,
      offsets: {
        ...state.offsets,
        initials: initialState.offsets.initials,
      },
    };

  case CLEAR_FINALS:
    return {
      ...state,
      offsets: {
        ...state.offsets,
        finals: initialState.offsets.finals,
      },
    };


  export type TMobileActions = 
  | ISetIfMobile
  | ISetIfMobileOrdered
  | ISetWindowData
  | IOpenMobileMenu
  | ICloseMobileMenu
  | ISubMobileMenu
  | IFoldSubMobileMenu
  | ISetTouchedItem;