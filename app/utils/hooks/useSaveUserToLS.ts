import { useState } from 'react';

import { LS_KEY } from '@/sources/enums';
import type { AuthUser } from '@/sources/interfaces';

import { errors } from '@/sources/messages/errors';

import { useActions } from './useActions';

export const useSaveUserToLS = (key: string, initialValue: AuthUser | null) => {
  const { setUser } = useActions();

  const [storedValue, setStoredValue] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as AuthUser) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setUserToStorage = (value: AuthUser) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));

      if (key === LS_KEY.USER) {
        setUser(value);
      }
    } catch (error) {
      console.log(errors.parseError, error);
      localStorage.removeItem(LS_KEY.USER);
    }
  };

  const removeUserFromStorage = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.log(errors.parseError, error);
    }
  };

  return { storedValue, setUserToStorage, removeUserFromStorage };
};
