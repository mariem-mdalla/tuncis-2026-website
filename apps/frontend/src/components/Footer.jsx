import { Link, NavLink } from "react-router";
import { MapPin, Calendar, Mail, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const exploreLinks = [
    { to: "/",                        labelKey: "home" },
    { to: "/programme",               labelKey: "programme" },
    { to: "/call-for-communications", labelKey: "cfc" },
    { to: "/committees",              labelKey: "committees" },
    { to: "/partners",                labelKey: "partners" },
    { to: "/best-paper-award",        labelKey: "bestPaper" },
  ];

  const authorLinks = [
    { to: "/call-for-communications", labelKey: "submitAbstract" },
    { to: "/programme",               labelKey: "keyDates" },
    { to: "/nvidia-certification",    labelKey: "nvidiaCert" },
    { to: "/call-for-communications", labelKey: "researchConsortium" },
  ];

  const attendLinks = [
    { to: "/register",                labelKey: "registration" },
    { to: "/practical-info",          labelKey: "travelAccommodation" },
    { to: "/practical-info",          labelKey: "venue" },
  ];

  return (
    <footer className="bg-tuncis-blue-dark text-white border-t border-tuncis-blue shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-sm">

        {/* Col 1 — Branding & Socials */}
        <div className="space-y-4">
          <Link to="/" className="font-heading text-2xl font-bold tracking-wide flex items-center gap-1.5">
            <span>TUNCIS</span>
            <span className="text-tuncis-yellow">2026</span>
          </Link>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
            {t("footer.description")}
          </p>

          <div className="space-y-2 pt-2 text-xs text-white/80">
            <p className="flex items-center gap-2.5">
              <Calendar size={14} className="text-tuncis-yellow shrink-0" />
              <span>{t("home.heroDates")}</span>
            </p>
            <p className="flex items-center gap-2.5">
              <MapPin size={14} className="text-tuncis-yellow shrink-0" />
              <span>{t("home.infoLocationVal")}</span>
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-3">
            <a
              href="https://www.linkedin.com/company/tunaisia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-tuncis-yellow hover:text-tuncis-blue text-white flex items-center justify-center transition-all shadow-sm"
              title="TunAISia LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="mailto:tuncis2026@horizon-tech.tn"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-tuncis-yellow hover:text-tuncis-blue text-white flex items-center justify-center transition-all shadow-sm"
              title="Email Organizers"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Col 2 — Explore */}
        <div>
          <p className="uppercase tracking-wider text-tuncis-yellow text-xs font-bold mb-5 pb-2 border-b border-white/10">
            {t("footer.colExplore")}
          </p>
          <ul className="space-y-2.5">
            {exploreLinks.map(({ to, labelKey }) => (
              <li key={labelKey}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `group inline-flex items-center gap-2 transition-colors hover:text-tuncis-yellow ${
                      isActive ? "text-tuncis-yellow font-semibold" : "text-white/75"
                    }`
                  }
                >
                  <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-tuncis-yellow" />
                  <span>{t(`footer.links.${labelKey}`)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — For Authors */}
        <div>
          <p className="uppercase tracking-wider text-tuncis-yellow text-xs font-bold mb-5 pb-2 border-b border-white/10">
            {t("footer.colAuthors")}
          </p>
          <ul className="space-y-2.5">
            {authorLinks.map(({ to, labelKey }) => (
              <li key={labelKey}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-2 text-white/75 hover:text-tuncis-yellow transition-colors"
                >
                  <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-tuncis-yellow" />
                  <span>{t(`footer.links.${labelKey}`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Attend & Contact */}
        <div>
          <p className="uppercase tracking-wider text-tuncis-yellow text-xs font-bold mb-5 pb-2 border-b border-white/10">
            {t("footer.colAttend")}
          </p>
          <ul className="space-y-2.5 mb-5">
            {attendLinks.map(({ to, labelKey }) => (
              <li key={labelKey}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-2 text-white/75 hover:text-tuncis-yellow transition-colors"
                >
                  <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-tuncis-yellow" />
                  <span>{t(`footer.links.${labelKey}`)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-white/10">
            <a
              href="mailto:tuncis2026@horizon-tech.tn"
              className="inline-flex items-center gap-2 text-xs text-tuncis-yellow hover:text-white transition-colors"
            >
              <Mail size={13} />
              <span>tuncis2026@horizon-tech.tn</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
