import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Building, FlaskConical, Briefcase } from "lucide-react";

// Academic & Institutional Logos
import uSousseLogo   from "../assets/logos/universite-de-sousse.png";
import manoubaLogo   from "../assets/logos/manouba-removebg-preview.png";
import utmLogo       from "../assets/logos/utm.png";
import eniseLogo     from "../assets/logos/Logo_ENISo,_Tunisie.svg.webp";
import horizonLogo   from "../assets/logos/Horizon-logo.png";
import doctoralLogo  from "../assets/logos/doctoral-school-logo.png";
import tunaisiaLogo  from "../assets/logos/tunaisia_logo.png";
import aisLogo       from "../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp";
import carthageLogo  from "../assets/logos/carthage-logo.png";

// Research Lab Logos
import riadiLogo     from "../assets/logos/riadi-log.png";
import sercomLogo    from "../assets/logos/sercom.png";
import larodecLogo   from "../assets/logos/larodec-logo.png";
import sixComLogo    from "../assets/logos/6com-logo.png";

// Industrial Logos
import nvidiaLogo    from "../assets/logos/NVIDIA_logo.webp";
import deloitteLogo  from "../assets/logos/Logo_of_Deloitte.svg.webp";
import draxlLogo     from "../assets/logos/draxlmaier-logo.png";
import leoniLogo     from "../assets/logos/leoni-logo.png";
import proxymLogo    from "../assets/logos/logo-proxym-png.png";
import novationLogo  from "../assets/logos/Novation_logo.png";
import weviooLogo    from "../assets/logos/wevioo-logo.png";

const academicList = [
  { key: "uSousse",  src: uSousseLogo },
  { key: "manouba",  src: manoubaLogo },
  { key: "utm",      src: utmLogo },
  { key: "eniso",    src: eniseLogo },
  { key: "horizon",  src: horizonLogo },
  { key: "doctoral", src: doctoralLogo },
  { key: "tunaisia", src: tunaisiaLogo },
  { key: "ais",      src: aisLogo },
  { key: "carthage", src: carthageLogo },
];

const researchList = [
  { key: "riadi",   src: riadiLogo },
  { key: "sercom",  src: sercomLogo },
  { key: "larodec", src: larodecLogo },
  { key: "sixcom",  src: sixComLogo },
];

const industrialList = [
  { key: "nvidia",   src: nvidiaLogo },
  { key: "deloitte", src: deloitteLogo },
  { key: "draxl",    src: draxlLogo },
  { key: "leoni",    src: leoniLogo },
  { key: "proxym",   src: proxymLogo },
  { key: "novation", src: novationLogo },
  { key: "wevioo",   src: weviooLogo },
];

function PartnerCard({ partnerKey, logo, tag, icon: TagIcon }) {
  const { t } = useTranslation();
  
  let scaleClass = "max-h-16 max-w-[85%]";
  if (partnerKey === "tunaisia") {
    scaleClass = "max-h-20 scale-140 max-w-[90%]";
  } else if (partnerKey === "wevioo") {
    scaleClass = "max-h-20 scale-150 max-w-[90%]";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Logo Container */}
        <div className="h-24 w-full bg-tuncis-bg/60 rounded-xl p-4 flex items-center justify-center mb-5 border border-gray-100 overflow-hidden">
          <img
            src={logo}
            alt={t(`partners.items.${partnerKey}.name`)}
            className={`${scaleClass} object-contain transition-transform`}
          />
        </div>

        {/* Category Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-tuncis-blue/5 text-tuncis-blue mb-3">
          <TagIcon size={12} className="text-tuncis-yellow" />
          <span>{tag}</span>
        </div>

        {/* Name */}
        <h3 className="font-heading text-lg font-bold text-tuncis-blue mb-2">
          {t(`partners.items.${partnerKey}.name`)}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {t(`partners.items.${partnerKey}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}

export default function Partners() {
  const { t } = useTranslation();

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* Hero */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/15 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            {t("partners.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            {t("partners.subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 space-y-16">

        {/* Section 1: Academic & Institutional Partners */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <Building className="text-tuncis-blue" size={26} />
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("partners.categories.academic")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicList.map((item) => (
              <PartnerCard
                key={item.key}
                partnerKey={item.key}
                logo={item.src}
                tag={t("partners.categories.academic")}
                icon={Building}
              />
            ))}
          </div>
        </motion.section>

        {/* Section 2: Research Laboratories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <FlaskConical className="text-tuncis-blue" size={26} />
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("partners.categories.research")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchList.map((item) => (
              <PartnerCard
                key={item.key}
                partnerKey={item.key}
                logo={item.src}
                tag={t("partners.categories.research")}
                icon={FlaskConical}
              />
            ))}
          </div>
        </motion.section>

        {/* Section 3: Industrial Partners */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <Briefcase className="text-tuncis-blue" size={26} />
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("partners.categories.industrial")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industrialList.map((item) => (
              <PartnerCard
                key={item.key}
                partnerKey={item.key}
                logo={item.src}
                tag={t("partners.categories.industrial")}
                icon={Briefcase}
              />
            ))}
          </div>
        </motion.section>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-tuncis-blue rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden text-white shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-tuncis-yellow/15 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-tuncis-yellow">
              <Mail size={28} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              {t("partners.contactTitle")}
            </h3>
            <p className="text-white/80 max-w-lg mx-auto mb-6">
              {t("partners.contactText")}{" "}
              <a
                href="mailto:tuncis2026@horizon-tech.tn"
                className="text-tuncis-yellow font-bold underline hover:text-white transition-colors"
              >
                tuncis2026@horizon-tech.tn
              </a>
            </p>
          </div>
        </motion.div>

      </div>
    </motion.main>
  );
}
