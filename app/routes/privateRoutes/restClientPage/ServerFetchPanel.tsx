import { CodeLanguage } from '@/sources/enums';
import type { LoaderData } from '@/sources/interfaces';

import { errors as errorMessages } from '@/sources/messages/errors';
import { serverFetch } from '@/sources/messages/serverFetch';
import { serverFetch as serverMessages } from '@/sources/messages/serverFetch';

import type { Route } from './+types/index.lazy';
import styles from './RestClientPage.module.css';
import CodeResult from './components/codeGenerator/codeResult';
import { Response } from './components/response';

export { serverFetchLoader as loader } from './serverFetchLoader';

export default function ServerFetchPanel({ loaderData }: Route.ComponentProps) {
  const { data, error, status, codeGen } = (loaderData || {}) as LoaderData;

  return (
    <div className={styles.response}>
      <h3>{serverFetch.title}</h3>

      {error && (
        <>
          <h3>{errorMessages.serverError}</h3>
          <p>
            {errorMessages.errorTitle} {error}
          </p>
        </>
      )}

      {data ? (
        <Response data={data} error={error} status={status} />
      ) : (
        <p className={styles.title}>{serverMessages.emptyRequestHint}</p>
      )}

      <CodeResult code={codeGen} language={CodeLanguage.JAVASCRIPT} />
    </div>
  );
}
