import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AuthUser } from '@/sources/interfaces';

interface AuthState {
  currentUser: AuthUser | null;
}

const initialState: AuthState = {
  currentUser: null,
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
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
