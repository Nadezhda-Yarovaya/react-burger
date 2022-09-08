import { getResponse } from './utils';

const config = {
  BASE_URL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getIngredients = () => {
  return fetch(`${config.BASE_URL}/ingredients`, {
    method: 'GET',
    headers: config.headers,
  }).then(getResponse);
};

const makeOrderWithToken = (
  ingredients: Array<string>,
  accessToken: string
) => {
  console.log('ingred: ', {ingredients});
  return fetch(`${config.BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({ ingredients }),
  }).then(getResponse);
};

export { getIngredients, makeOrderWithToken };
