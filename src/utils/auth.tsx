import { config, getResponse } from './utils';



const requestResetPassword = (data: string) => {
  return fetch(`${config.BASE_URL}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ email: data }),
  }).then(getResponse);
};

const resetPassword = (newPass: string, token: string) => {
  return fetch(`${config.BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ password: newPass, token }),
  }).then(getResponse);
};

const register = (email: string, password: string, name: string) => {
  return fetch(`${config.BASE_URL}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ email, password, name }),
  }).then(getResponse);
};

const login = (email: string, password: string) => {
  return fetch(`${config.BASE_URL}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
};

const getUser = (accessToken: string) => {
  return fetch(`${config.BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).then(getResponse);
};

type TUser = {
  email: string;
  name: string;
  password?: string;
};

const updateUser = (
  email: string,
  name: string,
  password: string,
  accessToken: string
) => {
  let bodySent: TUser = { email, name };
  if (password.length > 0) {
    bodySent = { email, name, password };
  }
  return fetch(`${config.BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(bodySent),
  }).then(getResponse);
};

const refreshToken = (refreshToken: string) => {
  return fetch(`${config.BASE_URL}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponse);
};

const logout = (refreshToken: string) => {
  return fetch(`${config.BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponse);
};

type TSetCookieProps = {
  expires?: any;
  [x: string]: any;
};
const setCookie = (
  name: string,
  value: string,
  props: TSetCookieProps | undefined
) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000 * 60);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export {
  requestResetPassword,
  resetPassword,
  register,
  login,
  getUser,
  updateUser,
  refreshToken,
  logout,
  setCookie,
  getCookie,
};
