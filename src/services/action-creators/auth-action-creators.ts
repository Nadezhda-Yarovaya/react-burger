import {
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

import { AppDispatch } from '../..';
import { AppThunk, TLocation } from '../../utils/types';
import { History, LocationState } from 'history';

export const performRegister =
  (   
    email: string,
    pass: string,
    name: string,
    history: History<LocationState>
  ): AppThunk =>
  (dispatch: AppDispatch) => {
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

export const performLogin =
  (
    email: string,
    pass: string,
    location: TLocation,
    history: History<LocationState>
  ): AppThunk =>
  (dispatch) => {
    const cameFrom = location?.state?.from || '/';
    login(email, pass)
      .then((res) => {
        if (res && res.accessToken) {
          let authToken = res.accessToken.split('Bearer ')[1];
          if (authToken) {
            setCookie('token', authToken, { expires: 1 }); // expires in minutes
          }
          localStorage.setItem('refreshToken', res.refreshToken);
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
          handleApiMessageError(dispatch, 'Ошибка email или пароля');
        }
      })

      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  };

export const performLogout =
  (refreshToken: string, history: History<LocationState>): AppThunk =>
  (dispatch) => {
    logout(refreshToken)
      .then((res) => {
        localStorage.removeItem('refreshToken');
        dispatch({
          type: SET_LOGGEDOUT,
        });
        history.push('/login');
      })
      .catch((err) => console.log(err));
  };

export const handleRequestResetPassword =
  (email: string, history: History<LocationState>): AppThunk =>
  () => {
    return requestResetPassword(email)
      .then((res) => {
        if (res.success) {
          history.push({
            pathname: '/reset-password',
            state: { from: 'forgot-password' },
          });
        }
      })
      .catch((err) => console.log(err));
  };

export const resetPass =
  (pass: string, token: string, history: History<LocationState>): AppThunk =>
  (dispatch) => {
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

export function handleApiMessageError(dispatch: AppDispatch, message: string) {
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

/* functions that require RefreshToken */
export const loadUser = (): AppThunk => (dispatch) => {
  const accessToken = getCookie('token');
  if (accessToken) {
    return dispatch(handleGetUser(accessToken));
  } else {
    const refreshSaved = localStorage.getItem('refreshToken');
    if (refreshSaved) {
      return dispatch(handleRefreshTokenForGetUser());
    }
  }
};

export const patchUser =
  (email: string, name: string, pass: string): AppThunk =>
  (dispatch) => {
    const accessToken = getCookie('token');
    if (accessToken) {
      return dispatch(handleUpdateUser(accessToken, email, name, pass));
    } else {
      const refreshSaved = localStorage.getItem('refreshToken');
      if (refreshSaved) {
        return dispatch(handleRefreshTokenForPatchUser(email, name, pass));
      }
    }
  };

/* functions to UpdateToken */
export const handleRefreshTokenForPatchUser =
  (email: string, name: string, pass: string): AppThunk =>
  (dispatch) => {
    const refreshSaved = localStorage.getItem('refreshToken');
    if (refreshSaved) {
      refreshToken(refreshSaved)
        .then((res) => {
          let authToken = handleUpdateTokens(res.refreshToken, res.accessToken);
          return dispatch(handleUpdateUser(authToken, email, name, pass));
        })
        .catch((err) => console.log(err));
    }
  };

export const handleRefreshTokenForGetUser = (): AppThunk => (dispatch) => {
  const refreshSaved = localStorage.getItem('refreshToken');
  if (refreshSaved) {
    refreshToken(refreshSaved)
      .then((res) => {
        let authToken = handleUpdateTokens(res.refreshToken, res.accessToken);
        return dispatch(handleGetUser(authToken));
      })
      .catch((err) => console.log(err));
  }
};

/* handle functions */
const handleGetUser =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    getUser(accessToken).then((res) => {
      dispatch({ type: GET_USER, payload: res.user });
    });
  };

export const handleUpdateUser =
  (accessToken: string, email: string, name: string, pass: string): AppThunk =>
  (dispatch) => {
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

/* function to deal with 2 tokens */
export const handleUpdateTokens = (
  givenRefreshToken: string,
  givenAccessToken: string
): string => {
  const tempToken = localStorage.getItem('refreshTokenTemp');
  if (tempToken) {
    localStorage.removeItem('refreshTokenTemp');
  }
  localStorage.setItem('refreshTokenTemp', givenRefreshToken);
  let authToken;
  authToken = givenAccessToken.split('Bearer ')[1];
  if (authToken) {
    setCookie('token', authToken, { expires: 20 }); // expires in minutes
  }
  return authToken;
};
