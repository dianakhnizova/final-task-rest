import {
  clearSettingsLS,
  loadSettingsFromLS,
} from '@/store/slices/settings/settingsLS.ts';

import { useEffect } from 'react';

import toast from 'react-hot-toast';

import { Auth } from '@/sources/enums';

import { errors } from '@/sources/messages/errors';
import { toasts as toastMessages } from '@/sources/messages/toasts';

import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export default function AppInitializer() {
  const { setUser, loadSettings } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(Auth.USER, null);

  useEffect(() => {
    toast.success(toastMessages.appInitializing, {
      id: toastMessages.appInitializingId,
    });
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
