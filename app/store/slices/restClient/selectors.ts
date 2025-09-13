import type { TypeRootState } from '@/store/store';

export const selectMethod = (state: TypeRootState) => state.restClient.method;
export const selectUrl = (state: TypeRootState) => state.restClient.url;
