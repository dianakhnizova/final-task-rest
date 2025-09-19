import {
  selectBody,
  selectCode,
  selectHeaders,
  selectLanguage,
  selectMethod,
  selectUrl,
} from '@/store/slices/restClient/selectors';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { type CodeLanguage } from '@/sources/enums';
import { languageList } from '@/sources/lists/languageList';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useActions } from '@/utils/hooks/useActions';
import styles from './CodeGenerator.module.css';
import { handleCodeGenerator, handleLanguage } from './handlers';

export const CodeGenerator: FC = () => {
  const { t } = useTranslation();

  const code = useSelector(selectCode);
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);
  const language = useSelector(selectLanguage);
  const headers = useSelector(selectHeaders);
  const url = useSelector(selectUrl);

  const { setCode, setLanguage } = useActions();

  const headersObj = useMemo(
    () =>
      headers.reduce(
        (acc, header) => ({ ...acc, [header.key]: header.value }),
        {}
      ),
    [headers]
  );

  return (
    <div className={styles.container}>
      <div className={styles.codeGenerator}>
        <p>{t('bodyEditor.codeTitle')}</p>

        <Select
          options={languageList}
          setSelectedValue={value =>
            handleLanguage(value as CodeLanguage | null, setLanguage)
          }
        />

        <Button
          onClick={() =>
            handleCodeGenerator(
              { url, method, headers: headersObj, body },
              language,
              setCode
            )
          }
          disabled={!url}
        >
          {t('buttons.generate')}
        </Button>
      </div>

      {code?.generatedCode && (
        <SyntaxHighlighter
          language={language?.toLowerCase()}
          style={atomDark}
          className={styles.syntax}
        >
          {code.generatedCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
