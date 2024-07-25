import { configIng, getResponse } from './utils';

const getIngredients = () => {
  return fetch(`${configIng.BASE_URL}/ingredients`, {
    method: 'GET',
    headers: configIng.headers,
  }).then(getResponse);
};

const makeOrderWithToken = (
  ingredients: Array<string>,
  accessToken: string
) => {
  console.log('ingred: ', { ingredients });
  return fetch(`${configIng.BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({ ingredients }),
  }).then(getResponse);
};

export { getIngredients, makeOrderWithToken };
