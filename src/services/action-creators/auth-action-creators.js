import {
  LOGIN_SUCCESS,
  GET_USER,
  SET_LOGGEDOUT,
  SET_LOGGED,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
} from '../actions';

import {
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
} from '../../utils/auth';

export function performRegister(name, email, pass, history) {
  return (dispatch, getState) => {
    register(email, pass, name)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: {
              message: 'Успешная регистрация. Перенаправляем на страницу входа',
              success: true,
            },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });
            history.push('./login');
          }, 2000);
        }
      })

      .catch((err) => console.log(err));
  };
}

export function performLogin(email, pass, history) {
  return (dispatch, getState) => {
    const cameFrom = history.location?.state?.from || '/';
    login(email, pass)
      .then((res) => {
        if (res && res.accessToken) {
          updateCookie(res);
          localStorage.setItem('refreshToken', res.refreshToken); // не меняется, только access менеятся
        }
        if (res && res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: 'Успешный вход в систему', success: true },
          });

          setTimeout(() => {
            dispatch({
              type: SET_LOGGED,
            });
            dispatch({
              type: CLEAR_APIMESSAGE,
            });

            history.push({ pathname: cameFrom, state: { from: '/login' } });
          }, 1500);
        } else {
          handleApiMessageError(dispatch, 'Ошибка e-mail или пароля');
        }
      })

      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  };
}

function handleGetUser(accessToken) {
  return (dispatch, getState) => {
    getUser(accessToken).then((res) => {
      dispatch({ type: GET_USER, payload: res.user });
    });
  };
}

export function handleUpdateUser(email, name, pass, accessToken) {
  return (dispatch, getState) => {
    if (accessToken) {
      updateUser(email, name, pass, accessToken)
        .then((res) => {
          dispatch({
            type: GET_USER,
            payload: res.user,
          });
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: {
              message: 'Данные профиля успешно обновлены',
              success: true,
            },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });
          }, 2000);
        })
        .catch((err) => {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: err, success: false },
          });
        });
    }
  };
}
export function loadUser() {
  return (dispatch, getState) => {
    if (getCookie('token')) {
      const accessToken = getCookie('token');
      return dispatch(handleGetUser(accessToken));
    } else {
      const refeshSaved = localStorage.getItem('refreshToken');
      return dispatch(handleRefreshToken(refeshSaved, handleGetUser));
    }
  };
}

export function patchUser(email, name, pass) {
  return (dispatch, getState) => {
    const accessToken = getCookie('token');

    if (getCookie('token')) {
      return dispatch(handleUpdateUser(email, name, pass, accessToken));
    } else {
      const refeshSaved = localStorage.getItem('refreshToken');
      return dispatch(
        handleRefreshToken(refeshSaved, handleUpdateUser, email, name, pass)
      );
    }
  };
}

function handleRefreshToken(refeshSaved, handleUser, ...rest) {
  return (dispatch, getState) => {
    refreshToken(refeshSaved).then((res) => {
      localStorage.removeItem('refreshToken');
      localStorage.setItem('refreshToken', res.refreshToken);
      let authToken;
      authToken = res.accessToken.split('Bearer ')[1];
      if (authToken) {
        setCookie('token', authToken, { expires: 20 }); // expires in minutes
      }

      if (rest.length > 0) {
        const email = rest[0];
        const name = rest[1];
        const pass = rest[2];

        return dispatch(handleUser(email, name, pass, authToken));
      }

      return dispatch(handleUser(authToken));
    });
  };
}

export function performLogout(refreshToken, history) {
  return (dispatch, getState) => {
    logout(refreshToken)
      .then((res) => {
        localStorage.removeItem('refreshToken');
        //dispatch null user
        dispatch({
          type: SET_LOGGEDOUT,
        });
        history.push('/login');
      })
      .catch((err) => console.log(err));
  };
}

function updateCookie(res) {
  let authToken;
  authToken = res.accessToken.split('Bearer ')[1];
  if (authToken) {
    setCookie('token', authToken, { expires: 1 }); // expires in minutes
  }
}

export function handleRequestResetPassword(email, history) {
  return (dispatch, getState) => {
    return requestResetPassword(email)
      .then((res) => {
        if (res.success) {
          // переадресация
          history.push({
            pathname: '/reset-password',
            state: { from: 'forgot-password' },
          });
        }
      })
      .catch((err) => console.log(err));
  };
}

export function resetPass(pass, token, history) {
  return (dispatch, getState) => {
    resetPassword(pass, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: 'Успешное обновление пароля', success: true },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });

            history.push('./login');
          }, 1500);
        } else {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: res.message, success: false },
          });
          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });
          }, 2500);
        }
      })
      .catch((err) => console.log(err));
  };
}

export function handleApiMessageError(dispatch, message) {
  dispatch({
    type: SHOW_APIMESSAGE,
    payload: {
      message: message,
      success: false,
    },
  });

  setTimeout(() => {
    dispatch({ type: CLEAR_APIMESSAGE });
  }, 2500);
}
