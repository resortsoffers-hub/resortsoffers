import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isSupportedLang, SupportedLang } from '@/i18n/config';
import HreflangTags from './HreflangTags';

/**
 * Wraps every localized route. Derives the active locale from the URL path
 * (`/en/...` or `/ar/...`), syncs i18next, and sets `<html lang>` + `<html dir>`
 * for proper RTL handling.
 *
 * NOTE: We read the locale from `location.pathname` instead of `useParams`
 * because the routes are mounted with literal paths (`/en`, `/ar`), not
 * `/:lang` — so `useParams().lang` would always be undefined and cause an
 * infinite redirect that produced a blank page.
 */
const LocaleLayout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const seg = location.pathname.split('/')[1];
  const lang: SupportedLang | null = isSupportedLang(seg) ? seg : null;

  useEffect(() => {
    if (!lang) return;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang, i18n]);

  if (!lang) {
    return <Navigate to="/en" replace />;
  }

  return (
    <>
      <HreflangTags />
      <Outlet />
    </>
  );
};

export default LocaleLayout;
