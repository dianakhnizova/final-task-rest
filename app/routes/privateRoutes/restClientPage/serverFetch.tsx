import type { LoaderData } from '@/sources/interfaces';

import { serverFetch } from '@/sources/messages/serverFetch';

import type { Route } from './+types/index.lazy';
import styles from './RestClientPage.module.css';
import { Response } from './components/response';

export { serverFetchLoader as loader } from './serverFetchLoader';

export default function ServerFetch({ loaderData }: Route.ComponentProps) {
  const { data, error } = (loaderData || {}) as LoaderData;

  return (
    <div className={styles.response}>
      <h3>{serverFetch.title}</h3>
      <Response data={data} error={error} />
    </div>
  );
}
