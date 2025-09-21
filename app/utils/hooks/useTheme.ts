import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { errors } from '@/sources/messages/errors';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(errors.themeError);
  }

  return context;
};
