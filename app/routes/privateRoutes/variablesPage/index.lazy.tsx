import { Suspense, lazy } from 'react';

import { Loader } from '@/components/ui/loader';

const VariablesPage = lazy(
  () => import('@/routes//privateRoutes/variablesPage')
);

export default function VariablesPageLazy() {
  return (
    <Suspense fallback={<Loader />}>
      <VariablesPage />
    </Suspense>
  );
}

export { meta } from '@/routes//privateRoutes/variablesPage';
