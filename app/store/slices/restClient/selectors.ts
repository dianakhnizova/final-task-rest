import type { TypeRootState } from '@/store/store';

export const selectMethod = (state: TypeRootState) => state.restClient.method;
export const selectProtocol = (state: TypeRootState) =>
  state.restClient.protocol;
export const selectUrl = (state: TypeRootState) => state.restClient.url;
export const selectParser = (state: TypeRootState) => state.restClient.parser;
export const selectBody = (state: TypeRootState) => state.restClient.body;
export const selectHeaders = (state: TypeRootState) => state.restClient.headers;
export const selectCode = (state: TypeRootState) => state.restClient.code;
export const selectLanguage = (state: TypeRootState) =>
  state.restClient.language;
