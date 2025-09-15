import type { TypeRootState } from '@/store/store';

export const selectVariables = (state: TypeRootState) =>
  state.settings.globalVariables;
