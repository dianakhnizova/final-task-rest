import { selectBody, selectMethod } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { HttpMethods } from '@/sources/enums';

import { restClientPage } from '@/sources/messages/restClientPage';

import { useActions } from '@/utils/hooks/useActions';

import styles from './BodyEditor.module.css';
import { handleBodyEditor } from './handlers';

export const BodyEditor = () => {
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);

  const { setBody } = useActions();

  const showBodyEditor =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS;

  return showBodyEditor ? (
    <div className={styles.container}>
      <p className={styles.title}>{restClientPage.bodyEditor.bodyTitle}</p>

      <textarea
        value={body}
        onChange={value => handleBodyEditor(value, setBody)}
        placeholder={restClientPage.bodyEditor.placeholder}
        className={styles.bodyEditor}
      />
    </div>
  ) : null;
};
