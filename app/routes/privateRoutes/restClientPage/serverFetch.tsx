import type { LoaderData } from '@/sources/interfaces';

import type { Route } from './+types/index.lazy';

export { serverFetchLoader as loader } from './serverFetchLoader';

export default function ServerFetch({ loaderData }: Route.ComponentProps) {
  const { data, error } = (loaderData || {}) as LoaderData;

  if (error) {
    return (
      <div>
        <h3>Error fetching from server</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p>Enter URL and click "Server Fetch" to see results</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <h3>Server Fetch Result</h3>
      <textarea style={{ width: '100%' }}>
        {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
      </textarea>
    </div>
  );
}
