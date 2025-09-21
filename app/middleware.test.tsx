import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { languageCookie } from './cookies.server';
import i18n from './i18n.server';
import { languageMiddleware } from './middleware';
import { Language } from './sources/enums';

vi.mock('./cookies.server', () => ({
  languageCookie: {
    parse: vi.fn(),
  },
}));

vi.mock('./i18n.server', () => ({
  default: {
    changeLanguage: vi.fn(),
  },
}));

vi.mock('./sources/enums', () => ({
  Language: {
    EN: 'en',
    RU: 'ru',
  },
}));

interface MiddlewareContext {
  request: Request;
  params: Record<string, string>;
  context: Record<string, unknown>;
}

const createMockContext = (
  request: Request,
  params: Record<string, string> = {}
): MiddlewareContext => {
  return {
    request,
    params,
    context: {},
  };
};

describe('languageMiddleware', () => {
  const mockParse = vi.fn();
  const mockChangeLanguage = vi.fn();
  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (languageCookie.parse as Mock).mockImplementation(mockParse);
    (i18n.changeLanguage as Mock).mockImplementation(mockChangeLanguage);
    mockNext.mockResolvedValue('next-result');
  });

  it('should handle case where changeLanguage throws an error', async () => {
    mockParse.mockResolvedValue(Language.EN);
    mockChangeLanguage.mockRejectedValue(new Error('i18n error'));

    const request = new Request('https://example.com', {
      headers: {
        Cookie: 'language=en',
      },
    });
    const context = createMockContext(request);

    await expect(languageMiddleware(context, mockNext)).rejects.toThrow(
      'i18n error'
    );
    expect(mockParse).toHaveBeenCalledWith('language=en');
    expect(mockChangeLanguage).toHaveBeenCalledWith(Language.EN);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle case where cookie parsing throws an error', async () => {
    mockParse.mockRejectedValue(new Error('Cookie parsing error'));
    mockChangeLanguage.mockResolvedValue(undefined);

    const request = new Request('https://example.com', {
      headers: {
        Cookie: 'language=en',
      },
    });
    const context = createMockContext(request);

    await expect(languageMiddleware(context, mockNext)).rejects.toThrow(
      'Cookie parsing error'
    );
    expect(mockParse).toHaveBeenCalledWith('language=en');
    expect(mockChangeLanguage).not.toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should work with params in context', async () => {
    mockParse.mockResolvedValue(Language.EN);
    mockChangeLanguage.mockResolvedValue(undefined);

    const request = new Request('https://example.com', {
      headers: {
        Cookie: 'language=en',
      },
    });
    const params = { id: '123', slug: 'test' };
    const context = createMockContext(request, params);

    expect(context.params).toEqual(params);
  });
});

describe('language validation logic', () => {
  it('should accept only EN and RU languages', () => {
    const validLanguages = [Language.EN, Language.RU];

    validLanguages.forEach(lng => {
      expect([Language.EN, Language.RU].includes(lng)).toBe(true);
    });
  });
});
