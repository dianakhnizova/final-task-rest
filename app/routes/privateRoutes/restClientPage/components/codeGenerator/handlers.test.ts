import { describe, expect, it, vi } from 'vitest';
import { CodeLanguage } from '@/sources/enums';
import * as generateModule from '@/utils/generateCode';
import { handleCodeGenerator } from './handlers';

describe('handleCodeGenerator', () => {
  const mockRequestData = { url: '', method: 'GET', headers: {} };
  const mockSetCode = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls setCode with generated code on success', async () => {
    vi.spyOn(generateModule, 'generateCode').mockReturnValue('code');

    await handleCodeGenerator(
      mockRequestData,
      CodeLanguage.JAVASCRIPT,
      mockSetCode
    );

    expect(mockSetCode).toHaveBeenCalledWith({
      generatedCode: 'code',
      error: null,
    });
  });

  it('calls setCode with error on failure', async () => {
    vi.spyOn(generateModule, 'generateCode').mockImplementation(() => {
      throw new Error('fail');
    });

    await handleCodeGenerator(
      mockRequestData,
      CodeLanguage.JAVASCRIPT,
      mockSetCode
    );

    expect(mockSetCode).toHaveBeenCalledWith({
      generatedCode: null,
      error: 'fail',
    });
  });
});
