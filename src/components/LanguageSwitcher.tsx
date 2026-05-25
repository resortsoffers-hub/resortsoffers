import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useAlternatePath, useLocale } from '@/hooks/useLocale';

/**
 * Header switcher: toggles between /en and /ar while preserving the current path.
 * Lightweight link (not a button) so it works without JS for crawlers.
 */
const LanguageSwitcher = () => {
  const lang = useLocale();
  const { otherLang, otherPath } = useAlternatePath();
  const label = otherLang === 'ar' ? 'العربية' : 'English';

  return (
    <Link
      to={otherPath}
      hrefLang={otherLang}
      aria-label={`Switch to ${label}`}
      className="flex items-center gap-1.5 text-gray-700 hover:text-[#00A4E4] px-2 py-2 text-sm font-medium"
    >
      <Globe className="w-4 h-4" />
      <span className={lang === 'ar' ? 'font-sans' : ''}>{label}</span>
    </Link>
  );
};

export default LanguageSwitcher;
