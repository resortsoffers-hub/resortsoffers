import { useParams, useLocation } from 'react-router-dom';
import { isSupportedLang, SupportedLang } from '@/i18n/config';

/** Returns the active locale derived from the URL (`/en/...` or `/ar/...`). Defaults to 'en'. */
export function useLocale(): SupportedLang {
  const { lang } = useParams<{ lang?: string }>();
  if (isSupportedLang(lang)) return lang;
  return 'en';
}

/** Build a locale-prefixed path, e.g. localePath('/contact') → '/en/contact'. */
export function useLocalePath() {
  const lang = useLocale();
  return (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    // Don't double-prefix
    if (clean.startsWith('/en/') || clean.startsWith('/ar/') || clean === '/en' || clean === '/ar') return clean;
    return `/${lang}${clean === '/' ? '' : clean}` || `/${lang}`;
  };
}

/** Returns the equivalent path in the other locale (for the switcher). */
export function useAlternatePath() {
  const lang = useLocale();
  const location = useLocation();
  const other: SupportedLang = lang === 'en' ? 'ar' : 'en';
  const stripped = location.pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  return {
    otherLang: other,
    otherPath: `/${other}${stripped === '/' ? '' : stripped}`,
  };
}
