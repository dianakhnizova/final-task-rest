import { selectIsAuthenticated } from '@/store/slices/auth/selectors';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AppRoutes, LS_KEY } from '@/sources/enums';
import { toasts as toastMessages } from '@/sources/messages/toasts';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export default function PrivateRoutes() {
  const isTokenValid = useSelector(selectIsAuthenticated);

  const { setError, clearUser } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(LS_KEY.USER, null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid) {
      clearUser();
      removeUserFromStorage();

      setError(toastMessages.tokenExpires);
      toast.error(toastMessages.tokenExpires, {
        id: toastMessages.tokenExpires,
      });
      navigate(AppRoutes.HOME, { replace: true });
    }
  }, [navigate, isTokenValid, setError]);

  return <Outlet />;
}
