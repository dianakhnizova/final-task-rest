import type { Parsers } from '@/sources/enums';
import type { LoaderData } from '@/sources/interfaces';

import { errors as errorMessages } from '@/sources/messages/errors';
import { serverFetch } from '@/sources/messages/serverFetch';
import { serverFetch as serverMessages } from '@/sources/messages/serverFetch';

import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import type { Route } from './+types/index.lazy';
import styles from './RestClientPage.module.css';
import { Response } from './components/response';
import { parserList } from './components/response/parserList';

export { serverFetchLoader as loader } from './loaders/serverFetchLoader';

export default function ServerFetchPanel({ loaderData }: Route.ComponentProps) {
  const { data, error, status } = (loaderData || {}) as LoaderData;
  const { setParser } = useActions();

  const handleParser = (value: Parsers | null) => {
    if (value) setParser(value);
  };

  return (
    <div className={styles.response}>
      <h3>{serverFetch.title}</h3>

      <div className={styles.parser}>
        <p className={styles.title}>{serverMessages.selectParser}</p>

        <Select options={parserList} setSelectedValue={handleParser} />
      </div>

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
    </div>
  );
}
