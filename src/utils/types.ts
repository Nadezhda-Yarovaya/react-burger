import React from 'react';
import { TAuthActions } from '../services/action-types/auth-action-types';
import { TFeedWsActions } from '../services/action-types/feed-ws-action-types';

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '../';
import { TIngedientsActions } from '../services/action-types/ingredients-action-types';
import { TDndActions } from '../services/action-types/dnd-action-types';
import { TMobileActions } from '../services/action-types/mobile-types';
import { TOrdersWsActions } from '../services/action-types/orders-ws-action-types';
import { TOrderInfoActions } from '../services/action-types/order-info-action-types';

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

export type TIngredientUniq2 = {
  _id?: string;
  calories?: number;
  carbohydrates?: number;
  fat?: number;
  proteins?: number;
  price?: number;
  name?: string;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  type?: string;
  uniqueId?: string;
};

type TLocate = {
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
  locate?: TLocate;
  feedLocate?: TLocate;
  ordersLocate?: TLocate;
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
  order: { number: number };
  status: string;
  positions: Array<string | TIngredientUnique | TIngredient>;
  sum: number;
  date: string;
  _id: string;
};


export type TOrderFull = {
  name: string;
  order: { number: number };
  status: string;
  positions: Array<TIngredientUnique | string | TIngredient>;
  sum: number;
  date: string;
  _id: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderWithIngredients = {
  createdAt: string;
  ingredients: Array<TIngredient | undefined>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TByCategory = {
  bun: Array<TIngredient>;
  sauce: Array<TIngredient>;
  main: Array<TIngredient>;
};

export type TDefaultIngred = {
  name: string;
  price: number;
  image: string;
};

export type TOrdersId = {
  makeAllPositionsList: (
    currentList: Array<string>
  ) => Array<TIngredientUnique>;
};

export type TOrderProps = {
  item: TOrderFull;
};

export type TMessage = {
  text: string;
};

export type TMonitor = {
  x: number;
  y: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type TItem = {
  item: TIngredient;
};

export const firstIngredUniq = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
  uniqueId: 'sdfs',
};

export const firstIngred = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
};



export const firstorder: TOrderFull = 
  {
    name: '',
    order: { number: 0 },
    status: '',
    positions: [firstIngredUniq],
    sum: 0,
    date: '',
    _id: '',
};
export type TOrderFromServer = {
  date?: string;
  name?: string;

  order?: { number: number };
  positions?: Array<string>;
  status?: string;
  sum?: number;

  _id?: string;
};

/*
date: "2022-05-06"
name: "Бессмертный альфа-сахаридный экзо-плантаго бургер"
order: {number: 2547}
positions: (5) [{…}, {…}, {…}, {…}, {…}]
status: "Создан"
sum: 14450
_id: "1112222333344455566"
*/
export type TAppActions =
  | TAuthActions
  | TFeedWsActions
  | TIngedientsActions
  | TDndActions
  | TMobileActions
  | TOrdersWsActions
  | TOrderInfoActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;
