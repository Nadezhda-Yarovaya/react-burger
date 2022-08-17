import React from 'react';

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

export type TLocation = {
  state?: {
    from: string;
  };
  from: string;
  locate?: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state?: string;
  };
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


export type TOrdersId = {
  makeAllPositionsList: (currentList: Array<string>) => Array<TIngredientUnique>;
}

export type TOrderProps = {
  item: TOrderFull;
};