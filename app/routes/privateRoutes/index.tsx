import { selectAuth } from '@/store/slices/auth/selectors';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { AppRoutes } from '@/sources/enums';

export default function PrivateRoutes() {
  const user = useSelector(selectAuth);

  if (!user) {
    return <Navigate to={AppRoutes.SIGN_IN} replace />;
  }

  return <Outlet />;
}
