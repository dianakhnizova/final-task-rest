import { selectHeaders } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { restClientPage as messages } from '@/sources/messages/restClientPage.ts';

import { KeyValueEditor } from '@/components/keyValueEditor';

import { useActions } from '@/utils/hooks/useActions';

import styles from './Headers.module.css';

export const Headers = () => {
  const headers = useSelector(selectHeaders);
  const { addHeader, updateHeader, removeHeader } = useActions();

  return (
    <div className={styles.container}>
      <KeyValueEditor
        keyHeader={messages.table.headerKey}
        valueHeader={messages.table.headerValue}
        keyValues={headers}
        onAdd={addHeader}
        onDelete={removeHeader}
        onUpdate={updateHeader}
      />
    </div>
  );
};
