import { motion } from 'framer-motion';
import { MapPin, Plane, BedDouble, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PracticalInfo() {
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
            {t('practicalInfo.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-xl"
          >
            {t('practicalInfo.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-tuncis-yellow/10 rounded-xl flex items-center justify-center text-tuncis-yellow mb-6">
              <MapPin size={24} />
            </div>
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-3">{t('practicalInfo.venue')}</h2>
            <p className="text-tuncis-gray leading-relaxed text-lg font-medium">Green Park Hotel</p>
            <p className="text-tuncis-gray/80">Sousse, Tunisia</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-tuncis-yellow/10 rounded-xl flex items-center justify-center text-tuncis-yellow mb-6">
              <Plane size={24} />
            </div>
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-3">{t('practicalInfo.gettingThere')}</h2>
            <p className="text-tuncis-gray leading-relaxed">
              {t('practicalInfo.gettingThereText')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-tuncis-yellow/10 rounded-xl flex items-center justify-center text-tuncis-yellow mb-6">
              <BedDouble size={24} />
            </div>
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-3">{t('practicalInfo.accommodation')}</h2>
            <p className="text-tuncis-gray italic leading-relaxed">
              {t('practicalInfo.accommodationPending')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-tuncis-yellow/10 rounded-xl flex items-center justify-center text-tuncis-yellow mb-6">
              <Mail size={24} />
            </div>
            <h2 className="font-heading text-xl font-bold text-tuncis-blue mb-3">{t('practicalInfo.contact')}</h2>
            <p className="text-tuncis-gray mb-2">For any inquiries regarding the event:</p>
            <a href="mailto:tuncis2026@horizon-tech.tn" className="text-tuncis-blue font-bold hover:text-tuncis-yellow transition-colors inline-block border-b-2 border-tuncis-blue hover:border-tuncis-yellow">
              tuncis2026@horizon-tech.tn
            </a>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
}