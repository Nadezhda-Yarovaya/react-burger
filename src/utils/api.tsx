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

const makeOrder = (ingredients: Array<string>) => {
  console.log('ingred make Order: ', ingredients);
  console.log('ingred make Order: ', JSON.stringify(ingredients));
  const ingred1 = JSON.stringify(ingredients);

  return fetch(`${config.BASE_URL}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: ingred1,
  }).then(_getResponse);
};

const makeOrderWithToken = (ingredients: Array<string>, accessToken: string) => {
  console.log('ingred: ', ingredients);
  console.log('acces tok: ', accessToken);
  return fetch(`${config.BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
    body: JSON.stringify(ingredients),
  }).then(_getResponse);
};


export { getIngredients, makeOrder, makeOrderWithToken };
