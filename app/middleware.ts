import type { unstable_MiddlewareFunction } from 'react-router';
import { languageCookie } from './cookies.server';
import i18n from './i18n.server';
import { Language } from './sources/enums';

export const languageMiddleware: unstable_MiddlewareFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get('Cookie');
  const lng = (await languageCookie.parse(cookieHeader)) || Language.EN;
  const finalLng = [Language.EN, Language.RU].includes(lng) ? lng : Language.EN;
  await i18n.changeLanguage(finalLng);
  return null;
};
