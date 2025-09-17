import {
  selectBody,
  selectMethod,
  selectParser,
} from '@/store/slices/restClient/selectors';

import { useEffect, useState } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';
import { useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';

import { HttpMethods, Parsers } from '@/sources/enums';

import { buttons as buttonsMessages } from '@/sources/messages/buttons';
import { restClientPage } from '@/sources/messages/restClientPage';

import { Button } from '@/components/ui/button';

import { formatResponse } from '@/utils/formatResponse';
import { useActions } from '@/utils/hooks/useActions';

import { Parser } from '../parser';
import styles from './BodyEditor.module.css';
import { handleBodyEditor } from './handlers';

const { highlight, languages } = Prism;

export const BodyEditor = () => {
  const [prettified, setPrettified] = useState(true);
  const [formattedBody, setFormattedBody] = useState('');

  const parser = useSelector(selectParser);
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);

  const { setBody } = useActions();

  const showBodyEditor =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS;

  const handlePrettify = () => {
    if (prettified) {
      setPrettified(false);
    } else {
      setPrettified(true);
    }
  };

  useEffect(() => {
    setFormattedBody(formatResponse(body, prettified ? parser : Parsers.RAW));
  }, [body, parser, prettified]);

  return showBodyEditor ? (
    <div className={styles.container}>
      <div className={styles.bodyTitleContainer}>
        <p className={styles.title}>{restClientPage.bodyEditor.bodyTitle}</p>

        <Button onClick={handlePrettify}>
          {prettified ? buttonsMessages.raw : buttonsMessages.prettify}
        </Button>

        <Parser />
      </div>

      {prettified ? (
        <Editor
          value={formattedBody}
          onValueChange={value =>
            handleBodyEditor(
              prettified,
              parser,
              value,
              setBody,
              setFormattedBody
            )
          }
          highlight={code =>
            highlight(code, languages[parser] || languages.json, parser)
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", monospace',
            fontSize: 14,
            minHeight: 200,
            border: '1px solid #333',
            borderRadius: 5,
          }}
        />
      ) : (
        <pre
          style={{
            fontFamily: '"Fira code", monospace',
            fontSize: 14,
            minHeight: 200,
            border: '1px solid #333',
            borderRadius: 5,
            padding: 10,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {formattedBody}
        </pre>
      )}
    </div>
  ) : null;
};
