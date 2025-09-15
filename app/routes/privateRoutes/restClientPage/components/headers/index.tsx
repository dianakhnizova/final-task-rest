import { selectHeaders } from '@/store/slices/restClient/selectors';

import { useSelector } from 'react-redux';

import { restClientPage as messages } from '@/sources/messages/restClientPage.ts';

import { KeyValueEditor } from '@/components/keyValueEditor';

import { useActions } from '@/utils/hooks/useActions';

export const Headers = () => {
  const headers = useSelector(selectHeaders);
  const { addHeader, updateHeader, removeHeader } = useActions();

  return (
    <KeyValueEditor
      keyHeader={messages.table.headerKey}
      valueHeader={messages.table.headerValue}
      keyValues={headers}
      onAdd={addHeader}
      onDelete={removeHeader}
      onUpdate={updateHeader}
    />
  );
};
