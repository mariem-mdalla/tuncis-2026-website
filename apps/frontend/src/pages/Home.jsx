import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Presentation, Users, GraduationCap, Award } from 'lucide-react';
import Timeline from '../components/TimeLine';

import aisLogo from '../assets/logos/The-Association-for-Information-Systems-AIS-Logo.webp';
import horizonLogo from '../assets/logos/horizon.png';
import uSousseLogo from '../assets/logos/universite-de-sousse.png';

export default function Home() {
  const { t } = useTranslation();

  const highlights = [
    { key: "keynotes", icon: Presentation },
    { key: "workshops", icon: Users },
    { key: "consortium", icon: GraduationCap },
    { key: "nvidia", icon: Award },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <section className="relative bg-tuncis-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tuncis-blue-dark via-tuncis-blue to-tuncis-blue-dark opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/20 via-transparent to-transparent opacity-50" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-white/10 border border-white/20 backdrop-blur-sm text-tuncis-yellow text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            {t('home.eyebrow')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl leading-tight max-w-4xl mb-6 font-bold"
          >
            {t('home.themePrefix')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tuncis-yellow to-yellow-200"> {t('home.themeHighlight')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed"
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/register"
              className="bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-3.5 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(251,213,58,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
            >
              {t('home.registerNow')}
            </Link>
            <Link
              to="/programme"
              className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              {t('home.viewProgramme')}
            </Link>
          </motion.div>
        </div>
      </section>

      <Timeline />

      <section className="bg-tuncis-bg py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-wider text-xs text-tuncis-blue font-bold mb-3 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-tuncis-yellow inline-block"></span> {t('home.highlightsLabel')}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-tuncis-blue mb-12 font-bold">
            {t('home.highlightsTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-8 rounded-2xl group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-tuncis-yellow/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <Icon size={32} className="text-tuncis-yellow mb-6" />
                  <h3 className="font-heading font-bold text-tuncis-blue text-xl mb-3 relative z-10">{t(`home.${item.key}.title`)}</h3>
                  <p className="text-sm text-tuncis-gray leading-relaxed relative z-10">{t(`home.${item.key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Partners Section */}
          <div className="mt-32">
            <p className="uppercase tracking-wider text-xs text-tuncis-blue font-bold mb-3 flex items-center gap-2 justify-center">
              <span className="w-8 h-0.5 bg-tuncis-yellow inline-block"></span> {t('home.partnersLabel')} <span className="w-8 h-0.5 bg-tuncis-yellow inline-block"></span>
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-tuncis-blue mb-16 font-bold text-center">
              {t('home.partnersTitle')}
            </h2>
            
            <div className="flex flex-row flex-nowrap justify-center items-stretch gap-6 sm:gap-10 md:gap-12">
              {[
                { src: uSousseLogo, alt: "Université de Sousse" },
                { src: aisLogo,     alt: "Association for Information Systems" },
                { src: horizonLogo, alt: "Horizon University" },
              ].map((logo, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all duration-300 p-6"
                  style={{ minHeight: '200px', minWidth: '240px', maxWidth: '320px', flex: '1 1 0' }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain opacity-85 hover:opacity-100 transition-opacity"
                    style={{ maxHeight: '150px' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}