import { initialState } from '@/store/slices/settings/settings.slice';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearSettingsLS,
  loadSettingsFromLS,
  saveSettingsToLS,
  settingsLSKey,
} from './settingsLS';

describe('settings localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should save settings to localStorage', () => {
    const settings = { ...initialState, isLoaded: true };
    saveSettingsToLS(settings);

    const stored = localStorage.getItem(settingsLSKey);
    expect(stored).toBe(JSON.stringify(settings));
  });

  it('should load settings from localStorage', () => {
    const settings = { ...initialState, isLoaded: true };
    localStorage.setItem(settingsLSKey, JSON.stringify(settings));

    const loaded = loadSettingsFromLS();
    expect(loaded).toEqual(settings);
  });

  it('should return initialState if localStorage is empty', () => {
    const loaded = loadSettingsFromLS();
    expect(loaded).toEqual(initialState);
  });

  it('should remove settings from localStorage', () => {
    const settings = { ...initialState, isLoaded: true };
    localStorage.setItem(settingsLSKey, JSON.stringify(settings));

    clearSettingsLS();
    const stored = localStorage.getItem(settingsLSKey);
    expect(stored).toBeNull();
  });
});
