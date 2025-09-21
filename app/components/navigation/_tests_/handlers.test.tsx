import { describe, expect, it, vi } from 'vitest';
import { AppRoutes } from '@/sources/enums';
import { buttonsConfig } from '../handlers';

vi.mock('@/sources/enums', () => ({
  AppRoutes: {
    HISTORY: '/history',
    VARIABLES: '/variables',
    REST_CLIENT: '/rest-client',
  },
}));

describe('buttonsConfig', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'buttons.btnHistory': 'History',
        'buttons.btnVariables': 'Variables',
        'buttons.btnRestClient': 'REST Client',
      };
      return translations[key] || key;
    });
  });

  it('returns REST client button when isRestClientPage is false', () => {
    const result = buttonsConfig(mockT, false);

    expect(result).toEqual([
      { path: AppRoutes.REST_CLIENT, label: 'REST Client' },
      { path: AppRoutes.HISTORY, label: 'History' },
      { path: AppRoutes.VARIABLES, label: 'Variables' },
    ]);
  });

  it('returns REST client button when isRestClientPage is undefined', () => {
    const result = buttonsConfig(mockT);

    expect(result).toEqual([
      { path: AppRoutes.REST_CLIENT, label: 'REST Client' },
      { path: AppRoutes.HISTORY, label: 'History' },
      { path: AppRoutes.VARIABLES, label: 'Variables' },
    ]);
  });

  it('does not return REST client button when isRestClientPage is true', () => {
    const result = buttonsConfig(mockT, true);

    expect(result).toEqual([
      { path: AppRoutes.HISTORY, label: 'History' },
      { path: AppRoutes.VARIABLES, label: 'Variables' },
    ]);
  });

  it('calls translation function with correct keys for non-REST client page', () => {
    buttonsConfig(mockT, false);

    expect(mockT).toHaveBeenCalledWith('buttons.btnRestClient');
    expect(mockT).toHaveBeenCalledWith('buttons.btnHistory');
    expect(mockT).toHaveBeenCalledWith('buttons.btnVariables');
    expect(mockT).toHaveBeenCalledTimes(3);
  });

  it('calls translation function with correct keys for REST client page', () => {
    buttonsConfig(mockT, true);

    expect(mockT).toHaveBeenCalledWith('buttons.btnHistory');
    expect(mockT).toHaveBeenCalledWith('buttons.btnVariables');
    expect(mockT).not.toHaveBeenCalledWith('buttons.btnRestClient');
    expect(mockT).toHaveBeenCalledTimes(2);
  });

  it('returns correct paths for buttons', () => {
    const result1 = buttonsConfig(mockT, false);
    const result2 = buttonsConfig(mockT, true);

    expect(result1[0].path).toBe(AppRoutes.REST_CLIENT);
    expect(result1[1].path).toBe(AppRoutes.HISTORY);
    expect(result1[2].path).toBe(AppRoutes.VARIABLES);

    expect(result2[0].path).toBe(AppRoutes.HISTORY);
    expect(result2[1].path).toBe(AppRoutes.VARIABLES);
  });

  it('returns correct number of buttons for different scenarios', () => {
    const result1 = buttonsConfig(mockT, false);
    const result2 = buttonsConfig(mockT, true);
    const result3 = buttonsConfig(mockT);

    expect(result1).toHaveLength(3);
    expect(result2).toHaveLength(2);
    expect(result3).toHaveLength(3);
  });

  it('maintains correct button order for non-REST client page', () => {
    const result = buttonsConfig(mockT, false);

    expect(result[0].label).toBe('REST Client');
    expect(result[1].label).toBe('History');
    expect(result[2].label).toBe('Variables');
  });

  it('maintains correct button order for REST client page', () => {
    const result = buttonsConfig(mockT, true);

    expect(result[0].label).toBe('History');
    expect(result[1].label).toBe('Variables');
  });

  it('works with different translation functions', () => {
    const customT = vi.fn((key: string) => `translated_${key}`);

    const result = buttonsConfig(customT, false);

    expect(result).toEqual([
      {
        path: AppRoutes.REST_CLIENT,
        label: 'translated_buttons.btnRestClient',
      },
      { path: AppRoutes.HISTORY, label: 'translated_buttons.btnHistory' },
      { path: AppRoutes.VARIABLES, label: 'translated_buttons.btnVariables' },
    ]);
  });
});
