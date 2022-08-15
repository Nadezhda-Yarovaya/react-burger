import React, { FC } from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { TLocation } from '../../utils/types';

const ProtectedPass: FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation<TLocation>();

  const cameFrom = location.state?.from;

  return (
    <Route {...rest}>
      {cameFrom === 'forgot-password' ? (
        children
      ) : (
        <Redirect to='/forgot-password' />
      )}
    </Route>
  );
};

export default ProtectedPass;
