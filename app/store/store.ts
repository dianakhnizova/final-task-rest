import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth/auth.slice';
import { restClientReducer } from './slices/restClient/restClient.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restClient: restClientReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
