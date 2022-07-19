import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { SET_LOGGED } from "../../services/actions";

function ProtectedRouteLogged({ children, ...rest }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      dispatch({
        type: SET_LOGGED,
      });
    }
  }, []);

  const isLogged = localStorage.getItem("refreshToken");

  return (
    <Route
      {...rest}
      render={() =>
        isLogged ? (
          children
        ) : (
          // Если пользователя нет в хранилище, происходит переадресация на роут /login
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRouteLogged;
