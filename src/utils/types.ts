import React from 'react';
import { TAuthActions } from '../services/action-types/auth-action-types';
import { TSocketActions } from '../services/action-types/socket-action-types';

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '../';
import { TIngedientsActions } from '../services/action-types/ingredients-action-types';

export type TNewItem = { [key: string]: string | number };

export type TIngredient = {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  price: number;
  name: string;
  image: string;
  image_mobile: string;
  image_large: string;
  type?: string;
};

export type TIngredientUnique = TIngredient & {
  uniqueId: string;
};

type TLocate = 
  {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state?: string;
  };


export type TLocation = {
  state?: {
    from: string;
  };
  from: string;
  locate?:TLocate;
  feedLocate?: TLocate;
  ordersLocate? : TLocate;
};

export type TRectangle = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type TForm = {
  values: {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
  };
  errors: {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
  };
  validities: {
    name?: boolean;
    email?: boolean;
    password?: boolean;
    token?: boolean;
  };
};


export type TOrderItem = {
  name: string;
  order: {number: number};
  status: string;
  positions: Array<string>;
  sum: number;
  date: string;
  _id: string,
};

export type TOrderFull = {
  name: string;
  order: {number: number};
  status: string;
  positions: Array<TIngredientUnique>;
  sum: number;
  date: string;
  _id: string,
}

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;  
  name: string;
  number: number;
  status: string;
  updatedAt: string;  
  _id: string,
}

export type TOrderWithIngredients = {
  createdAt: string;
  ingredients: Array<TIngredient>;  
  name: string;
  number: number;
  status: string;
  updatedAt: string;  
  _id: string,
}

export type TByCategory = {
  buns: Array<TIngredient>;
  sauce: Array<TIngredient>;
  main: Array<TIngredient>;
}

export type TDefaultIngred = {
 name: string; price: number; image: string;};
            

export type TOrdersId = {
  makeAllPositionsList: (currentList: Array<string>) => Array<TIngredientUnique>;
}

export type TOrderProps = {
  item: TOrderFull;
};

export type TMessage = {
  text: string;
}

export type TAppActions = | TAuthActions | TSocketActions | TIngedientsActions;


// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;