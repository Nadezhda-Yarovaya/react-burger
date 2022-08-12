import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { SET_LOGGED } from "../../services/actions";
import { useLocation } from "react-router-dom";
import { TProtectedProps } from "../../utils/types";

const ProtectedRouteLogged: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation<any>();

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      dispatch<any>({
        type: SET_LOGGED,
      });
    }
  }, []);

  const isLogged = useSelector((state: any) => state.auth.isLogged);

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
