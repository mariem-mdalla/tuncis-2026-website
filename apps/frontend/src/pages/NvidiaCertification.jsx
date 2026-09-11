import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Terminal
} from "lucide-react";

import nvidiaLogo from "../assets/logos/NVIDIA_logo.webp";
import horizonLogo from "../assets/logos/Horizon-logo.png";

const TOPIC_ICONS = [Cpu, Layers, Sparkles, Terminal, BookOpen, GraduationCap];

export default function NvidiaCertification() {
  const { t } = useTranslation();

  const topics = t("nvidiaPage.topics", { returnObjects: true }) || [];
  const benefits = t("nvidiaPage.benefits", { returnObjects: true }) || [];

  const OFFICIAL_NVIDIA_URL = "https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-FX-26+V1";

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-24"
    >
      {/* ── HERO SECTION ── */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tuncis-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Badges / Logos */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{t("nvidiaPage.badge")}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
              <GraduationCap size={14} className="text-tuncis-yellow" />
              <span>{t("nvidiaPage.deliveredBy")}: {t("nvidiaPage.deliveryPartner")}</span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            {t("nvidiaPage.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/85 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
          >
            {t("nvidiaPage.heroSubtitle")}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-tuncis-yellow hover:bg-white text-tuncis-blue font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{t("nvidiaPage.registerCta")}</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href={OFFICIAL_NVIDIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{t("nvidiaPage.officialLinkText")}</span>
              <ExternalLink size={16} className="text-emerald-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-12">

        {/* ── COURSE OVERVIEW CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-6 sm:pb-8 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-2">
                {t("nvidiaPage.accreditation")}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue">
                {t("nvidiaPage.courseOverviewTitle")}
              </h2>
            </div>

            {/* Co-branding logos - fixed container boxes so neither logo can ever expand or blow out */}
            <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 px-3 sm:px-4 py-2 rounded-2xl border border-gray-200/80 shrink-0 self-start md:self-auto shadow-sm">
              <div className="w-24 sm:w-28 h-7 sm:h-8 flex items-center justify-center shrink-0">
                <img
                  src={nvidiaLogo}
                  alt="NVIDIA DLI"
                  style={{ maxHeight: "24px", maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
                />
              </div>
              <div className="w-px h-6 bg-gray-300 shrink-0" />
              <div className="w-24 sm:w-28 h-7 sm:h-8 flex items-center justify-center shrink-0">
                <img
                  src={horizonLogo}
                  alt="Horizon University"
                  style={{ maxHeight: "24px", maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
                />
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-8">
            {t("nvidiaPage.courseDesc")}
          </p>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-1">
                {t("nvidiaPage.details.formatTitle")}
              </span>
              <span className="text-sm font-bold text-tuncis-blue">
                {t("nvidiaPage.details.formatVal")}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-1">
                {t("nvidiaPage.details.credentialTitle")}
              </span>
              <span className="text-sm font-bold text-emerald-700">
                {t("nvidiaPage.details.credentialVal")}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-1">
                {t("nvidiaPage.details.prereqTitle")}
              </span>
              <span className="text-sm font-bold text-tuncis-blue">
                {t("nvidiaPage.details.prereqVal")}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-1">
                {t("nvidiaPage.details.partnerTitle")}
              </span>
              <span className="text-sm font-bold text-tuncis-blue">
                {t("nvidiaPage.details.partnerVal")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── CURRICULUM & TOPICS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm"
        >
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-tuncis-yellow-dark bg-amber-50 px-3 py-1 rounded-full inline-block mb-2">
              Syllabus
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue">
              {t("nvidiaPage.curriculumTitle")}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {t("nvidiaPage.curriculumDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.isArray(topics) && topics.map((item, index) => {
              const IconComponent = TOPIC_ICONS[index % TOPIC_ICONS.length];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-tuncis-blue text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── WHY EARN THIS CERTIFICATE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue mb-8">
            {t("nvidiaPage.benefitsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(benefits) && benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-tuncis-blue/10 text-tuncis-blue flex items-center justify-center mb-4">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-tuncis-blue text-base mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-tuncis-blue-dark via-[#022c5e] to-tuncis-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-tuncis-yellow/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {t("nvidiaPage.calloutTitle")}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t("nvidiaPage.calloutSubtitle")}
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-tuncis-yellow hover:bg-white text-tuncis-blue font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{t("nvidiaPage.enrollNow")}</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={OFFICIAL_NVIDIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <span>{t("nvidiaPage.officialLinkText")}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.main>
  );
}
