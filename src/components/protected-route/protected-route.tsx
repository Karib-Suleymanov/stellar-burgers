import { FC, ReactElement } from 'react';
import { Location, Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthChecked, selectUser } from '@selectors';
import { Preloader } from '@ui';

import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  const hasToken = Boolean(getCookie('accessToken'));
  const isAuthorized = Boolean(user || hasToken);

  if (hasToken && !isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthorized) {
    const fromPath =
      (location.state as { from?: Location } | null)?.from?.pathname || '/';
    return <Navigate to={fromPath} replace />;
  }

  if (!onlyUnAuth && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
