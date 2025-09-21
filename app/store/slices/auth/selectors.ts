import type { TypeRootState } from '@/store/store';

export const selectAuth = (state: TypeRootState) =>
  state.auth.currentUser?.user;

export const selectIsAuthenticated = (state: TypeRootState) => {
  if (!state.auth.currentUser?.expiresAt || !state.auth.currentUser.accessToken)
    return false;

  const now = Math.floor(Date.now() / 1000);

  return (
    state.auth.currentUser.expiresAt !== null &&
    state.auth.currentUser.expiresAt > now
  );
};

export const selectError = (state: TypeRootState) => state.auth.error;
