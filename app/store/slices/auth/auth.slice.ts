import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from '@/sources/interfaces';

interface AuthState {
  currentUser: AuthUser | null;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
    },
    clearUser: state => {
      state.currentUser = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
