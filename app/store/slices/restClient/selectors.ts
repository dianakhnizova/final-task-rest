import type { TypeRootState } from '@/store/store';

export const selectMethod = (state: TypeRootState) => state.restClient.method;
export const selectProtocol = (state: TypeRootState) =>
  state.restClient.protocol;
export const selectUrl = (state: TypeRootState) => state.restClient.url;
export const selectHeaders = (state: TypeRootState) => state.restClient.headers;
