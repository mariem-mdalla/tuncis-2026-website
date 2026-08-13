import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import aisLogo from '../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp';
import tunaisiaLogo from '../assets/logos/tunaisia_logo.png';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-1 text-sm font-bold ml-1">
      <button
        onClick={() => changeLang('en')}
        className={`px-2 py-1 rounded transition-colors ${i18n.language === 'en' ? 'bg-tuncis-yellow text-tuncis-blue' : 'text-white/80 hover:text-white'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLang('fr')}
        className={`px-2 py-1 rounded transition-colors ${i18n.language === 'fr' ? 'bg-tuncis-yellow text-tuncis-blue' : 'text-white/80 hover:text-white'}`}
      >
        FR
      </button>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `transition-colors text-sm font-medium ${isActive ? 'text-tuncis-yellow font-bold' : 'text-white hover:text-tuncis-yellow'}`;

  const headerClass = scrolled
    ? 'bg-tuncis-blue/75 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.15)] border-b border-white/10'
    : 'bg-tuncis-blue shadow-md';

  return (
    <header className={`sticky top-0 z-50 text-white transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="font-heading text-xl sm:text-2xl tracking-wide flex items-center gap-1 transition-transform hover:scale-105" onClick={handleNavClick}>
            <span className="font-bold">TUNCIS</span>
            <span className="text-tuncis-yellow">2026</span>
          </Link>
          <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
          <img 
            src={tunaisiaLogo} 
            alt="TunAISa Logo" 
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm scale-110" 
          />
          <img 
            src={aisLogo} 
            alt="AIS Logo" 
            className="h-7 sm:h-8 object-contain brightness-0 invert opacity-90 drop-shadow-md" 
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/programme" className={linkClass}>{t('nav.programme')}</NavLink>
          <NavLink to="/call-for-communications" className={linkClass}>{t('nav.callForCommunications')}</NavLink>
          <NavLink to="/committees" className={linkClass}>{t('nav.committees')}</NavLink>
          <NavLink to="/practical-info" className={linkClass}>{t('nav.practicalInfo')}</NavLink>
          <Link
            to="/register"
            className="bg-tuncis-yellow text-tuncis-blue text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors shadow-[0_0_12px_rgba(251,213,58,0.4)]"
          >
            {t('nav.register')}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile nav items */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-white p-1 ml-2"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-tuncis-blue/95 backdrop-blur-md border-t border-white/10 px-4 pb-4 pt-2 space-y-1 shadow-lg">
          {[
            { to: '/programme', label: t('nav.programme') },
            { to: '/call-for-communications', label: t('nav.callForCommunications') },
            { to: '/committees', label: t('nav.committees') },
            { to: '/practical-info', label: t('nav.practicalInfo') },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `block py-3 px-2 text-sm font-medium border-b border-white/10 last:border-0 ${isActive ? 'text-tuncis-yellow' : 'text-white/90'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-3 pb-1 px-2">
            <Link
              to="/register"
              onClick={handleNavClick}
              className="inline-block bg-tuncis-yellow text-tuncis-blue text-sm font-bold px-6 py-2.5 rounded-full shadow-md"
            >
              {t('nav.register')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}