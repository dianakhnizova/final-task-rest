import * as selectors from '@/store/slices/restClient/selectors';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';
import { CodeLanguage, HttpMethods } from '@/sources/enums';
import { CodeGenerator } from '..';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const setCodeMock = vi.fn();
const setLanguageMock = vi.fn();
vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({ setCode: setCodeMock, setLanguage: setLanguageMock }),
}));

vi.mock('react-redux', () => ({
  useSelector: <T,>(selector: (state: unknown) => T): T => {
    switch (selector) {
      case selectors.selectCode:
        return { generatedCode: 'console.log("test")' } as T;
      case selectors.selectBody:
        return '{ "test": true }' as T;
      case selectors.selectMethod:
        return HttpMethods.POST as T;
      case selectors.selectLanguage:
        return CodeLanguage.JAVASCRIPT as T;
      case selectors.selectHeaders:
        return [{ id: 1, key: 'Content-Type', value: 'application/json' }] as T;
      case selectors.selectUrl:
        return 'https://api.test.com' as T;
      default:
        return null as T;
    }
  },
}));

describe('CodeGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls setCode on generate button click', () => {
    render(<CodeGenerator />);
    fireEvent.click(screen.getByText('buttons.generate'));
    expect(setCodeMock).toHaveBeenCalled();
  });

  it('calls setLanguage when select changes', () => {
    render(<CodeGenerator />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: CodeLanguage.PYTHON },
    });
    expect(setLanguageMock).toHaveBeenCalledWith(CodeLanguage.PYTHON);
  });
});
