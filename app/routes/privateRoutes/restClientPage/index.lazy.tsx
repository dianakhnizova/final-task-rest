import { Suspense, lazy } from 'react';

import { Loader } from '@/components/ui/loader';

const RestClientPage = lazy(
  () => import('@/routes/privateRoutes/restClientPage')
);

export default function RestClientPageLazy() {
  return (
    <Suspense fallback={<Loader />}>
      <RestClientPage />
    </Suspense>
  );
}

export { meta } from '@/routes/privateRoutes/restClientPage';
