import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const day1 = [
  { time: "9H – 10H",      key: "keynote1" },
  { time: "10H – 11H",     key: "workshops1" },
  { time: "11H – 11H15",   key: "coffeeBreak1" },
  { time: "11H15 – 13H",   key: "workshops2" },
  { time: "13H",           key: "lunch" },
  { time: "14H – 15H",     key: "keynote2" },
  { time: "15H",           key: "coffeeBreak2" },
  { time: "15H30 – 17H",   key: "workshops3" },
  { time: "17H – 18H",     key: "closing1" },
  { time: "19H",           key: "gala" },
];

const day2 = [
  { time: "9H – 10H",      key: "keynote3" },
  { time: "10H – 11H",     key: "coffeeBreak3" },
  { time: "11H15 – 12H30", key: "pitching" },
  { time: "12H30 – 13H",   key: "closing2" },
];

const itemLabels = {
  en: {
    keynote1:     "Keynote",
    workshops1:   "Collaborative Workshops",
    coffeeBreak1: "Coffee Break",
    workshops2:   "Workshops",
    lunch:        "Lunch Break",
    keynote2:     "Keynote 2",
    coffeeBreak2: "Coffee Break",
    workshops3:   "Collaborative Workshops 2",
    closing1:     "Wrap-up & Closing",
    gala:         "Gala Dinner",
    keynote3:     "Keynote",
    coffeeBreak3: "Coffee Break",
    pitching:     "Research Project Pitching / NVIDIA Certification Workshop",
    closing2:     "Wrap-up & Closing",
  },
  fr: {
    keynote1:     "Keynote",
    workshops1:   "Ateliers collaboratifs",
    coffeeBreak1: "Pause café",
    workshops2:   "Ateliers",
    lunch:        "Pause déjeuner",
    keynote2:     "Keynote 2",
    coffeeBreak2: "Pause café",
    workshops3:   "Ateliers collaboratifs 2",
    closing1:     "Restitution et Clôture",
    gala:         "Gala dîner",
    keynote3:     "Keynote",
    coffeeBreak3: "Pause café",
    pitching:     "Research project pitching / Workshop de certification NVIDIA",
    closing2:     "Restitution et clôture",
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
          <div className="space-y-6">
            <DaySchedule title={t('programme.day2')} items={day2} lang={lang} />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-tuncis-gray/70 italic px-1"
            >
              {t('programme.pendingNote')}
            </motion.p>
          </div>
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