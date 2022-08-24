import {
  TForm,
  TFormLogin,
  TFormPass,
  TFormRegister,
  TOrderWithIngredients,
} from './types';

export const initialValues1: TForm = {
  values: {
    email: '',
    password: '',
    name: '',
    token: '',
  },
  errors: {
    email: '',
    password: '',
    name: '',
    token: '',
  },
  validities: {
    email: false,
    password: false,
    name: false,
    token: false,
  },
};
/*
export const intitialValuesLogin: TFormLogin = {
  values: {
    email: '',
    password: '',
  },
  errors: {
    email: '',
    password: '',
  },
  validities: {
    email: false,
    password: false,
  },
};

export const intitialValuesPass: TFormPass = {
  values: {
    email: '',
  },
  errors: {
    email: '',
  },
  validities: {
    email: false,
  },
};

export const intitialValuesRegister: TFormRegister = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {
    name: '',
    email: '',
    password: '',
  },
  validities: {
    name: false,
    email: false,
    password: false,
  },
}; */
/*
export const intitialValuesResetPass: TForm = {
  values: {
    password: '',
    token: '',
  },
  errors: {
    password: '',
    token: '',
  },
  validities: {
    password: false,
    token: false,
  },
}; */

export const numberslist: Array<number> = [55566, 77984, 56464];

export const firstIngred = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: '',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
};

export const initialElement: TOrderWithIngredients = {
  createdAt: '',
  name: 'название заказа',
  ingredients: [firstIngred],
  number: 0,
  status: '',
  updatedAt: '',
  _id: '1112222333344455567',
};

export const firstIngredUniq = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: '',
  image_mobile: '',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
  uniqueId: 'sdfs',
};
