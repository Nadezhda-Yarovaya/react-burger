class AuthAndRegister {
  constructor(apiData) {
    this._baseUrl = apiData.BASE_URL;
    this._headers = apiData.headers;
  }

  _getResJson(res) {
    return res.json();
  }

  _getResponse(res) {
    if (res.ok) {
    } else {
      return Promise.reject(`Ошибка при соединении: ${res.status}`);
    }
  }

  requestResetPassword(data) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",

      headers: this._headers,

      body: JSON.stringify({ email: data }),
    }).then((res) => {

      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (error) {

        return error;
      }
    });
  }

  resetPassword(newPass, token) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",

      headers: this._headers,

      body: JSON.stringify({ password: newPass, token }),
    }).then((res) => {

      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (error) {

        return error;
      }
    });
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (error) {
        console.log("ошибка при регистрации :", error);
        return error;
      }
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (error) {
        console.log("ошибка при входе :", error);
        return error;
      }
    });
  }

  getUser(accessToken) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        try {
          if (res.status === 200 || res.status === 201) {
            return res.json();
          }
        } catch (error) {
          console.log("error in get user :", error);

          return error;
        }
      })

      .catch((err) => console.log("Ошибка при регистрации от сервера: " + err)); // don't know yet, why it's necessary
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
    }).then((res) => {
      try {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        }
      } catch (error) {
        console.log("error in patch :", error);
        return error;
      }
    });
  }

  refreshToken(refreshToken) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при обновлении токена: ${res.status}`);
    });
  }

  logout(refreshToken) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
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
  console.log("expire: ", exp);
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  // console.log("cookie: ", updatedCookie);
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

export { authApi, setCookie, getCookie };

const authApi = new AuthAndRegister({
  BASE_URL: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});
