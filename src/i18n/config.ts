import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const SUPPORTED_LANGS = ['en', 'ar'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

export const isSupportedLang = (v: string | undefined): v is SupportedLang =>
  !!v && (SUPPORTED_LANGS as readonly string[]).includes(v);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
