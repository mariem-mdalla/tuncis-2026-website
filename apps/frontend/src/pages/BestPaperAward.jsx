import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, FileText, Megaphone, CheckCircle, Rocket } from "lucide-react";

import novationLogo from "../assets/logos/Novation_logo.png";

export default function BestPaperAward() {
  const { t } = useTranslation();

  const awardItems = [
    { icon: FileText,     key: "award1" },
    { icon: Megaphone,    key: "award2" },
    { icon: CheckCircle,  key: "award3" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* Hero */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent opacity-60" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="w-20 h-20 rounded-full bg-tuncis-yellow/20 flex items-center justify-center mx-auto mb-6">
            <Award size={40} className="text-tuncis-yellow" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
          >
            {t("bestPaper.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto"
          >
            {t("bestPaper.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20">

        {/* ── NOVATION PRIZE — big standalone banner, above everything else ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-tuncis-yellow/25 to-tuncis-yellow/5 border-2 border-tuncis-yellow rounded-3xl p-6 sm:p-10 mb-6 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-tuncis-yellow/30 flex items-center justify-center shrink-0">
              <Rocket size={34} className="text-tuncis-blue" />
            </div>
            <div className="flex-1">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-white/70 px-3 py-1 rounded-full mb-2">
                {t("bestPaper.novationBadge")}
              </span>
              <p className="text-xl sm:text-2xl font-bold text-tuncis-blue leading-snug">
                {t("bestPaper.award4")}
              </p>
            </div>
            <img
              src={novationLogo}
              alt="Novation City"
              className="shrink-0"
              style={{ maxHeight: "110px", maxWidth: "110px", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </motion.div>

        <div className="bg-white border border-gray-100 p-8 sm:p-12 rounded-3xl shadow-lg">

          <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-6">
            {t("bestPaper.awardsTitle")}
          </h2>

          <div className="space-y-4 mb-10">
            {awardItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-tuncis-blue/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-tuncis-blue" />
                </div>
                <p className="text-tuncis-gray font-medium pt-2">{t(`bestPaper.${item.key}`)}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-4">
              {t("bestPaper.selectionTitle")}
            </h2>
            <p className="text-tuncis-gray leading-relaxed">
              {t("bestPaper.selectionText")}
              <strong className="text-tuncis-blue">{t("bestPaper.selectionCommittee")}</strong>
              {t("bestPaper.selectionCriteria")}
            </p>
          </div>

        </div>
      </section>
    </motion.main>
  );
}
