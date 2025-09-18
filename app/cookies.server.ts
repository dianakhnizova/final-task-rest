import { createCookie } from 'react-router';
import { AppRoutes, InputName } from './sources/enums';

export const languageCookie = createCookie(InputName.LANGUAGE, {
  maxAge: 30 * 24 * 60 * 60,
  path: AppRoutes.HOME,
  sameSite: 'lax',
});
