import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
