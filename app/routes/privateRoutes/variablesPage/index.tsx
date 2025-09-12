import { useState } from 'react';

import { variablesPage as messages } from '@/sources/messages/variablesPage.ts';

import { type KeyValue, KeyValueEditor } from '@/components/keyValueEditor';

import { pageMeta } from '@/utils/metaHelpers.ts';

export const meta = pageMeta(messages);

export default function VariablesPage() {
  const [keyValues, setKeyValues] = useState<KeyValue[]>([]);

  return (
    <div>
      <h1>Variables</h1>
      <div>
        <KeyValueEditor keyValues={keyValues} onChange={setKeyValues} />
      </div>
    </div>
  );
}
