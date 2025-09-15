import {
  selectCode,
  selectLanguage,
} from '@/store/slices/restClient/selectors';

import type { FC } from 'react';

import { useSelector } from 'react-redux';

import styles from './CodeGenerator.module.css';

export const CodeGenerator: FC = () => {
  const code = useSelector(selectCode);
  const language = useSelector(selectLanguage);

  return (
    <>
      <p className={styles.title}>{language}</p>

      <pre>
        <code>{code?.generatedCode || ''}</code>
      </pre>
    </>
  );
};
