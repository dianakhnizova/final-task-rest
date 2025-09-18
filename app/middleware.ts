import type { unstable_MiddlewareFunction } from 'react-router';

import { languageCookie } from './cookies.server';
import i18n from './i18n.server';

export const languageMiddleware: unstable_MiddlewareFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await languageCookie.parse(cookieHeader)) || {};
  let lng = cookie || 'en';

  console.log('Cookie language:', lng); // Отладка

  if (!['en', 'ru'].includes(lng)) {
    lng = 'en';
  }
  await i18n.changeLanguage(lng);

  console.log('Set language:', lng); // Отладка

  return null;
};
