import type { FC } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

import { errors as errorMessages } from '@/sources/messages/errors';
import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';
import { serverFetch as serverMessages } from '@/sources/messages/serverFetch';

import styles from './Response.module.css';

interface Props {
  data: unknown;
  error?: string | null;
  status?: number | null;
}

export const Response: FC<Props> = ({ data, error, status }) => {
  if (error) {
    return (
      <div>
        <h3>{errorMessages.serverError}</h3>
        <p>
          {errorMessages.errorTitle} {error}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p className={styles.emptyTitle}>{serverMessages.emptyRequestHint}</p>
      </div>
    );
  }

  const formatted =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p>{restClientMessages.response.statusTitle}</p>
        <p className={styles.emptyTitle}>{status ? status : ''}</p>
      </div>

      <div className={styles.body}>
        <p>{restClientMessages.response.bodyTitle}</p>

        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines
        >
          {formatted}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
