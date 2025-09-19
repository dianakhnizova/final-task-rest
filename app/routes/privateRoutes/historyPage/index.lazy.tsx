import type { HistoryRecord } from '@/routes/privateRoutes/historyPage/index.tsx';

import { Suspense, lazy } from 'react';

import { WaitingLoader } from '@/components/ui/waitingLoader';

const HistoryPage = lazy(() => import('@/routes/privateRoutes/historyPage'));

type LoaderData = {
  history: HistoryRecord[];
};

export async function loader(): Promise<LoaderData> {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    history: [
      {
        latencyMs: 245,
        status: 200,
        timestamp: new Date('2025-09-14T10:30:00'),
        method: 'GET',
        requestSize: 128,
        responseSize: 1024,
        url: 'https://api.example.com/users',
      },
      {
        latencyMs: 567,
        status: 404,
        timestamp: new Date('2025-09-14T10:29:00'),
        method: 'POST',
        requestSize: 512,
        responseSize: 89,
        error: 'Resource not found',
        url: 'https://api.example.com/invalid',
      },
      {
        latencyMs: 123,
        status: 201,
        timestamp: new Date('2025-09-14T10:28:00'),
        method: 'PUT',
        requestSize: 768,
        responseSize: 256,
        url: 'https://api.example.com/users/1',
      },
      {
        latencyMs: 890,
        status: 500,
        timestamp: new Date('2025-09-14T10:27:00'),
        method: 'DELETE',
        requestSize: 64,
        responseSize: 128,
        error: 'Internal server error',
        url: 'https://api.example.com/posts/5',
      },
      {
        latencyMs: 345,
        status: 200,
        timestamp: new Date('2025-09-14T10:26:00'),
        method: 'PATCH',
        requestSize: 256,
        responseSize: 512,
        url: 'https://api.example.com/comments/3',
      },
    ],
  };
}

export default function HistoryPageLazy({
  loaderData,
}: {
  loaderData: LoaderData;
}) {
  return (
    <Suspense fallback={<WaitingLoader />}>
      <HistoryPage data={loaderData.history} />
    </Suspense>
  );
}

export { meta } from '@/routes/privateRoutes/historyPage';
