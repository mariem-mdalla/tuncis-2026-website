import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown } from "lucide-react";
import aisLogo from "../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp";
import tunaisiaLogo from "../assets/logos/tunaisia_logo.png";

/* ── Language Switcher ────────────────────────────────────────── */
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="flex gap-1 text-sm font-bold ml-1">
      <button onClick={() => i18n.changeLanguage("en")} className={`px-2 py-1 rounded transition-colors ${i18n.language === "en" ? "bg-tuncis-yellow text-tuncis-blue" : "text-white/80 hover:text-white"}`}>EN</button>
      <button onClick={() => i18n.changeLanguage("fr")} className={`px-2 py-1 rounded transition-colors ${i18n.language === "fr" ? "bg-tuncis-yellow text-tuncis-blue" : "text-white/80 hover:text-white"}`}>FR</button>
    </div>
  );
}

/* ── Desktop Dropdown ─────────────────────────────────────────── */
function DesktopDropdown({ title, items }) {
  const { pathname } = useLocation();
  const isActive = items.some(item => item.to === pathname);
  return (
    <div className="relative group">
      <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${isActive ? "text-tuncis-yellow" : "text-white hover:text-tuncis-yellow"}`}>
        {title}
        <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-200" />
      </button>
      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top scale-95 group-hover:scale-100 flex flex-col py-2 z-50">
        {items.map((item, idx) => (
          <NavLink key={idx} to={item.to} className={({ isActive }) => `px-4 py-2.5 text-sm font-medium transition-colors hover:bg-tuncis-bg ${isActive ? "text-tuncis-blue bg-tuncis-bg font-bold border-l-2 border-tuncis-yellow" : "text-gray-700"}`}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile Accordion Dropdown ────────────────────────────────── */
function MobileDropdown({ title, items, onNavClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 px-2 text-sm font-medium text-white/90">
        {title}
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180 text-tuncis-yellow" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 pb-2 space-y-1">
          {items.map((item, idx) => (
            <NavLink key={idx} to={item.to} onClick={onNavClick} className={({ isActive }) => `block py-2 px-3 rounded-lg text-sm transition-colors ${isActive ? "text-tuncis-yellow bg-white/5 font-bold" : "text-white/70 hover:text-white"}`}>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Header ──────────────────────────────────────────────── */
export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `transition-colors text-sm font-medium ${isActive ? "text-tuncis-yellow font-bold" : "text-white hover:text-tuncis-yellow"}`;

  // Exactly the same scroll classes as the original header
  const headerClass = scrolled
    ? "bg-tuncis-blue/75 backdrop-blur-md shadow-lg border-b border-white/10"
    : "bg-tuncis-blue/60 backdrop-blur-sm shadow-md";

  const participateItems = [
    { to: "/register",             label: t("nav.register") },
    { to: "/practical-info",       label: t("nav.practicalInfo") },
    { to: "/best-paper-award",     label: t("nav.bestPaper") },
    { to: "/nvidia-certification", label: t("nav.nvidiaCert") },
  ];
  const aboutItems = [
    { to: "/about",    label: t("nav.about") },
    { to: "/partners", label: t("nav.partners") },
  ];

  return (
    <header ref={menuRef} className={`sticky top-0 z-50 text-white transition-all duration-300 ${headerClass}`}>

      {/* ── Top bar — IDENTICAL layout to original ───────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Left: brand + logos */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <Link to="/" className="font-heading text-lg sm:text-2xl tracking-wide flex items-center gap-1 transition-transform hover:scale-105 shrink-0" onClick={handleNavClick}>
            <span className="font-bold">TUNCIS</span>
            <span className="text-tuncis-yellow">2026</span>
          </Link>
          <div className="h-8 w-px bg-white/20 hidden lg:block shrink-0" />
          
          {/* Logos visible on lg screens and up */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 pr-4">
            <Link to="/about" title="TunAISia & AIS" className="transition-opacity hover:opacity-80 flex items-center">
              <img src={tunaisiaLogo} alt="TunAISa Logo" className="w-auto object-contain drop-shadow-sm" style={{ height: "92px" }} />
            </Link>
            <Link to="/about" title="TunAISia & AIS" className="transition-opacity hover:opacity-80 flex items-center">
              <img src={aisLogo} alt="AIS Logo" className="w-auto object-contain brightness-0 invert opacity-90 drop-shadow-md" style={{ height: "38px", marginRight: "0.25rem" }} />
            </Link>
          </div>
        </div>

        {/* Desktop nav — with new dropdowns */}
        <nav className="hidden lg:flex items-center gap-6 ml-4">
          <NavLink to="/" className={linkClass} end>{t("nav.homeLink")}</NavLink>
          <NavLink to="/programme" className={linkClass}>{t("nav.programme")}</NavLink>
          <NavLink to="/call-for-communications" className={linkClass}>{t("nav.callForCommunications")}</NavLink>
          <NavLink to="/committees" className={linkClass}>{t("nav.people")}</NavLink>
          <DesktopDropdown title={t("nav.participate")} items={participateItems} />
          <DesktopDropdown title={t("nav.about")} items={aboutItems} />
          <LanguageSwitcher />
        </nav>

        {/* Mobile right controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" className="text-white p-1 ml-2">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer (FIXED: scrollable, logos big & clear) ─ */}
      {menuOpen && (
        <div className="lg:hidden bg-tuncis-blue/95 backdrop-blur-md border-t border-white/10 absolute w-full left-0 top-full shadow-2xl">
          {/* Scrollable container */}
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100svh - 72px)" }}>

            {/* Logos */}
            <div className="flex justify-center items-center gap-3 py-3 px-2 border-b border-white/10 bg-transparent">
              <Link to="/about" onClick={handleNavClick} title="TunAISia & AIS" className="transition-opacity hover:opacity-80 flex items-center">
                <img src={tunaisiaLogo} alt="TunAISa Logo" className="w-auto object-contain drop-shadow-sm" style={{ height: "88px" }} />
              </Link>
              <Link to="/about" onClick={handleNavClick} title="TunAISia & AIS" className="transition-opacity hover:opacity-80 flex items-center">
                <img src={aisLogo} alt="AIS Logo" className="w-auto object-contain brightness-0 invert drop-shadow-sm" style={{ height: "30px" }} />
              </Link>
            </div>

            {/* Flat links */}
            <div className="px-4 pt-3 pb-1">
              {[
                { to: "/",                        label: t("nav.homeLink"),             end: true },
                { to: "/programme",               label: t("nav.programme") },
                { to: "/call-for-communications", label: t("nav.callForCommunications") },
                { to: "/committees",              label: t("nav.people") },
              ].map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block py-3 px-2 text-sm font-medium border-b border-white/10 last:border-0 ${isActive ? "text-tuncis-yellow" : "text-white/90"}`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <MobileDropdown title={t("nav.participate")} items={participateItems} onNavClick={handleNavClick} />
              <MobileDropdown title={t("nav.about")} items={aboutItems} onNavClick={handleNavClick} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
