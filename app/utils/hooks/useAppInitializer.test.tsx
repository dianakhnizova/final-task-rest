import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useActions } from '@/utils/hooks/useActions';
import { useSaveUserToLS } from '@/utils/hooks/useSaveUserToLS';
import { useAppInitializer } from './useAppInitializer';

vi.mock('react', () => ({
  useEffect: vi.fn(fn => fn()),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
  },
}));

vi.mock('@/store/slices/settings/settingsLS', () => ({
  clearSettingsLS: vi.fn(),
  loadSettingsFromLS: vi.fn(),
}));

vi.mock('@/sources/enums', () => ({
  LS_KEY: {
    USER: 'user',
  },
}));

vi.mock('@/sources/messages/errors', () => ({
  errors: {
    parseError: 'Parse error',
  },
}));

vi.mock('@/sources/messages/toasts', () => ({
  toasts: {
    appInitializing: 'App initializing',
    appInitializingId: 'app-initializing',
  },
}));

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: vi.fn(),
}));

vi.mock('@/utils/hooks/useSaveUserToLS', () => ({
  useSaveUserToLS: vi.fn(),
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAppInitializer', () => {
  const mockToastSuccess = vi.fn();
  const mockSetUser = vi.fn();
  const mockLoadSettings = vi.fn();
  const mockRemoveUserFromStorage = vi.fn();
  const mockLoadSettingsFromLS = vi.fn();
  const mockUseEffect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (toast.success as Mock) = mockToastSuccess;
    (useActions as Mock).mockReturnValue({
      setUser: mockSetUser,
      loadSettings: mockLoadSettings,
    });
    (useSaveUserToLS as Mock).mockReturnValue({
      removeUserFromStorage: mockRemoveUserFromStorage,
    });
    (useEffect as Mock).mockImplementation(mockUseEffect);

    localStorageMock.getItem.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls useEffect hook', () => {
    useAppInitializer();

    expect(useEffect).toHaveBeenCalledWith(expect.any(Function), []);
  });

  it('does not throw errors during execution', () => {
    localStorageMock.getItem.mockReturnValue(null);
    mockLoadSettingsFromLS.mockReturnValue({});

    expect(() => useAppInitializer()).not.toThrow();
  });
});
