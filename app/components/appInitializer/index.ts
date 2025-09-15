import {
  clearSettingsLS,
  loadSettingsFromLS,
} from '@/store/slices/settings/settingsLS.ts';

import { useEffect } from 'react';

import { Auth } from '@/sources/enums';

import { errors } from '@/sources/messages/errors';

import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/useSaveUserToLS';

export default function AppInitializer() {
  const { setUser, loadSettings } = useActions();
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
      clearSettingsLS();
    }

    loadSettings(loadSettingsFromLS());
  }, [setUser, loadSettings, removeUserFromStorage]);

  return null;
}
