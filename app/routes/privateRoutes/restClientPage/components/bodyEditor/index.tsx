import {
  selectBody,
  selectMethod,
  selectParser,
} from '@/store/slices/restClient/selectors';
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { HttpMethods, Parsers } from '@/sources/enums';
import { DEFAULT_BODY } from '@/sources/constants/constants';
import { useActions } from '@/utils/hooks/useActions';
import styles from './BodyEditor.module.css';
import { handleBodyEditor } from './handlers';

const { highlight, languages } = Prism;

export const BodyEditor = () => {
  const { t } = useTranslation();
  const { setBody } = useActions();

  const parser = useSelector(selectParser);
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);

  const showBodyEditor =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS;

  useEffect(() => {
    if (!body) {
      setBody(DEFAULT_BODY);
    }
  }, [method]);

  return showBodyEditor ? (
    <div className={styles.container}>
      <p>{t('bodyEditor.bodyTitle')}</p>

      <Editor
        value={body}
        onValueChange={value => handleBodyEditor(value, setBody)}
        highlight={code =>
          parser === Parsers.RAW
            ? code
            : highlight(code, languages[parser] || languages.json, parser)
        }
        padding={10}
        className={styles.editor}
      />
    </div>
  ) : null;
};
