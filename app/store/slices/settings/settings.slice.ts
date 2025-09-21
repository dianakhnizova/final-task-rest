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
    addVariable: (state, action: PayloadAction<KeyValue>) => {
      state.globalVariables.push(action.payload);
    },
    removeVariable: (state, action: PayloadAction<number>) => {
      let variables = [...state.globalVariables];

      variables = variables.filter(variable => variable.id !== action.payload);

      state.globalVariables = variables;
    },
    updateVariable: (state, action: PayloadAction<KeyValue>) => {
      const variables = [...state.globalVariables];
      const index = variables.findIndex(
        variable => variable.id === action.payload.id
      );
      variables[index] = action.payload;
      state.globalVariables = variables;
    },
    loadSettings: (_state, action: PayloadAction<SettingsState>) => {
      return { ...action.payload, isLoaded: true };
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
