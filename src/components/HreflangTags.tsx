import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';

const SITE = 'https://resortsoffers.com';

/** Emits hreflang alternates + canonical for the current localized route. */
const HreflangTags = () => {
  const lang = useLocale();
  const location = useLocation();
  const stripped = location.pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  const path = stripped === '/' ? '' : stripped;
  const enUrl = `${SITE}/en${path}`;
  const arUrl = `${SITE}/ar${path}`;
  const currentUrl = lang === 'ar' ? arUrl : enUrl;

  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ar" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_AE' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'ar' ? 'en_US' : 'ar_AE'} />
    </Helmet>
  );
};

export default HreflangTags;
