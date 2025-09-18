import { type RouteConfig, route } from '@react-router/dev/routes';
import { AppRoutes } from './sources/enums';

export default [
  route(AppRoutes.HOME, 'routes/mainPage/index.tsx', [
    route(AppRoutes.SIGN_IN, 'routes/signInPage/index.tsx'),
    route(AppRoutes.SIGN_UP, 'routes/signUpPage/index.tsx'),
  ]),

  route(AppRoutes.PRIVATE, 'routes/privateRoutes/index.tsx', [
    route(
      AppRoutes.REST_CLIENT,
      'routes/privateRoutes/restClientPage/index.lazy.tsx'
    ),
    route(
      AppRoutes.VARIABLES,
      'routes/privateRoutes/variablesPage/index.lazy.tsx'
    ),
    route(AppRoutes.HISTORY, 'routes/privateRoutes/historyPage/index.tsx'),
  ]),

  route(AppRoutes.FETCH, 'routes/privateRoutes/restClientPage/serverFetch.ts'),
  route(AppRoutes.LANGUAGE, 'routes/set-language.ts'),
  route(AppRoutes.NOT_FOUND, 'routes/notFoundPage/index.tsx'),
] satisfies RouteConfig;
