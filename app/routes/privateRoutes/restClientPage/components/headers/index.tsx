import { selectHeaders } from '@/store/slices/restClient/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { KeyValueEditor } from '@/components/keyValueEditor';
import { useActions } from '@/utils/hooks/useActions';

export const Headers = () => {
  const { t } = useTranslation();
  const { addHeader, updateHeader, removeHeader } = useActions();

  const headers = useSelector(selectHeaders);

  return (
    <KeyValueEditor
      keyHeader={t('table.headerKey')}
      valueHeader={t('table.headerValue')}
      keyValues={headers}
      keyPlaceholder={t('keyValueEditor.keyPlaceholder')}
      valuePlaceholder={t('keyValueEditor.valuePlaceholder')}
      onAdd={addHeader}
      onDelete={removeHeader}
      onUpdate={updateHeader}
    />
  );
};
