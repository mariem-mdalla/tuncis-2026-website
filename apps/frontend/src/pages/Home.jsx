import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, Mic2, FileSearch, Calendar, MapPin, Award, Rocket, Sparkles, ArrowRight } from "lucide-react";
import KeyDates from "../components/TimeLine";
import Countdown from "../components/Countdown";

import nvidiaLogo    from "../assets/logos/NVIDIA_logo.webp";
import aisLogo       from "../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp";
import horizonLogo   from "../assets/logos/Horizon-logo.png";
import uSousseLogo   from "../assets/logos/universite-de-sousse.png";
import manoubaLogo   from "../assets/logos/manouba-removebg-preview.png";
import tunaisiaLogo  from "../assets/logos/tunaisia_logo.png";
import utmLogo       from "../assets/logos/utm.png";
import riadiLogo     from "../assets/logos/riadi-log.png";
import sercomLogo    from "../assets/logos/sercom.png";
import larodecLogo   from "../assets/logos/larodec-logo.png";
import sixComLogo    from "../assets/logos/6com-logo.png";
import eniseLogo     from "../assets/logos/Logo_ENISo,_Tunisie.svg.webp";
import doctoralLogo  from "../assets/logos/doctoral-school-logo.png";
import deloitteLogo  from "../assets/logos/Logo_of_Deloitte.svg.webp";
import draxlLogo     from "../assets/logos/draxlmaier-logo.png";
import leoniLogo     from "../assets/logos/leoni-logo.png";
import proxymLogo    from "../assets/logos/logo-proxym-png.png";
import novationLogo  from "../assets/logos/Novation_logo.png";
import weviooLogo    from "../assets/logos/wevioo-logo.png";
import soussePhoto   from "../assets/sousse-hover.jpg";

export default function Home() {
  const { t } = useTranslation();
  const themes = t("home.themesList", { returnObjects: true }) || [];

  const highlights = [
    { key: "keynotes", icon: Mic2, logo: null, link: null },
    { key: "workshops", icon: Users, logo: null, link: null },
    { key: "consortium", icon: FileSearch, logo: null, link: "/call-for-communications" },
    { key: "nvidia", icon: null, logo: nvidiaLogo, link: "/nvidia-certification" },
  ];

  const partners = [
    // Academic & Institutional
    { src: uSousseLogo,  alt: "Université de Sousse", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.4)", transformOrigin: "center" } },
    { src: utmLogo,      alt: "Université de Tunis El Manar", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: manoubaLogo,  alt: "Université de la Manouba", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: eniseLogo,    alt: "ENISo", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: tunaisiaLogo, alt: "TunAISia", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.5)", transformOrigin: "center" } },
    { src: aisLogo,      alt: "Association for Information Systems", cardStyle: { height: "130px", width: "240px" }, imgStyle: { width: "90%" } },
    { src: horizonLogo,  alt: "Horizon University", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: doctoralLogo, alt: "Doctoral School", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },

    // Research Laboratories
    { src: riadiLogo,    alt: "Laboratoire RIADI", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.2)", transformOrigin: "center" } },
    { src: sercomLogo,   alt: "SERCOM", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: larodecLogo,  alt: "LARODEC", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: sixComLogo,   alt: "6COM", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.1)", transformOrigin: "center" } },

    // Industrial Partners
    { src: nvidiaLogo,   alt: "NVIDIA", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.1)", transformOrigin: "center" } },
    { src: deloitteLogo, alt: "Deloitte", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: draxlLogo,    alt: "Dräxlmaier", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: leoniLogo,    alt: "Leoni", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: proxymLogo,   alt: "Proxym", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: novationLogo, alt: "Novation City", cardStyle: { height: "130px", width: "190px" }, imgStyle: {} },
    { src: weviooLogo,   alt: "Wevioo", cardStyle: { height: "130px", width: "190px" }, imgStyle: { transform: "scale(1.3)", transformOrigin: "center" } },
  ];

  return (
    <main>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[550px] sm:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${soussePhoto})` }} />
        <div className="absolute inset-0 bg-tuncis-blue-dark/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/15 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-4xl text-left">

            {/* Conference name + date badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-heading text-tuncis-yellow text-2xl font-black tracking-wider">{t("home.heroTitle")}</span>
              <span className="bg-tuncis-yellow/20 border border-tuncis-yellow/40 text-tuncis-yellow text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {t("home.heroDates")}
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              {t("home.themePrefix")}
              <br />
              <span className="text-tuncis-yellow">{t("home.themeHighlight")}</span>
            </motion.h1>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="w-12 h-1 bg-tuncis-yellow inline-block rounded-full shadow-md" />
              <h2 className="font-heading text-2xl md:text-3xl text-white font-medium tracking-wide drop-shadow-md">
                {t("home.heroLocation")}
              </h2>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/register" className="bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-3.5 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(251,213,58,0.3)] hover:-translate-y-0.5">
                {t("home.registerNow")}
              </Link>
              <Link to="/call-for-communications" className="border-2 border-tuncis-yellow/90 text-tuncis-yellow font-bold px-8 py-3.5 rounded-full hover:bg-tuncis-yellow/10 transition-all backdrop-blur-sm hover:-translate-y-0.5">
                {t("home.submitAbstract")}
              </Link>
              <Link to="/programme" className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm hover:-translate-y-0.5">
                {t("home.viewProgramme")}
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WELCOME & SIDEBAR SECTION ── */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* LEFT: Welcome Text */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Blue Banner Header */}
              <div className="bg-tuncis-blue text-white p-6 rounded-t-2xl shadow-md border-b-4 border-tuncis-yellow">
                <p className="font-heading text-lg sm:text-xl font-medium flex items-center gap-3">
                  <Rocket size={24} className="text-tuncis-yellow shrink-0" />
                  {t("home.bannerTitle")}
                </p>
              </div>

              {/* Welcome Title */}
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-tuncis-blue italic">
                  {t("home.welcomePrefix")} <span className="text-red-600 not-italic">{t("home.welcomeHighlight")}</span>
                </h2>
                <div className="w-24 h-1 bg-tuncis-yellow mt-6 rounded-full" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-medium">
                <p>{t("home.subtitle")}</p>
                <p className="text-gray-600">{t("home.para1")}</p>
                <p className="text-gray-600">{t("home.para2")}</p>
              </div>

              {/* Conference Highlights Grid — Matching reference layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-gray-100">
                {/* Dates */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0 mt-0.5">
                    <Calendar size={22} className="text-tuncis-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-tuncis-blue text-base leading-tight">
                      {t("home.infoDates")}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t("home.infoDatesVal")}
                    </p>
                  </div>
                </div>

                {/* Format */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0 mt-0.5">
                    <Users size={22} className="text-tuncis-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-tuncis-blue text-base leading-tight">
                      {t("home.infoFormat")}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t("home.infoFormatVal")}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0 mt-0.5">
                    <MapPin size={22} className="text-tuncis-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-tuncis-blue text-base leading-tight">
                      {t("home.infoLocation")}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t("home.infoLocationVal")}
                    </p>
                  </div>
                </div>

                {/* Organization */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0 mt-0.5">
                    <Award size={22} className="text-tuncis-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-tuncis-blue text-base leading-tight">
                      {t("home.infoOrg")}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t("home.infoOrgVal")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured NVIDIA AI Certification Callout */}
              <div className="pt-6 border-t border-gray-100">
                <div className="bg-gradient-to-r from-tuncis-blue-dark via-[#022c5e] to-tuncis-blue text-white rounded-2xl p-6 shadow-md border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-14 h-14 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <img src={nvidiaLogo} alt="NVIDIA" className="max-h-8 w-auto object-contain" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-1.5">
                        {t("home.nvidiaBadge")}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white leading-snug">
                        {t("home.nvidiaCalloutTitle")}
                      </h3>
                      <p className="text-white/75 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                        {t("home.nvidiaCalloutDesc")}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/nvidia-certification"
                    className="inline-flex items-center gap-2 bg-tuncis-yellow hover:bg-white text-tuncis-blue font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md shrink-0 self-stretch sm:self-auto justify-center"
                  >
                    <span>{t("home.nvidiaCalloutCta")}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Featured Best Paper Award Callout */}
              <div className="pt-4">
                <div className="bg-gradient-to-r from-[#172554] via-[#022c5e] to-[#1e3a8a] text-white rounded-2xl p-6 shadow-md border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-tuncis-yellow/10 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-tuncis-yellow rounded-xl p-2.5 flex items-center justify-center shrink-0 shadow-md">
                      <Award size={30} className="text-tuncis-blue" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-tuncis-yellow/20 text-tuncis-yellow border border-tuncis-yellow/30 mb-1.5">
                        {t("home.bestPaperBadge")}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white leading-snug">
                        {t("home.bestPaperCalloutTitle")}
                      </h3>
                      <p className="text-white/75 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                        {t("home.bestPaperCalloutDesc")}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/best-paper-award"
                    className="inline-flex items-center gap-2 bg-tuncis-yellow hover:bg-white text-tuncis-blue font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md shrink-0 self-stretch sm:self-auto justify-center"
                  >
                    <span>{t("home.bestPaperCalloutCta")}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Key Conference Tracks & Themes to fill whitespace */}
              <div className="pt-6 border-t border-gray-100">
                <p className="font-heading font-bold text-tuncis-blue text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-tuncis-yellow" />
                  <span>{t("home.themesTitle")}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {themes.map((theme, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 bg-tuncis-bg border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl hover:border-tuncis-blue/30 hover:bg-tuncis-blue/5 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-tuncis-yellow shrink-0" />
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Sidebar (Countdown & Dates) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <Countdown />
              <KeyDates />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="bg-tuncis-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            <p className="uppercase tracking-wider text-xs text-tuncis-blue font-bold mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tuncis-yellow inline-block" />
              {t("home.highlightsLabel")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-tuncis-blue font-bold">
              {t("home.highlightsTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              const card = (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-tuncis-yellow/50 transition-all duration-300 p-8 rounded-2xl group relative overflow-hidden h-full flex flex-col ${item.link ? "cursor-pointer" : ""}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-tuncis-yellow/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125 duration-500" />

                  <div className="mb-6 relative z-10">
                    {item.logo ? (
                      <img src={item.logo} alt={t(`home.${item.key}.title`)} className="h-10 object-contain" />
                    ) : (
                      <div className="w-14 h-14 bg-tuncis-blue/5 rounded-xl flex items-center justify-center group-hover:bg-tuncis-yellow/20 transition-colors duration-300">
                        <Icon size={30} className="text-tuncis-blue group-hover:text-tuncis-blue-dark transition-colors" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-tuncis-blue text-xl mb-3 relative z-10">
                    {t(`home.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-tuncis-gray leading-relaxed relative z-10 flex-1">
                    {t(`home.${item.key}.desc`)}
                  </p>
                  {item.link && (
                    <div className="mt-6 pt-4 border-t border-gray-100 relative z-10">
                      <p className="text-tuncis-blue font-bold text-sm flex items-center gap-1 group-hover:text-tuncis-yellow-dark transition-colors">
                        {t("home.learnMore")} 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              );

              return item.link ? (
                <Link key={i} to={item.link} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div key={i} className="h-full">{card}</div>
              );
            })}
          </div>

          {/* ── PARTNERS ── */}
          <div className="mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <p className="uppercase tracking-wider text-xs text-tuncis-blue font-bold mb-3 flex items-center gap-2 justify-center">
                <span className="w-8 h-0.5 bg-tuncis-yellow inline-block" />
                {t("home.partnersLabel")}
                <span className="w-8 h-0.5 bg-tuncis-yellow inline-block" />
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-tuncis-blue mb-16 font-bold text-center">
                {t("home.partnersTitle")}
              </h2>
            </motion.div>
            
            <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12">
              {partners.map((logo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all duration-300 p-4 overflow-hidden cursor-pointer"
                  style={{ flexShrink: 0, ...logo.cardStyle }}
                >
                  <Link to="/partners" className="w-full h-full flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.9, ...logo.imgStyle }}
                      className="hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


