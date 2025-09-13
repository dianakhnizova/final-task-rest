import type { TypeRootState } from '@/store/store';

export const selectMethod = (state: TypeRootState) => state.restClient.method;
export const selectUrl = (state: TypeRootState) => state.restClient.url;
export const selectStatus = (state: TypeRootState) => state.restClient.status;
export const selectBody = (state: TypeRootState) => state.restClient.body;
export const selectHeaders = (state: TypeRootState) => state.restClient.headers;
