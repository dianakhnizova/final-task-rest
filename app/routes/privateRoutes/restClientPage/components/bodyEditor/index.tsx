import { selectBody } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { restClientPage } from '@/sources/messages/restClientPage';

import { useActions } from '@/utils/hooks/useActions';

import styles from './BodyEditor.module.css';

export const BodyEditor = () => {
  const body = useSelector(selectBody);
  const { setBody } = useActions();

  const handleBodyEditor = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{restClientPage.bodyEditor.codeTitle}</p>
      <p className={styles.title}>{restClientPage.bodyEditor.bodyTitle}</p>
      <textarea
        value={body}
        onChange={handleBodyEditor}
        placeholder={restClientPage.bodyEditor.placeholder}
        className={styles.bodyEditor}
      />
    </div>
  );
};
