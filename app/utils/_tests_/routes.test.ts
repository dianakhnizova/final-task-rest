import routes from '@/routes';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '@/sources/enums';

describe('Routes configuration', () => {
  it('should include main routes', () => {
    const homeRoute = routes.find(r => r.path === AppRoutes.HOME);
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.children?.map(c => c.path)).toContain(AppRoutes.SIGN_IN);
    expect(homeRoute?.children?.map(c => c.path)).toContain(AppRoutes.SIGN_UP);
  });

  it('should include private routes', () => {
    const privateRoute = routes.find(r => r.path === AppRoutes.PRIVATE);
    expect(privateRoute).toBeDefined();
    expect(privateRoute?.children?.map(c => c.path)).toEqual(
      expect.arrayContaining([
        AppRoutes.REST_CLIENT,
        AppRoutes.VARIABLES,
        AppRoutes.HISTORY,
      ])
    );
  });

  it('should include standalone routes', () => {
    const fetchRoute = routes.find(r => r.path === AppRoutes.FETCH);
    const languageRoute = routes.find(r => r.path === AppRoutes.LANGUAGE);
    const notFoundRoute = routes.find(r => r.path === AppRoutes.NOT_FOUND);

    expect(fetchRoute).toBeDefined();
    expect(languageRoute).toBeDefined();
    expect(notFoundRoute).toBeDefined();
  });
});
