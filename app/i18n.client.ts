import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import { Language } from './sources/enums';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: Language.EN,
  supportedLngs: [Language.EN, Language.RU],
  interpolation: { escapeValue: false },
});

export default i18n;
