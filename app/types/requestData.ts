import type { RestClientState } from '@/store/slices/restClient/restClient.slice.ts';

import type { KeyValue } from '@/sources/interfaces.ts';

export interface RequestData {
  globalVariables: KeyValue[];
  clientState: RestClientState;
}
