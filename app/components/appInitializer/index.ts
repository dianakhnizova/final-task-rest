import { useEffect } from 'react';
import { useActions } from '@/utils/hooks/useActions';
import { Auth } from '@/sources/enums';

export default function AppInitializer() {
  const { setUser } = useActions();

  useEffect(() => {
    const savedUser = localStorage.getItem(Auth.USER);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return null;
}
