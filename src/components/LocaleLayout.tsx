import { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isSupportedLang } from '@/i18n/config';
import HreflangTags from './HreflangTags';

/**
 * Wraps every localized route. Reads `:lang` from the URL, syncs i18next,
 * and sets `<html lang>` + `<html dir>` for proper RTL handling.
 */
const LocaleLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isSupportedLang(lang)) return;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
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
