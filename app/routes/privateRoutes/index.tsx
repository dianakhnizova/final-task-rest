import { selectAuth } from '@/store/slices/auth/selectors';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AppRoutes } from '@/sources/enums';

export default function PrivateRoutes() {
  const user = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}
