import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';

const SITE = 'https://resortsoffers.com';

/** GCC-targeted hreflang alternates + canonical for the current route. */
const GCC_LOCALES = ['en-AE', 'en-SA', 'en-QA', 'en-KW', 'en-BH', 'en-OM'];

const HreflangTags = () => {
  const lang = useLocale();
  const location = useLocation();
  const stripped = location.pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  const path = stripped === '/' ? '' : stripped;
  const enUrl = `${SITE}/en${path}`;
  const currentUrl = enUrl;

  return (
    <Helmet>
      <html lang="en" dir="ltr" />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      {GCC_LOCALES.map((code) => (
        <link key={code} rel="alternate" hrefLang={code} href={enUrl} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:locale:alternate" content="en_SA" />
    </Helmet>
  );
};


export default HreflangTags;
