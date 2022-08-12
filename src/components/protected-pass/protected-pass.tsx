import React, { FC, useEffect } from "react";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";

type TPassProps = {
  children? : Array<React.ReactNode>;
  path? : string;
}

type TLocation = {
  state? : {
    from: string
  };
  from: string
}


const ProtectedPass: FC<TPassProps> = ({ children, ...rest }) => {
// function ProtectedPass({ children, ...rest }) {
  const history = useHistory();
  const location = useLocation<TLocation>();

  const cameFrom = location.state?.from;
  

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
