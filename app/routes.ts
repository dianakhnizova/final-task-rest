import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { AppRoutes } from './sources/enums';

export default [
  index('routes/mainPage/index.tsx'),
  route(AppRoutes.ABOUT, 'routes/aboutPage/index.tsx'),
  route(AppRoutes.NOT_FOUND, 'routes/notFoundPage/index.tsx'),
] satisfies RouteConfig;
