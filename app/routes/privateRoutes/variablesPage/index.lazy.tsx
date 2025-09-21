import { Suspense, lazy } from 'react';

import { WaitingLoader } from '@/components/ui/waitingLoader';

const VariablesPage = lazy(
  () => import('@/routes//privateRoutes/variablesPage')
);

export default function VariablesPageLazy() {
  return (
    <Suspense fallback={<WaitingLoader />}>
      <VariablesPage />
    </Suspense>
  );
}

export { meta } from '@/routes//privateRoutes/variablesPage';
