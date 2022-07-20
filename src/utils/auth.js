class AuthAndRegister {
  constructor(apiData) {
    this._baseUrl = apiData.BASE_URL;
    this._headers = apiData.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка при соединении: ${res.status}`);
    }
  }

  requestResetPassword(data) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",

      headers: this._headers,

      body: JSON.stringify({ email: data }),
    }).then(this._getResponse);
  }

  resetPassword(newPass, token) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",

      headers: this._headers,

      body: JSON.stringify({ password: newPass, token }),
    }).then(this._getResponse);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then(this._getResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponse);
  }

  getUser(accessToken) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then(this._getResponse);
  }

  updateUser(email, name, password, accessToken) {
    let bodySent = { email, name };
    if (password.length > 0) {
      bodySent = { email, name, password };
    }
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(bodySent),
    }).then(this._getResponse);
  }

  refreshToken(refreshToken) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: refreshToken }),
    }).then(this._getResponse);
  }

  logout(refreshToken) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: refreshToken }),
    }).then(this._getResponse);
  }
}

function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000 * 60);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const authApi = new AuthAndRegister({
  BASE_URL: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { authApi, setCookie, getCookie };
