import {
  type SettingsState,
  initialState,
} from '@/store/slices/settings/settings.slice.ts';

export const saveSettingsToLS = (settings: SettingsState) => {
  const json = JSON.stringify(settings);
  localStorage.setItem('settings', json);
};

export const loadSettingsFromLS = (): SettingsState => {
  const json = localStorage.getItem('settings');
  return json ? JSON.parse(json) : initialState;
};

export const clearSettingsLS = () => localStorage.removeItem('settings');
