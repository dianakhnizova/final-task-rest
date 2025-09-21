import {
  clearSettingsLS,
  loadSettingsFromLS,
} from '@/store/slices/settings/settingsLS.ts';
import { useEffect, useState } from 'react';
import { LS_KEY } from '@/sources/enums';
import { errors } from '@/sources/messages/errors';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';

export const useAppInitializer = () => {
  const { setUser, loadSettings } = useActions();
  const { removeUserFromStorage } = useSaveUserToLS(LS_KEY.USER, null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LS_KEY.USER);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log(errors.parseError, error);

      removeUserFromStorage();
      clearSettingsLS();
    }

    loadSettings(loadSettingsFromLS());
    setIsInitialized(true);
  }, []);

  return isInitialized;
};
