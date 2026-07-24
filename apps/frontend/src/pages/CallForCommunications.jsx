import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, FileText, Upload, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const dates = [
  { date: "Sep 15, 2026", key: "submission" },
  { date: "Sep 30, 2026", key: "acceptance" },
  { date: "Oct 7, 2026", key: "registrationDeadline" },
];

export default function CallForCommunications() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl mb-4 font-bold"
          >
            {t('cfc.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            {t('cfc.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 space-y-8 bg-white border border-gray-100 shadow-xl shadow-tuncis-blue/5 rounded-2xl p-8 md:p-10"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-tuncis-yellow/10 flex items-center justify-center text-tuncis-yellow">
                <Lightbulb size={24} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-tuncis-blue">{t('cfc.topicsTitle')}</h2>
            </div>
            <p className="text-tuncis-gray leading-relaxed mb-6 italic border-l-4 border-gray-200 pl-4">
              {t('cfc.topicsPending')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-tuncis-yellow/10 flex items-center justify-center text-tuncis-yellow">
                <FileText size={24} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-tuncis-blue">{t('cfc.guidelinesTitle')}</h2>
            </div>
            <p className="text-tuncis-gray leading-relaxed mb-8">
              {t('cfc.guidelinesText')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-4 rounded-xl hover:bg-[#e5c235] transition-colors shadow-lg shadow-tuncis-yellow/20"
            >
              <Upload size={20} />
              {t('cfc.submitCta')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-fit"
        >
          <div className="bg-white border border-gray-100 shadow-xl shadow-tuncis-blue/5 rounded-2xl p-8">
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-tuncis-yellow" />
              {t('cfc.datesTitle')}
            </h2>
            <div className="space-y-6">
              {dates.map((d, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-tuncis-yellow border-2 border-white shadow-sm" />
                  <div className="absolute left-[4.5px] top-4 w-[2px] h-[calc(100%+16px)] bg-gray-100 last:hidden" />
                  <p className="font-heading font-bold text-tuncis-blue text-lg">{d.date}</p>
                  <p className="text-sm text-tuncis-gray mt-1">{t(`milestones.${d.key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}