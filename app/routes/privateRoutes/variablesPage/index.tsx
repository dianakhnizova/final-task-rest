import { variablesPage as messages } from '@/sources/messages/variablesPage.ts';

import { pageMeta } from '@/utils/metaHelpers.ts';

export const meta = pageMeta(messages);

export default function VariablesPage() {
  return (
    <div>
      <h1>Variables</h1>
    </div>
  );
}
