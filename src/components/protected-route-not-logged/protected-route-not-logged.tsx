import React from "react";
import { useSelector } from "react-redux";

import { Route, Redirect, useLocation } from "react-router-dom";

function ProtectedRouteNotLogged({ children, ...rest }) {
  const location = useLocation();
  const cameFrom = location?.state?.from || "/";
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <Route
      {...rest}
      render={() => (!isLogged ? children : <Redirect to={cameFrom} />)}
    />
  );
}

export default ProtectedRouteNotLogged;
