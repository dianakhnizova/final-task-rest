import type { FC } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

import { restClientPage } from '@/sources/messages/restClientPage';

import styles from './Response.module.css';

interface Props {
  data: unknown;
  error?: string | null;
}

export const Response: FC<Props> = ({ data, error }) => {
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

  const formatted =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p>{restClientPage.response.statusTitle}</p>
      </div>

      <div className={styles.body}>
        <p>{restClientPage.response.bodyTitle}</p>

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
