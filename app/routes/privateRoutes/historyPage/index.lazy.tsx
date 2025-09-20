import { mapHistoryFromRow } from '@/mappers/historyMapper.ts';
import { getHistoryForCurrentUser } from '@/services/historyService.ts';
import { getServerSupabaseClient } from '@/supabaseClient.ts';

import { Suspense, lazy } from 'react';

import type { Route } from '@routes/privateRoutes/historyPage/+types/index.lazy.ts';
import type { LoaderFunctionArgs } from 'react-router';

import { WaitingLoader } from '@/components/ui/waitingLoader';

const HistoryPage = lazy(() => import('@/routes/privateRoutes/historyPage'));

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = getServerSupabaseClient(request);

  return {
    headers,
    history: (await getHistoryForCurrentUser(client)).map(mapHistoryFromRow),
  };
}

export default function HistoryPageLazy({
  loaderData: { history },
}: Route.ComponentProps) {
  return (
    <Suspense fallback={<WaitingLoader />}>
      <HistoryPage data={history} />
    </Suspense>
  );
}

export { meta } from '@/routes/privateRoutes/historyPage';
