import type { TypeRootState } from '@/store/store';

export const selectAuth = (state: TypeRootState) => state.auth.user;
