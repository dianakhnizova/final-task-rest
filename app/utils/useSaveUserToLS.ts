import { useState } from 'react';

import type { User } from '@supabase/supabase-js';

import { Auth } from '@/sources/enums';

import { errors } from '@/sources/messages/errors';

import { useActions } from './hooks/useActions';

export const useSaveUserToLS = (key: string, initialValue: User | null) => {
  const { setUser } = useActions();

  const [storedValue, setStoredValue] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as User) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setUserToStorage = (value: User) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));

      if (key === Auth.USER) {
        setUser(value);
      }
    } catch (error) {
      console.log(errors.parseError, error);
      localStorage.removeItem(Auth.USER);
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
