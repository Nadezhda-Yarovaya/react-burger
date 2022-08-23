import { TIngredient, TIngredientUnique, TMonitor } from '../../utils/types';
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

  type TOffsets = 
    {x: number; y: number;};

    type TRectangle = {
      top: number;
      right : number;
      left?:number;
      bottom?: number;
    }
  
  
  export interface ISetIfMobile{
    readonly type: typeof SET_IFMOBILE;
    readonly payload:  boolean;
  }
  
  export interface ISetIfMobileOrdered{
    readonly type: typeof SET_IFMOBILEORDERED;
    readonly payload: boolean;
  }

  export interface ISetWindowData{
    readonly type: typeof SET_WINDOWDATA;
    readonly payload: {width: number; height: number};
  }
  
  export interface IOpenMobileMenu{
    readonly type: typeof OPEN_MOBILEMENU;
  }

  export interface ICloseMobileMenu{
    readonly type: typeof CLOSE_MOBILEMENU;
  }

  export interface ISubMobileMenu{
    readonly type: typeof UNFOLD_SUBMOBILEMENU;
  }

  export interface IFoldSubMobileMenu{
    readonly type: typeof FOLD_SUBMOBILEMENU;
  }

  export interface ISetTouchedItem{
    readonly type: typeof SET_TOUCHEDITEM;
    readonly payload : TIngredientUnique | TIngredient;
  }

  export interface IClearTouchedItem{
    readonly type: typeof CLEAR_TOUCHEDITEM;
  }

  export interface ISetOffsets{
    readonly type: typeof SET_OFFSETS;
    readonly payload:  TRectangle;
  }

  export interface ISetInitials{
    readonly type: typeof SET_INITIALS;
    readonly payload: TOffsets;
  }

  export interface ISetFinals{
    readonly type: typeof SET_FINALS;
    readonly payload: TOffsets;
  }

  export interface IClearInitials{
    readonly type: typeof CLEAR_INITIALS;
  }

  export interface IClearFinals{
    readonly type: typeof CLEAR_FINALS;
  }


  export type TMobileActions = 
  | ISetIfMobile
  | ISetIfMobileOrdered
  | ISetWindowData
  | IOpenMobileMenu
  | ICloseMobileMenu
  | ISubMobileMenu
  | IFoldSubMobileMenu
  | ISetTouchedItem
  | IClearTouchedItem
  | ISetOffsets
  | ISetInitials
  | ISetFinals
  | IClearInitials
  | IClearFinals;