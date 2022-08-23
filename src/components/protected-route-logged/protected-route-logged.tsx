import { FC, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { SET_LOGGED } from '../../services/actions';
import { useLocation } from 'react-router-dom';
import { TLocation } from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/hooks';

const ProtectedRouteLogged: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      dispatch({
        type: SET_LOGGED,
      });
    }
  }, []);

  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <Route {...rest}>
      {isLogged ? (
        children
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: location.pathname } }}
        />
      )}
    </Route>
  );
};

export default ProtectedRouteLogged;
