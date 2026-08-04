import { motion } from 'framer-motion';
import { Building2, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const leadership = [
  { name: "Imed Boughzala", roleKey: "roles.chair", affiliation: "Institut Mines-Télécom" },
  { name: "Narjès Bellamine Ben Saoud", roleKey: "roles.coChair", affiliation: "ENSI / Manouba University" },
  { name: "Chaker Essid", roleKey: "roles.coChair", affiliation: "FST / Tunis El Manar University" },
  { name: "Takoua Abdellatif", roleKey: "roles.organisationChair", affiliation: "Eniso / Sousse University" },
];

const organizing = [
  { name: "Sami Bhiri", roleKey: "organizing", affiliation: "ISIMM / Sousse University" },
  { name: "Olfa Besbes", roleKey: "organizing", affiliation: "ISSATS / Sousse University" },
  { name: "Meriem Labidi", roleKey: "organizing", affiliation: "ISITCOM / Sousse University" },
  { name: "Soussen Ben Jabra", roleKey: "organizing", affiliation: "ISSAT Kairouan / Kairouan University" },
  { name: "Rania Yangui", roleKey: "organizing", affiliation: "ISSATS / Sousse University" },
  { name: "Asma Mansour", roleKey: "organizing", affiliation: "Horizon University" },
  { name: "Jihed Hammami", roleKey: "organizing", affiliation: "Horizon University" },
  { name: "Ameny Rjiba", roleKey: "organizing", affiliation: "Horizon University" },
  { name: "Ramy Chouchene", roleKey: "organizing", affiliation: "Horizon University" },
  { name: "Noura Aboudi", roleKey: "organizing", affiliation: "Horizon University" },
];

function CommitteeGrid({ title, members }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/30 inline-block">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-tuncis-blue/5 rounded-full flex items-center justify-center text-tuncis-blue shrink-0">
              <User size={20} />
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-tuncis-blue mb-1">{m.name}</p>
              <p className="text-sm text-tuncis-gray mb-3 font-medium">{t(`committees.${m.roleKey}`)}</p>
              <p className="text-xs text-tuncis-gray/70 flex items-center gap-1.5">
                <Building2 size={12} className="text-tuncis-yellow" />
                {m.affiliation}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Committees() {
  const { t } = useTranslation();
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-blue-dark via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl mb-4 font-bold"
          >
            {t('committees.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            {t('committees.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 space-y-16">
        <CommitteeGrid title={t('committees.direction')} members={leadership} />
        <CommitteeGrid title={t('committees.organizing')} members={organizing} />
        
        {/* Scientific Committee Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/30 inline-block">{t('committees.scientific')}</h2>
          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm flex items-center justify-center min-h-[160px]">
            {/* // TODO: Replace with real Comité Scientifique members once provided by Mahdi */}
            <p className="text-tuncis-gray italic text-lg">{t('committees.comingSoon')}</p>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}