import { type ReactNode } from 'react';
import { useAppInitializer } from '@/utils/hooks/useAppInitializer';

interface AppInitWrapperProps {
  children: ReactNode;
}

export default function AppInitWrapper({ children }: AppInitWrapperProps) {
  useAppInitializer();
  return <>{children}</>;
}
