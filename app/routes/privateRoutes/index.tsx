import {
  selectAuth,
  selectIsAuthenticated,
} from '@/store/slices/auth/selectors';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AppRoutes } from '@/sources/enums';

export default function PrivateRoutes() {
  const user = useSelector(selectAuth);
  const isTokenValid = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isTokenValid) {
      const currentUrl = window.location.pathname;

      const redirectParams = new URLSearchParams({
        redirect: currentUrl,
      });

      const signInUrl = `${AppRoutes.SIGN_IN}?${redirectParams.toString()}`;

      navigate(signInUrl, { replace: true });
    }
  }, [user, navigate, isTokenValid]);

  if (!user || !isTokenValid) return null;

  return <Outlet />;
}
