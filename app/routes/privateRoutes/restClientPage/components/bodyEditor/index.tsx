import { selectBody, selectMethod } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { HttpMethods } from '@/sources/enums';

import { restClientPage } from '@/sources/messages/restClientPage';

import { useActions } from '@/utils/hooks/useActions';

import styles from './BodyEditor.module.css';

export const BodyEditor = () => {
  const body = useSelector(selectBody);
  const method = useSelector(selectMethod);

  const { setBody } = useActions();

  const handleBodyEditor = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const showBodyEditor =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{restClientPage.bodyEditor.codeTitle}</p>

      {showBodyEditor && (
        <>
          <p className={styles.title}>{restClientPage.bodyEditor.bodyTitle}</p>

          <textarea
            value={body}
            onChange={handleBodyEditor}
            placeholder={restClientPage.bodyEditor.placeholder}
            className={styles.bodyEditor}
          />
        </>
      )}
    </div>
  );
};
