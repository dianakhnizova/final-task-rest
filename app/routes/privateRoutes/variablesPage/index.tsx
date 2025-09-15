import { useState } from 'react';

import type { KeyValue } from '@/sources/interfaces.ts';
import { variablesPage as messages } from '@/sources/messages/variablesPage.ts';

import { KeyValueEditor } from '@/components/keyValueEditor';

import { pageMeta } from '@/utils/metaHelpers.ts';

import styles from './Variables.module.css';

export const meta = pageMeta(messages);

export default function VariablesPage() {
  const [keyValues, setKeyValues] = useState<KeyValue[]>([]);

  return (
    <div>
      <h1 className={styles.header}>{messages.header}</h1>
      <div>
        <KeyValueEditor keyValues={keyValues} onChange={setKeyValues} />
      </div>
    </div>
  );
}
