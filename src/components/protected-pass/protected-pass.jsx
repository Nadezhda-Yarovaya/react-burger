import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

function ProtectedPass({ children, ...rest }) {
  const history = useHistory();

  let cameFrom = "";

  if (history.location.state) {
    cameFrom = history.location.state.from;
  }

  return (
    <Route
      {...rest}
      render={() =>
        cameFrom === "forgot-password" ? (
          children
        ) : (
          <Redirect to="/forgot-password" />
        )
      }
    />
  );
}

export default ProtectedPass;
