import { TForm } from './types';

export const intitialValuesLogin: TForm = {
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

export const intitialValuesPass: TForm = {
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

export const intitialValuesRegister: TForm = {
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
};

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
};

export const numberslist: Array<number> = [55566, 77984, 56464];