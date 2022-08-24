import { TIngredient, TIngredientUniq2, } from '../../utils/types';
import { firstIngredUniq } from '../../utils/utils';
import { TMobileActions } from '../action-types/mobile-types';
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

export type TMobileState = {
  isMobile: boolean;
  isMobileOrdered: boolean;
  windowData: { width: number; height: number; }
  isMobileMenuOpened: boolean;
  isSubMenuOpened: boolean;
  currentTouchedItem: TIngredientUniq2;
  offsets: {
    rectangle: { top: number; right: number; bottom?: number; left?: number; },
    initials: { x: number; y: number; },
    finals: { x: number; y: number; },
    };

}

const initialState = {
  isMobile: false,
  isMobileOrdered: false,
  windowData: { width: 0, height: 0 },
  isMobileMenuOpened: false,
  isSubMenuOpened: false,
  currentTouchedItem: firstIngredUniq,
  offsets: {
    rectangle: { top: 0, right: 0 },
    initials: { x: 0, y: 0 },
    finals: { x: 0, y: 0 },
  },
};

export function mobileReducer(state : TMobileState = initialState, action: TMobileActions): TMobileState {
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
        currentTouchedItem: action.payload,
      };

    case CLEAR_TOUCHEDITEM:
      return {
        ...state,
        currentTouchedItem: {},
      };

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

    default:
      return state;
  }
}
