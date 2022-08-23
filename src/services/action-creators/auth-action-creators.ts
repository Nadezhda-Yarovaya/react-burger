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

import { AppDispatch } from '../..';
import { AppThunk } from '../../utils/types';
import { AnyAction } from 'redux';


export const performRegister = (name: string, email: string, pass: string, history: History) : AppThunk => (dispatch: AppDispatch) => {
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

  export const performLogin = (email, pass, history): AppThunk => (dispatch: AppDispatch) => {

    const cameFrom = history.location?.state?.from || '/';
    login(email, pass)
      .then((res) => {
        if (res && res.accessToken) {
          // updateCookie(res);

          let authToken = res.accessToken.split('Bearer ')[1];
          console.log('when perform login authtoken: ', authToken);
          if (authToken) {
            console.log('set cookie upon login ' );
            setCookie('token', authToken, { expires: 1 }); // expires in minutes
          }
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
          handleApiMessageError(dispatch,  'Ошибка email или пароля');
        }
      })

      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  };

  export const getLaureatesAction = (): IGetLaureatesAction => ({
    type: LAUREATES_REQUEST
  });

const handleGetUser=
  (accessToken: string): AppThunk  => (dispatch: AppDispatch,  getState) => {
    getUser(accessToken).then((res) => {
      dispatch({ type: GET_USER, payload: res.user });
    });
  };

export const handleUpdateUser  =
  (email, name, pass, accessToken): AppThunk  => (dispatch: AppDispatch,  getState) => {
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

export const loadUser = () : AppThunk  => (dispatch: AppDispatch,  getState) => {
  if (getCookie('token')) {
    const accessToken = getCookie('token');
    return dispatch(handleGetUser(accessToken));
  } else {
    const refeshSaved = localStorage.getItem('refreshToken');
    return dispatch(handleRefreshToken(refeshSaved, handleGetUser));
  }
};

export const patchUser =
  (email, name, pass) : AppThunk  => (dispatch: AppDispatch,  getState) => {
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

const handleRefreshToken =
  (refeshSaved, handleUser, ...rest) : AppThunk  =>
  (dispatch: AppDispatch,  getState) => {
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

export const performLogout =
  (refreshToken, history) : AppThunk  => (dispatch: AppDispatch,  getState) => {
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

export const handleRequestResetPassword =
  (email, history): AppThunk  => () => {
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
  (pass, token, history): AppThunk  => (dispatch: AppDispatch,  getState) => {
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