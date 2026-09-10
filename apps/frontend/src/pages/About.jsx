import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Globe, CheckCircle2, ExternalLink, Award, Sparkles, Building2 } from "lucide-react";

import tunaisiaLogo from "../assets/logos/tunaisia_logo.png";
import aisLogo from "../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp";

export default function About() {
  const { t } = useTranslation();

  const tunaisiaMissions = t("about.tunaisiaMissions", { returnObjects: true }) || [];
  const aisMissions = t("about.aisMissions", { returnObjects: true }) || [];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-24"
    >
      {/* Hero */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/15 via-transparent to-transparent opacity-60" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            {t("about.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            {t("about.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 space-y-12">

        {/* ── Section 1: What is TunAISia? ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Logo Preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white rounded-2xl p-6 w-full max-w-xs flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden min-h-[160px]">
                <img
                  src={tunaisiaLogo}
                  alt="TunAISia Logo"
                  className="h-28 sm:h-36 w-auto object-contain drop-shadow-sm scale-125"
                />
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tuncis-blue/10 text-tuncis-blue">
                <Building2 size={13} className="text-tuncis-yellow" />
                <span>{t("about.tunaisiaBadge")}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue">
                {t("about.tunaisiaTitle")}
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {t("about.tunaisiaDesc1")}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t("about.tunaisiaDesc2")}
              </p>

              {/* Missions Checklist */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-heading font-bold text-tuncis-blue text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-tuncis-yellow" />
                  <span>{t("about.tunaisiaMissionTitle")}</span>
                </p>
                <ul className="space-y-2.5">
                  {tunaisiaMissions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-normal">
                      <CheckCircle2 size={17} className="text-tuncis-yellow shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── Section 2: What is AIS? ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Logo Preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-tuncis-blue rounded-2xl p-8 w-full max-w-xs flex items-center justify-center shadow-md">
                <img
                  src={aisLogo}
                  alt="Association for Information Systems Logo"
                  className="max-h-24 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tuncis-blue/10 text-tuncis-blue">
                <Globe size={13} className="text-tuncis-yellow" />
                <span>{t("about.aisBadge")}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue">
                {t("about.aisTitle")}
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {t("about.aisDesc1")}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t("about.aisDesc2")}
              </p>

              {/* Pillars Checklist */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-heading font-bold text-tuncis-blue text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={16} className="text-tuncis-yellow" />
                  <span>{t("about.aisMissionTitle")}</span>
                </p>
                <ul className="space-y-2.5 mb-6">
                  {aisMissions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-normal">
                      <CheckCircle2 size={17} className="text-tuncis-yellow shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* External link to aisnet.org */}
                <a
                  href="https://aisnet.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-tuncis-blue hover:bg-tuncis-blue-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  <Globe size={16} />
                  <span>{t("about.visitAis")}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── Section 3: Partnership & Synergy in TUNCIS 2026 ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-tuncis-blue-dark via-[#022c5e] to-tuncis-blue text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-tuncis-yellow/15 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              {t("about.partnershipTitle")}
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t("about.partnershipDesc")}
            </p>
          </div>
        </motion.div>

      </section>
    </motion.main>
  );
}
