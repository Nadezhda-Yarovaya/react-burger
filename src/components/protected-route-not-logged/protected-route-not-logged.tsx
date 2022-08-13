import  { FC } from 'react';
import { useSelector } from 'react-redux';

import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { TLocation } from '../../utils/types';

const ProtectedRouteNotLogged: FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation<TLocation>();
  const cameFrom = location?.state?.from || '/';
  const isLogged = useSelector((state: any) => state.auth.isLogged);

  return (
    <Route {...rest}>{!isLogged ? children : <Redirect to={cameFrom} />}</Route>
  );
};

export default ProtectedRouteNotLogged;
