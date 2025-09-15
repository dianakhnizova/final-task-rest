import { selectBody, selectMethod } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { CodeLanguage, HttpMethods } from '@/sources/enums';

import { restClientPage } from '@/sources/messages/restClientPage';

import { Select } from '@/components/ui/select';

import { useActions } from '@/utils/hooks/useActions';

import { CodeGenerator } from '../codeGenerator';
import { languageList } from '../codeGenerator/languageList';
import styles from './BodyEditor.module.css';
import { handleBodyEditor, handleLanguage } from './handlers';

export const BodyEditor = () => {
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);

  const { setBody, setLanguage } = useActions();

  const showBodyEditor =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS;

  return (
    <div className={styles.container}>
      <div className={styles.codeGenerator}>
        <p className={styles.title}>{restClientPage.bodyEditor.codeTitle}</p>
        <Select
          options={languageList}
          setSelectedValue={value =>
            handleLanguage(value as CodeLanguage | null, setLanguage)
          }
        />
      </div>

      <CodeGenerator />

      {showBodyEditor && (
        <>
          <p className={styles.title}>{restClientPage.bodyEditor.bodyTitle}</p>

          <textarea
            value={body}
            onChange={value => handleBodyEditor(value, setBody)}
            placeholder={restClientPage.bodyEditor.placeholder}
            className={styles.bodyEditor}
          />
        </>
      )}
    </div>
  );
};
