import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { SET_LOGGED } from "../../services/actions";
import { useLocation } from "react-router-dom";

function ProtectedRouteLogged({ children, ...rest }) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      dispatch({
        type: SET_LOGGED,
      });
    }
  }, []);

  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <Route
      {...rest}
      render={() =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: location.pathname } }}
          />
        )
      }
    />
  );
}

export default ProtectedRouteLogged;
