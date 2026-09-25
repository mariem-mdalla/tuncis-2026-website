import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronDown } from "lucide-react";
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

// Scientific Committee: names + affiliations only (bios live in the Keynotes section)
const scientific = [
  { name: "Mohamed Louadi",            affiliation: "ISG Tunis" },
  { name: "Helmi Mardassi",            affiliation: "Management Unit for European Framework Programmes" },
  { name: "Hichem Tourki",             affiliation: "Novation City" },
  { name: "Imed Boughzala",            affiliation: "ENSIIE, France" },
  { name: "Narjes Bellamine Ben Saoud", affiliation: "ENSI / Manouba University" },
  { name: "Faiez Gargouri",            affiliation: "ISIMS / Sfax University" },
  { name: "Meriem Kallel",             affiliation: "Ministry of Higher Education & Scientific Research, Horizon Europe" },
  { name: "Chaker Essid",              affiliation: "Faculty of Sciences of Tunis" },
  { name: "Sana Rouis Skandrani",      affiliation: "Karlstad University, Sweden" },
  { name: "Sonia Ayachi Ghannouchi",   affiliation: "ISG / Sousse University" },
  { name: "Nabila Boukef",             affiliation: "SKEMA Business School, France" },
  { name: "Rim Faiez Zitouni",         affiliation: "IHEC Carthage" },
  { name: "Mohamed Ali Mahjoub",       affiliation: "ENISo / Sousse University" },
  { name: "Yemna Sayeb",               affiliation: "ENSI / Manouba University" },
  { name: "Ahmed Maalel",              affiliation: "ISSATso / Sousse University" },
  { name: "Olfa Chourabi",             affiliation: "IMT Business School, France" },
];

const keynotes = [
  { speakerKey: "programme.sessions.d1_keynote1_speaker", roleKey: "programme.sessions.d1_keynote1_role", topicKey: "programme.sessions.d1_keynote1_topic", bioKey: "committees.louadi.bio" },
  { speakerKey: "programme.sessions.d1_keynote2_speaker", roleKey: "programme.sessions.d1_keynote2_role", topicKey: "programme.sessions.d1_keynote2_topic" },
  { speakerKey: "programme.sessions.d2_keynote_speaker", roleKey: "programme.sessions.d2_keynote_role", topicKey: "programme.sessions.d2_keynote_topic" },
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

function KeynoteCard({ speaker, role, topic, bio, isFr }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-gray-100 p-6 rounded-xl shadow-xs">
      <h3 className="font-heading font-bold text-base text-tuncis-blue mb-1">{speaker}</h3>
      <p className="text-xs text-tuncis-gray/70 mb-3">{role}</p>
      <p className="text-sm text-tuncis-gray leading-relaxed italic">{topic}</p>
      {bio && (
        <>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-tuncis-blue hover:text-tuncis-blue-dark transition-colors"
          >
            {open ? (isFr ? "Masquer la bio" : "Hide bio") : (isFr ? "Voir la bio" : "Read bio")}
            <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden text-sm text-tuncis-gray leading-relaxed"
              >
                <span className="block mt-3 pt-3 border-t border-gray-100">{bio}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

function MemberGrid({ members }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {members.map((m, i) => (
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
  );
}

export default function Committees() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith("fr");

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

        {/* 2 — Keynotes (bios shown here only) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/40 inline-block">
            Keynotes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {keynotes.map((k, i) => (
              <KeynoteCard
                key={i}
                speaker={t(k.speakerKey)}
                role={t(k.roleKey)}
                topic={t(k.topicKey)}
                bio={k.bioKey ? t(k.bioKey) : null}
                isFr={isFr}
              />
            ))}
          </div>
        </motion.div>

        {/* 3 — Scientific Committee (name + affiliation only) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("committees.scientific")}
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-tuncis-blue bg-tuncis-blue/5 px-3 py-1 rounded-full">
              {scientific.length} Members
            </span>
          </div>
          <MemberGrid members={scientific} />
        </motion.div>

        {/* 4 — Organizing Committee (clean cards: name + affiliation only, no avatars) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
            <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
              {t("committees.organizing")}
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-tuncis-blue bg-tuncis-blue/5 px-3 py-1 rounded-full">
              {organizing.length} Members
            </span>
          </div>
          <MemberGrid members={organizing} />
        </motion.div>

      </section>
    </motion.main>
  );
}
