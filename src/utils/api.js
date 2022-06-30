class Api {
  constructor(apiData) {
    this._baseUrl = apiData.BASE_URL;
    this._headers = apiData.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log(res);
      return Promise.reject(`Ошибка при соединении: ${res.status}`);
    }
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponse);
  }

  makeOrder(ingredients) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(ingredients),
    }).then(this._getResponse);
  }
}
const api = new Api({
  BASE_URL: 'https://norma.nomoreparties.space/api',
  headers: {
    "Content-Type": "application/json",
    
  },
});

export default api;
