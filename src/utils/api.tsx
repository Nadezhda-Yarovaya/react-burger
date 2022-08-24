const config = {
  BASE_URL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
};
const _getResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    console.log(res);
    return Promise.reject(`Ошибка при соединении: ${res.status}`);
  }
};

const getIngredients = () => {
  return fetch(`${config.BASE_URL}/ingredients`, {
    method: 'GET',
    headers: config.headers,
  }).then(_getResponse);
};

const makeOrderWithToken = (
  ingredients: Array<string>,
  accessToken: string
) => {
  return fetch(`${config.BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({ ingredients }),
  }).then(_getResponse);
};

export { getIngredients, makeOrderWithToken };
