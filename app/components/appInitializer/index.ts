import { useEffect } from 'react';
import { useActions } from '@/utils/hooks/useActions';

export default function AppInitializer() {
  const { setUser } = useActions();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return null;
}
