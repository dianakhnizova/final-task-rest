import { selectVariables } from '@/store/slices/settings/selectors.ts';

import { useSelector } from 'react-redux';

import type { KeyValue } from '@/sources/interfaces.ts';
import { variablesPage as messages } from '@/sources/messages/variablesPage.ts';

import { KeyValueEditor } from '@/components/keyValueEditor';

import { useActions } from '@/utils/hooks/useActions.ts';
import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './variables.module.css';

export const meta = pageMeta(messages);

export default function VariablesPage() {
  const variables = useSelector(selectVariables);
  const { setVariables } = useActions();

  const handleChange = (keyValues: KeyValue[]) => {
    setVariables(keyValues);
  };

  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <div>
        <KeyValueEditor keyValues={variables} onChange={handleChange} />
      </div>
    </div>
  );
}
