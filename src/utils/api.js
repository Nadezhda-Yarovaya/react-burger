const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

function getIngredients() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка соединения: ${res.status}`);
    }
  });
}

export default getIngredients;
