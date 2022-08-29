import { TAuthActions } from '../services/action-types/auth-action-types';
import { TFeedWsActions } from '../services/action-types/feed-ws-action-types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../';
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

export type TIngredientQty = {
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
  qty: number;
};

export type TAssignQty = {
  _id: string;
  qty: number;
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
    from?: string;
    feedLocate?: TLocate;
    ordersLocate?: TLocate;
  };
  from?: string;
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

export type TInputsLogin = {
  email: string;
  password: string;
};

export type TInputsPass = {
  email: string;
};

export type TInputsRegister = {
  name: string;
  email: string;
  password: string;
};

export type TInputs = TInputsRegister;

export type TInputsBool =
  | TInputsBoolLogin
  | TInputsBoolPass
  | TInputsBoolRegister;

export type TInputsBoolLogin = {
  email: boolean;
  password: boolean;
};

export type TInputsBoolPass = {
  email: boolean;
};

export type TInputsBoolRegister = {
  name: boolean;
  email: boolean;
  password: boolean;
};

export type TInputs1 = {
  name: string;
  email: string;
  password: string;
  token: string;
};

export type TInputsBool1 = {
  name: boolean;
  email: boolean;
  password: boolean;
  token: boolean;
};

export type TForm = {
  values: TInputs1;
  errors: TInputs1;
  validities: TInputsBool1;
};

export type TFormLogin = {
  values: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
  validities: {
    email: boolean;
    password: boolean;
  };
};

export type TFormPass = {
  values: {
    email: string;
  };
  errors: {
    email: string;
  };
  validities: {
    email: boolean;
  };
};

export type TFormRegister = {
  values: {
    name: string;
    email: string;
    password: string;
  };
  errors: {
    name: string;
    email: string;
    password: string;
  };
  validities: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
};

export type TFormUnion = TFormRegister | TFormLogin;

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
  ingredients: Array<TIngredientQty>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderWithIngredientsNoQty = {
  createdAt: string;
  ingredients: Array<TIngredient>;
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
  item: TOrderWithIngredients;
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

export type TPropsFormatDate = {
  formatDate: (item: TOrderWithIngredients) => string;
};

export type TWSState = {
  isConnecting: boolean;
  wsConnected: boolean;
  error?: string | undefined;
  orders: string;
  ordersArray: Array<any>;
};

export type TParams = {
  id: string;
};

export type TAppActions =
  | TAuthActions
  | TFeedWsActions
  | TIngedientsActions
  | TDndActions
  | TMobileActions
  | TOrdersWsActions
  | TOrderInfoActions;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  never,
  TAppActions
>;
