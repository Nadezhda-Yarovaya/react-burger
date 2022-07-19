import {
  LOGIN_SUCCESS,
  GET_USER,
  SET_LOGGEDOUT,
  SET_LOGGED,
  SHOW_APIMESSAGE,
  CLEAR_APIMESSAGE,
} from "../actions";

import { authApi, getCookie, setCookie } from "../../utils/auth";

export function performRegister(name, email, pass, history) {
  return (dispatch, getState) => {
    authApi
      .register(email, pass, name)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: {
              message: "Успешная регистрация. Перенаправляем на страницу входа",
              success: true,
            },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });
            history.push("./login");
          }, 2000);
        }
      })

      .catch((err) => console.log(err));
  };
}

export function performLogin(email, pass, history) {
  return (dispatch, getState) => {
    authApi
      .login(email, pass)
      .then((res) => {
        if (res && res.accessToken) {
          updateCookie(res);
          localStorage.setItem("refreshToken", res.refreshToken); // не меняется, только access менеятся
        }
        if (res && res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: "Успешный вход в систему", success: true },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });
            dispatch({
              type: LOGIN_SUCCESS,
              payload: { email },
            });
            dispatch({
              type: SET_LOGGED,
            });
            history.push({ pathname: "./", state: { from: "./login" } });
          }, 1500);
        } else {
          handleApiMessageError(dispatch, res.mmessage);
        }
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
}

function handleGetUser(accessToken) {
  return (dispatch, getState) => {
    authApi.getUser(accessToken).then((res) => {
      dispatch({ type: GET_USER, payload: res.user });
    });
  };
}

export function handleUpdateUser(email, name, pass, accessToken) {
  return (dispatch, getState) => {
    if (accessToken) {
      authApi
        .updateUser(email, name, pass, accessToken)
        .then((res) => {
          dispatch({
            type: GET_USER,
            payload: res.user,
          });
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: {
              message: "Данные профиля успешно обновлены",
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
    if (getCookie("token")) {
      const accessToken = getCookie("token");
      return dispatch(handleGetUser(accessToken));
    } else {
      const refeshSaved = localStorage.getItem("refreshToken");
      return dispatch(handleRefreshToken(refeshSaved, handleGetUser));
    }
  };
}

export function patchUser(email, name, pass) {
  return (dispatch, getState) => {
    const accessToken = getCookie("token");

    if (getCookie("token")) {
      return dispatch(handleUpdateUser(email, name, pass, accessToken));
    } else {
      const refeshSaved = localStorage.getItem("refreshToken");
      return dispatch(
        handleRefreshToken(refeshSaved, handleUpdateUser, email, name, pass)
      );
    }
  };
}

function handleRefreshToken(refeshSaved, handleUser, ...rest) {
  return (dispatch, getState) => {
    authApi.refreshToken(refeshSaved).then((res) => {
      localStorage.removeItem("refreshToken");
      localStorage.setItem("refreshToken", res.refreshToken);
      let authToken;
      authToken = res.accessToken.split("Bearer ")[1];
      if (authToken) {
        setCookie("token", authToken, { expires: 20 }); // expires in minutes
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
    authApi
      .logout(refreshToken)
      .then((res) => {
        localStorage.removeItem("refreshToken");
        //dispatch null user
        dispatch({
          type: SET_LOGGEDOUT,
        });
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };
}

function updateCookie(res) {
  let authToken;
  authToken = res.accessToken.split("Bearer ")[1];
  if (authToken) {
    setCookie("token", authToken, { expires: 1 }); // expires in minutes
  }
}

export function handleRequestResetPassword(email, history) {
  return (dispatch, getState) => {
    return authApi
      .requestResetPassword(email)
      .then((res) => {
        if (res.success) {
          // переадресация
          history.push({
            pathname: "/reset-password",
            state: { from: "forgot-password" },
          });
        }
      })
      .catch((err) => console.log(err));
  };
}

export function resetPass(pass, token, history) {
  return (dispatch, getState) => {
    authApi
      .resetPassword(pass, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SHOW_APIMESSAGE,
            payload: { message: "Успешное обновление пароля", success: true },
          });

          setTimeout(() => {
            dispatch({
              type: CLEAR_APIMESSAGE,
            });

            history.push("./login");
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
  }, 2000);
}
