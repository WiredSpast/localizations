import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import es from './locales/es';
import br from './locales/br';
import fr from './locales/fr';


const resources = {
  en,
  es,
  pt: br,
  fr,
}

const languageDetector = new LanguageDetector();
languageDetector.init({
  lookupLocalStorage: 'i18nextLng',
  convertDetectedLanguage: (lgn: string) => lgn.split('-')[0]
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
