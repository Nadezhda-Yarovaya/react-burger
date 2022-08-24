import {
  GET_USER,
  SET_LOGGEDOUT,
  SET_LOGGED,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
  GET_USER_REQUEST,
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
import { IGetUserReq } from '../action-types/auth-action-types';
import { History, LocationState } from 'history';

export const performRegister =
  (
    name: string,
    email: string,
    pass: string,
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

export const getUserAction = (): IGetUserReq => ({
  type: GET_USER_REQUEST,
});

const handleGetUser =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    dispatch(getUserAction());
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

export const loadUser = (): AppThunk => (dispatch) => {
  const accessToken = getCookie('token');
  if (accessToken) {
    return dispatch(handleGetUser(accessToken));
  } else {
    const refreshSaved = localStorage.getItem('refreshToken');
    if (refreshSaved) {
      return dispatch(
        handleRefreshToken(refreshSaved, handleGetUser, '', '', '')
      );
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
        return dispatch(
          handleRefreshToken(refreshSaved, handleUpdateUser, email, name, pass)
        );
      }
    }
  };

export const handleRefreshToken =
  (
    refeshSaved: string,
    handleUser: (
      email: string,
      name: string,
      pass: string,
      accessToken: string
    ) => AppThunk,
    ...rest: Array<string>
  ): AppThunk =>
  (dispatch) => {
    refreshToken(refeshSaved)
      .then((res) => {
        localStorage.removeItem('refreshToken');
        localStorage.setItem('refreshToken', res.refreshToken);
        let authToken;
        authToken = res.accessToken.split('Bearer ')[1];
        console.log('authtok: ', authToken);
        if (authToken) {
          setCookie('token', authToken, { expires: 1 }); // expires in minutes
        }
        const email = rest[0];
        const name = rest[1];
        const pass = rest[2];

        return dispatch(handleUser(authToken, email, name, pass));
      })
      .catch((err) => console.log(err));
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
          // переадресация
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
