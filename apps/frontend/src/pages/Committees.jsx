import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import imedImg from "../assets/chairs/imed-boughzela.png";
import narjesImg from "../assets/chairs/narjes-bellamine-ben-saoud.png";
import takouaImg from "../assets/chairs/takoua-abdellatif.png";

const organizing = [
  { name: "Sami Bhiri",          affiliation: "ISIMM / Sousse University" },
  { name: "Olfa Besbes",         affiliation: "ISSATS / Sousse University" },
  { name: "Meriem Labidi",       affiliation: "ISITCOM / Sousse University" },
  { name: "Soussen Ben Jabra",   affiliation: "ISSAT Kairouan / Kairouan University" },
  { name: "Rania Yangui",        affiliation: "ISSATS / Sousse University" },
  { name: "Asma Mansour",        affiliation: "Horizon University" },
  //{ name: "Jihed Hammami",       affiliation: "Horizon University" },
  { name: "Ameny Rjiba",         affiliation: "Horizon University" },
  //{ name: "Ramy Chouchene",      affiliation: "Horizon University" },
  //{ name: "Noura Aboudi",        affiliation: "Horizon University" },
];

function BioCard({ name, role, affiliation, image, bio }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
    >
      {/* Photo */}
      <div className="md:w-72 bg-gradient-to-br from-tuncis-bg to-gray-100 flex items-center justify-center p-8 shrink-0 border-b md:border-b-0 md:border-r border-gray-100">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-tuncis-blue/10">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
        <h3 className="font-heading font-bold text-2xl text-tuncis-blue mb-1">{name}</h3>
        <p className="text-tuncis-yellow font-bold uppercase tracking-wider text-xs mb-2">{role}</p>
        <p className="text-sm text-tuncis-gray/70 flex items-center gap-1.5 mb-5 pb-5 border-b border-gray-100">
          <Building2 size={13} className="text-tuncis-gray/40 shrink-0" />
          {affiliation}
        </p>
        <p className="text-tuncis-gray leading-relaxed text-sm">{bio}</p>
      </div>
    </motion.div>
  );
}

export default function Committees() {
  const { t } = useTranslation();

  const leadership = [
    {
      name: "Imed Boughzala",
      role: t("committees.roles.chair"),
      affiliation: "ENSIIE",
      image: imedImg,
      bio: t("committees.imed.bio"),
    },
    {
      name: "Narjes Bellamine Ben Saoud",
      role: t("committees.roles.tuncisCoChair"),
      affiliation: "ENSI / Manouba University",
      image: narjesImg,
      bio: t("committees.narjes.bio"),
    },
    {
      name: "Takoua Abdellatif",
      role: t("committees.roles.tuncisCoChair"),
      affiliation: "ENISo / Sousse University",
      image: takouaImg,
      bio: t("committees.takoua.bio"),
    },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-blue-dark via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-5xl mb-4 font-bold">
            {t("committees.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/80 text-lg max-w-2xl">
            {t("committees.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 space-y-16">

        {/* 1 — Conference Chairs with photos + bios */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/40 inline-block">
            {t("committees.direction")}
          </h2>
          <div className="space-y-8">
            {leadership.map((member, i) => (
              <BioCard key={i} {...member} />
            ))}
          </div>
        </div>

        {/* 2 — Scientific Committee (coming soon) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/40 inline-block">
            {t("committees.scientific")}
          </h2>
          <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-xs flex items-center justify-center min-h-[120px] text-center">
            <p className="text-tuncis-gray italic text-base sm:text-lg">{t("committees.comingSoon")}</p>
          </div>
        </motion.div>

        {/* 3 — Organizing Committee (clean cards: name + affiliation only, no avatars) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("committees.organizing")}
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-tuncis-blue bg-tuncis-blue/5 px-3 py-1 rounded-full">
              {organizing.length} Members
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {organizing.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-white border border-gray-100 hover:border-tuncis-blue/30 p-5 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-tuncis-yellow group flex flex-col justify-center"
              >
                <h3 className="font-heading font-bold text-base sm:text-lg text-tuncis-blue group-hover:text-tuncis-blue-dark transition-colors">
                  {m.name}
                </h3>
                <p className="text-xs sm:text-sm text-tuncis-gray/80 flex items-center gap-2 mt-1.5 font-medium">
                  <Building2 size={14} className="text-tuncis-yellow/90 shrink-0" />
                  <span>{m.affiliation}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>
    </motion.main>
  );
}
