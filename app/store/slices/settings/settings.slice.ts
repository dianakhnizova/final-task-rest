import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { KeyValue } from '@/sources/interfaces.ts';

export interface SettingsState {
  globalVariables: KeyValue[];
  isLoaded?: boolean;
}

export const initialState: SettingsState = {
  globalVariables: [],
  isLoaded: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<KeyValue[] | null>) => {
      state.globalVariables = action.payload || [];
    },
    loadSettings: (_state, action: PayloadAction<SettingsState>) => {
      return { ...action.payload, isLoaded: true };
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
