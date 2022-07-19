import React, { useEffect } from "react";

import { Route, Redirect } from "react-router-dom";

function ProtectedRouteNotLogged({ children, ...rest }) {
  useEffect(() => {}, []);

  const isLogged = localStorage.getItem("refreshToken");

  return (
    <Route
      {...rest}
      render={() => (!isLogged ? children : <Redirect to="/" />)}
    />
  );
}

export default ProtectedRouteNotLogged;
