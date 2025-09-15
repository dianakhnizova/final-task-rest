import {
  type SettingsState,
  initialState,
} from '@/store/slices/settings/settings.slice.ts';

export const settingsLSKey = 'settings';

export const saveSettingsToLS = (settings: SettingsState) => {
  const json = JSON.stringify(settings);
  localStorage.setItem(settingsLSKey, json);
};

export const loadSettingsFromLS = (): SettingsState => {
  const json = localStorage.getItem(settingsLSKey);
  return json ? JSON.parse(json) : initialState;
};

export const clearSettingsLS = () => localStorage.removeItem(settingsLSKey);
