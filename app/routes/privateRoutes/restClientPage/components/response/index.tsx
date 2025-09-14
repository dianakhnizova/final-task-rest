import { selectParser } from '@/store/slices/restClient/selectors';

import type { FC } from 'react';

import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

import { Parsers } from '@/sources/enums';

import { restClientPage as restClientMessages } from '@/sources/messages/restClientPage';

import { formatResponse } from '@/utils/formatResponse';

import styles from './Response.module.css';
import { languageMap } from './languageMap';

interface Props {
  data: unknown;
  error?: string | null;
  status?: number | null;
}

export const Response: FC<Props> = ({ data, status }) => {
  const parser = useSelector(selectParser);
  const formatted = formatResponse(data, parser);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p>{restClientMessages.response.statusTitle}</p>
        <p className={styles.title}>{status ? status : ''}</p>
      </div>

      <div className={styles.body}>
        <p>{restClientMessages.response.bodyTitle}</p>

        <SyntaxHighlighter
          language={languageMap[parser] || Parsers.TEXT}
          style={vscDarkPlus}
          showLineNumbers={parser === Parsers.JSON}
          wrapLongLines
        >
          {formatted}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
