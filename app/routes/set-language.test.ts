import type { ActionFunctionArgs } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { AppRoutes, InputName, Language } from '@/sources/enums';
import { languageCookie } from '../cookies.server';
import { action } from './set-language';

describe('Language action', () => {
  const makeArgs = (
    formDataValues: Record<string, string>,
    referer?: string
  ): ActionFunctionArgs => {
    return {
      request: {
        headers: {
          get: vi
            .fn()
            .mockImplementation((key: string) =>
              key === 'Referer' ? (referer ?? null) : null
            ),
        },
        formData: vi.fn().mockResolvedValue(
          Object.entries(formDataValues).reduce((fd, [key, value]) => {
            fd.append(key, value);
            return fd;
          }, new FormData())
        ),
      } as unknown as Request,
      params: {},
      context: {},
    };
  };

  it('should redirect to referer and set cookie with selected language', async () => {
    const spy = vi
      .spyOn(languageCookie, 'serialize')
      .mockResolvedValue('mockedCookieValue');

    const response = await action(
      makeArgs({ [InputName.LANGUAGE]: Language.RU }, '/previous-page')
    );

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/previous-page');
    expect(spy).toHaveBeenCalledWith(Language.RU);
  });

  it('should default to EN if invalid language is provided', async () => {
    const spy = vi
      .spyOn(languageCookie, 'serialize')
      .mockResolvedValue('mockedCookieValue');

    const response = await action(
      makeArgs({ [InputName.LANGUAGE]: 'invalid' })
    );

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe(AppRoutes.HOME);
    expect(spy).toHaveBeenCalledWith(Language.EN);
  });
});
