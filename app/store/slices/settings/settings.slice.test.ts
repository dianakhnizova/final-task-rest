import { describe, expect, it } from 'vitest';
import type { KeyValue } from '@/sources/interfaces';
import {
  initialState,
  settingsActions,
  settingsReducer,
} from './settings.slice';

describe('settingsSlice', () => {
  it('should add a variable', () => {
    const newVar: KeyValue = {
      id: 1,
      key: 'API_URL',
      value: 'https://api.com',
    };
    const state = settingsReducer(
      initialState,
      settingsActions.addVariable(newVar)
    );

    expect(state.globalVariables).toContainEqual(newVar);
  });

  it('should remove a variable by id', () => {
    const initial = {
      ...initialState,
      globalVariables: [{ id: 1, key: 'A', value: 'B' }],
    };
    const state = settingsReducer(initial, settingsActions.removeVariable(1));

    expect(state.globalVariables).toHaveLength(0);
  });

  it('should update a variable by id', () => {
    const initial = {
      ...initialState,
      globalVariables: [{ id: 1, key: 'A', value: 'B' }],
    };
    const updated: KeyValue = { id: 1, key: 'A', value: 'C' };
    const state = settingsReducer(
      initial,
      settingsActions.updateVariable(updated)
    );

    expect(state.globalVariables).toContainEqual(updated);
  });

  it('should load settings and set isLoaded to true', () => {
    const newSettings = { globalVariables: [{ id: 1, key: 'X', value: 'Y' }] };
    const state = settingsReducer(
      initialState,
      settingsActions.loadSettings(newSettings)
    );

    expect(state.globalVariables).toEqual(newSettings.globalVariables);
    expect(state.isLoaded).toBe(true);
  });
});
