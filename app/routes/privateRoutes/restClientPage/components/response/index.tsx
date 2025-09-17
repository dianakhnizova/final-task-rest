import {
  selectHeaders,
  selectParser,
} from '@/store/slices/restClient/selectors';

import { type FC } from 'react';

import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Parsers } from '@/sources/enums';

import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { getStatusText } from '@/utils/getStatusText';

import styles from './Response.module.css';
import { languageMap } from './languageMap';

interface Props {
  data: unknown;
  error?: string | null;
  status?: number | null;
}

export const Response: FC<Props> = ({ data, status }) => {
  const parser = useSelector(selectParser);
  const headers = useSelector(selectHeaders);

  return (
    <div className={styles.container}>
      {headers && (
        <div className={styles.headers}>
          <p>{restClientMessages.response.headerTitle}</p>

          {headers.map((header, index) => (
            <div key={index} className={styles.headersResponse}>
              <p>{restClientMessages.response.key}</p>
              <p className={styles.title}>{header.key} </p>
              <p>{restClientMessages.response.value}</p>
              <p className={styles.title}>{header.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.status}>
        <p>{restClientMessages.response.statusTitle}</p>

        <p className={styles.title}>
          {status ? `${status} ${getStatusText(status)}` : ''}
        </p>
      </div>

      <div className={styles.body}>
        <p>{restClientMessages.response.bodyTitle}</p>

        <SyntaxHighlighter
          language={languageMap[parser] || Parsers.TEXT}
          style={atomDark}
          showLineNumbers={parser === Parsers.JSON}
          wrapLongLines
        >
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
