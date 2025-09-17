import { Suspense, lazy } from 'react';

import { WaitingLoader } from '@/components/ui/waitingLoader';

const RestClientPage = lazy(
  () => import('@/routes/privateRoutes/restClientPage')
);

export default function RestClientPageLazy() {
  return (
    <Suspense fallback={<WaitingLoader />}>
      <RestClientPage />
    </Suspense>
  );
}

export { meta } from '@/routes/privateRoutes/restClientPage';
