import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  const handleNavClick = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `transition-colors text-sm font-medium ${isActive ? 'text-tuncis-yellow font-bold' : 'text-white hover:text-tuncis-yellow'}`;

  const headerClass = scrolled
    ? 'bg-tuncis-blue/75 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.15)] border-b border-white/10'
    : 'bg-tuncis-blue shadow-md';

  return (
    <header className={`sticky top-0 z-50 text-white transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading text-xl sm:text-2xl tracking-wide flex items-center gap-1" onClick={handleNavClick}>
          <span className="font-bold">TUNCIS</span>
          <span className="text-tuncis-yellow">2026</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/programme" className={linkClass}>Programme</NavLink>
          <NavLink to="/call-for-communications" className={linkClass}>Call for Communications</NavLink>
          <NavLink to="/committees" className={linkClass}>Committees</NavLink>
          <NavLink to="/practical-info" className={linkClass}>Practical Info</NavLink>
          <Link
            to="/register"
            className="bg-tuncis-yellow text-tuncis-blue text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors shadow-[0_0_12px_rgba(251,213,58,0.4)]"
          >
            Register
          </Link>
        </nav>

        {/* Mobile: Register button + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/register"
            onClick={handleNavClick}
            className="bg-tuncis-yellow text-tuncis-blue text-xs font-bold px-4 py-2 rounded-full"
          >
            Register
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-white p-1"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-tuncis-blue/95 backdrop-blur-md border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {[
            { to: '/programme', label: 'Programme' },
            { to: '/call-for-communications', label: 'Call for Communications' },
            { to: '/committees', label: 'Committees' },
            { to: '/practical-info', label: 'Practical Info' },
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
        </div>
      )}
    </header>
  );
}