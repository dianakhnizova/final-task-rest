import { settingsReducer } from '@/store/slices/settings/settings.slice.ts';
import { saveSettingsToLS } from '@/store/slices/settings/settingsLS.ts';

import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth/auth.slice';
import { restClientReducer } from './slices/restClient/restClient.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restClient: restClientReducer,
    settings: settingsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  if (!state.settings.isLoaded) return;

  saveSettingsToLS(state.settings);
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
