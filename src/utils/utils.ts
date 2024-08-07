import { TForm, TOrder, TOrderWithIngredients } from './types';

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

export const numberslist: Array<number> = [55566, 77984, 56464];

export const firstIngred = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
};

export const firstIngredQty = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',

  qty: 0,
};

export const initialElement: TOrderWithIngredients = {
  createdAt: '',
  name: 'название заказа',
  ingredients: [firstIngredQty],
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png',
  name: 'Выберите булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  _id: '0',
  uniqueId: 'sdfs',
};

export const firstorderString: TOrder = {
  createdAt: '2022-09-05T06:57:36.071Z',
  ingredients: [''],
  name: 'название заказа',
  number: 0,
  status: '',
  updatedAt: '',
  _id: '',
};

export const firstorder: TOrderWithIngredients = {
  createdAt: '2022-09-05T06:57:36.071Z',
  ingredients: [firstIngredQty],
  name: 'название заказа',
  number: 0,
  status: '',
  updatedAt: '',
  _id: '',
};

export const config = {
  // BASE_URL: 'https://norma.nomoreparties.space/api',
  BASE_URL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const configIng = {
  BASE_URL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
};


export const getResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка при соединении: ${res.status}`);
  }
};

export const registerSuccessMessage =
  'Успешная регистрация. Перенаправляем на страницу входа';
