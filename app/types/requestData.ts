import type { RestClientState } from '@/store/slices/restClient/restClient.slice.ts';
import type { HttpMethods } from '@/sources/enums.ts';
import type { KeyValue } from '@/sources/interfaces.ts';

export interface RequestData {
  globalVariables: KeyValue[];
  clientState: RestClientState;
}

export interface ServerFetchResponse {
  ok: boolean;
  received: unknown | null;
  status: number | null;
  headers: Headers;
  error?: string;
  finalUrl?: string;
  metrics?: Metrics;
  timestamp: Date;
}

export interface FetchBuilderParams {
  body: string | null;
  method: HttpMethods;
  headers: { key: string; value: string }[];
  url: string;
}

export interface Metrics {
  latencyMs: number;
  requestSize: number;
  responseSize: number;
}
