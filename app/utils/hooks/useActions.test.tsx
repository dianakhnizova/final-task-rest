import { authActions } from '@/store/slices/auth/auth.slice';
import { restClientActions } from '@/store/slices/restClient/restClient.slice';
import { settingsActions } from '@/store/slices/settings/settings.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { useActions } from './useActions';

vi.mock('@reduxjs/toolkit', () => ({
  bindActionCreators: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('@/store/slices/auth/auth.slice', () => ({
  authActions: {
    login: vi.fn(),
    logout: vi.fn(),
    clearUser: vi.fn(),
  },
}));

vi.mock('@/store/slices/restClient/restClient.slice', () => ({
  restClientActions: {
    setUrl: vi.fn(),
    setMethod: vi.fn(),
    setHeaders: vi.fn(),
  },
}));

vi.mock('@/store/slices/settings/settings.slice', () => ({
  settingsActions: {
    setTheme: vi.fn(),
    setLanguage: vi.fn(),
    toggleSidebar: vi.fn(),
  },
}));

describe('useActions', () => {
  const mockDispatch = vi.fn();
  const mockBindActionCreators = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (bindActionCreators as unknown as Mock).mockImplementation(
      mockBindActionCreators
    );
  });

  it('calls useDispatch hook', () => {
    useActions();
    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it('combines all action creators from different slices', () => {
    useActions();

    expect(bindActionCreators).toHaveBeenCalledWith(
      {
        ...authActions,
        ...restClientActions,
        ...settingsActions,
      },
      mockDispatch
    );
  });

  it('returns result of bindActionCreators', () => {
    const mockBoundActions = {
      login: vi.fn(),
      logout: vi.fn(),
      setUrl: vi.fn(),
      setTheme: vi.fn(),
    };

    mockBindActionCreators.mockReturnValue(mockBoundActions);

    const result = useActions();

    expect(result).toBe(mockBoundActions);
    expect(bindActionCreators).toHaveBeenCalledTimes(1);
  });

  it('includes all auth actions', () => {
    useActions();

    const actionsObject = (bindActionCreators as unknown as Mock).mock
      .calls[0][0];
    expect(actionsObject).toHaveProperty('login');
    expect(actionsObject).toHaveProperty('logout');
    expect(actionsObject).toHaveProperty('clearUser');
  });

  it('includes all restClient actions', () => {
    useActions();

    const actionsObject = (bindActionCreators as unknown as Mock).mock
      .calls[0][0];
    expect(actionsObject).toHaveProperty('setUrl');
    expect(actionsObject).toHaveProperty('setMethod');
    expect(actionsObject).toHaveProperty('setHeaders');
  });

  it('includes all settings actions', () => {
    useActions();

    const actionsObject = (bindActionCreators as unknown as Mock).mock
      .calls[0][0];
    expect(actionsObject).toHaveProperty('setTheme');
    expect(actionsObject).toHaveProperty('setLanguage');
    expect(actionsObject).toHaveProperty('toggleSidebar');
  });

  it('merges actions without conflicts', () => {
    useActions();

    const actionsObject = (bindActionCreators as unknown as Mock).mock
      .calls[0][0];
    const actionKeys = Object.keys(actionsObject);

    const uniqueKeys = new Set(actionKeys);
    expect(uniqueKeys.size).toBe(actionKeys.length);
  });

  it('passes correct dispatch function to bindActionCreators', () => {
    useActions();

    expect(bindActionCreators).toHaveBeenCalledWith(
      expect.any(Object),
      mockDispatch
    );
  });

  it('works with different dispatch functions', () => {
    const anotherMockDispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(anotherMockDispatch);

    useActions();

    expect(bindActionCreators).toHaveBeenCalledWith(
      expect.any(Object),
      anotherMockDispatch
    );
  });
});

describe('allActions object structure', () => {
  it('contains correct number of actions', () => {
    const authActionCount = Object.keys(authActions).length;
    const restClientActionCount = Object.keys(restClientActions).length;
    const settingsActionCount = Object.keys(settingsActions).length;
    const totalActionCount =
      authActionCount + restClientActionCount + settingsActionCount;

    const allActions = {
      ...authActions,
      ...restClientActions,
      ...settingsActions,
    };

    expect(Object.keys(allActions).length).toBe(totalActionCount);
  });

  it('has no naming conflicts between slices', () => {
    const authKeys = Object.keys(authActions);
    const restClientKeys = Object.keys(restClientActions);
    const settingsKeys = Object.keys(settingsActions);

    const authRestClientIntersection = authKeys.filter(key =>
      restClientKeys.includes(key)
    );
    const authSettingsIntersection = authKeys.filter(key =>
      settingsKeys.includes(key)
    );
    const restClientSettingsIntersection = restClientKeys.filter(key =>
      settingsKeys.includes(key)
    );

    expect(authRestClientIntersection).toHaveLength(0);
    expect(authSettingsIntersection).toHaveLength(0);
    expect(restClientSettingsIntersection).toHaveLength(0);
  });
});
