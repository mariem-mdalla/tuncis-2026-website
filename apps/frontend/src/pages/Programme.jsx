import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const day1 = [
  { time: "08:30 – 09:00", key: "welcome" },
  { time: "09:00 – 10:00", key: "keynote" },
  { time: "10:00 – 12:00", key: "workshops" },
  { time: "12:00 – 13:30", key: "lunch" },
  { time: "13:30 – 16:00", key: "consortium" },
  { time: "16:00 – 17:00", key: "nvidia" },
];

const day2 = [
  { time: "09:00 – 10:30", key: "keynote2" },
  { time: "10:30 – 12:30", key: "presentations" },
  { time: "12:30 – 14:00", key: "lunch2" },
  { time: "14:00 – 16:00", key: "panel" },
  { time: "20:00", key: "gala" },
];

const itemLabels = {
  en: {
    welcome: "Registration & Welcome Coffee", keynote: "Opening Keynote", workshops: "Collaborative Workshops",
    lunch: "Lunch", consortium: "Doctoral Consortium Sessions", nvidia: "NVIDIA AI Certification Track",
    keynote2: "Keynote: Industrial Deployment of AI", presentations: "Paper Presentations",
    lunch2: "Lunch", panel: "Panel: Research-Industry Collaboration", gala: "Gala Dinner",
  },
  fr: {
    welcome: "Accueil & Café de Bienvenue", keynote: "Keynote d'Ouverture", workshops: "Ateliers Collaboratifs",
    lunch: "Déjeuner", consortium: "Sessions du Doctoral Consortium", nvidia: "Parcours Certification NVIDIA",
    keynote2: "Keynote : Déploiement Industriel de l'IA", presentations: "Présentations de Communications",
    lunch2: "Déjeuner", panel: "Panel : Collaboration Recherche-Industrie", gala: "Dîner de Gala",
  },
};

function DaySchedule({ title, items, lang }) {
  const labels = itemLabels[lang] || itemLabels.fr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8"
    >
      <h3 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-4 border-b border-gray-100">{title}</h3>
      <div className="border-l-2 border-tuncis-blue/20 pl-8 space-y-8 relative">
        {items.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-tuncis-bg border-4 border-tuncis-yellow group-hover:scale-125 transition-transform" />
            <p className="text-sm uppercase tracking-widest text-tuncis-yellow font-bold mb-1">{item.time}</p>
            <p className="text-tuncis-blue font-bold text-lg group-hover:text-tuncis-blue-dark transition-colors">
              {labels[item.key]}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Programme() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-tuncis-blue-dark via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl mb-4 font-bold"
          >
            {t('programme.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg"
          >
            {t('programme.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <DaySchedule title={t('programme.day1')} items={day1} lang={lang} />
          <DaySchedule title={t('programme.day2')} items={day2} lang={lang} />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-sm text-tuncis-gray/70 mt-12 italic"
        >
          {t('programme.note')}
        </motion.p>
      </section>
    </motion.main>
  );
}