import { selectVariables } from '@/store/slices/settings/selectors.ts';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { variablesPage as messages } from '@/sources/messages/variablesPage.ts';
import { KeyValueEditor } from '@/components/keyValueEditor';
import { useActions } from '@/utils/hooks/useActions.ts';
import { pageMeta } from '@/utils/metaHelpers.ts';
import styles from './variables.module.css';

export const meta = pageMeta(messages);

export default function VariablesPage() {
  const { t } = useTranslation();

  const variables = useSelector(selectVariables);
  const { addVariable, removeVariable, updateVariable } = useActions();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>{t('variablesPage.header')}</h1>

        <KeyValueEditor
          keyHeader={t('variablesPage.keyHeader')}
          valueHeader={t('variablesPage.valueHeader')}
          keyValues={variables}
          keyPlaceholder={t('keyValueEditor.keyPlaceholder')}
          valuePlaceholder={t('keyValueEditor.valuePlaceholder')}
          onAdd={addVariable}
          onUpdate={updateVariable}
          onDelete={removeVariable}
        />
      </div>
    </div>
  );
}
