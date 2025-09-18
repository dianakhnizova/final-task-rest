import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  interpolation: { escapeValue: false },
});

export default i18n;

export async function getLocale(request: Request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/lang=(\w{2})/);
  let lng = match?.[1] || 'en';
  console.log('Parsed locale from cookie:', lng);

  if (!['en', 'ru'].includes(lng)) {
    lng = 'en';
  }

  return lng;
}
