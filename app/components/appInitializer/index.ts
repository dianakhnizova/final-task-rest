import { useEffect } from 'react';

import { Auth } from '@/sources/enums';

import { errors } from '@/sources/messages/errors';

import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export default function AppInitializer() {
  const { setUser } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(Auth.USER, null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(Auth.USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log(errors.parseError, error);
      removeUserFromStorage();
    }
  }, [setUser, removeUserFromStorage]);

  return null;
}
