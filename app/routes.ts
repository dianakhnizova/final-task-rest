import { type RouteConfig, route } from '@react-router/dev/routes';

import { AppRoutes } from './sources/enums';

export default [
  route(AppRoutes.HOME, 'routes/mainPage/index.tsx', [
    route(AppRoutes.SIGN_IN, 'routes/signInPage/index.tsx'),
    route(AppRoutes.SIGN_UP, 'routes/signUpPage/index.tsx'),
  ]),
  route(AppRoutes.ABOUT, 'routes/aboutPage/index.tsx'),

  route(AppRoutes.PRIVATE, 'routes/privateRoutes/index.tsx', [
    route(
      AppRoutes.REST_CLIENT,
      'routes/privateRoutes/restClientPage/index.lazy.tsx',
      [route('', 'routes/privateRoutes/restClientPage/serverFetch.tsx')]
    ),
  ]),

  route(AppRoutes.NOT_FOUND, 'routes/notFoundPage/index.tsx'),
] satisfies RouteConfig;
