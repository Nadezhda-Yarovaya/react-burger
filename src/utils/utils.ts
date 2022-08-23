import { TForm, TFormLogin, TFormPass, TFormRegister } from './types';

export const initialValues1 : TForm = {
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

} 
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


export const initialElement = {
  name: 'Флюоресцентный традиционный-галактический бургер',
  order: { number: 9094 },
  status: 'Готовится',
  positions: [
    {
      _id: '60d3b41abdacab0026a733c7',
  calories: 5,
  carbohydrates: 5,
  fat: 5,
  proteins: 1,
  price: 1,
  name: 'sdfsf',
  image: 'sdfsf',
  image_mobile: 'sdfsf',
  image_large: 'sdfsf',  
  uniqueId: 'sdfsfeee22',
    }, 
  ],
  sum: 2100,
  date: '2022-05-04',
  _id: '1112222333344455567',
}