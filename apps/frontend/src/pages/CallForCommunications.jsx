import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Lightbulb, Users, Award, CheckCircle2, Clock, FileText, Rocket } from 'lucide-react';

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-tuncis-gray">
          <CheckCircle2 size={18} className="text-tuncis-yellow shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionCard({ icon: Icon, title, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className={`bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0">
          <Icon size={20} />
        </div>
        <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function CallForCommunications() {
  const { t } = useTranslation();

  const objectives   = t('cfc.objectives',    { returnObjects: true });
  const topics       = t('cfc.topics',        { returnObjects: true });
  const evaluation   = t('cfc.evaluation',    { returnObjects: true });
  const pitchContent = t('cfc.pitchContent',  { returnObjects: true });
  const who          = t('cfc.who',           { returnObjects: true });
  const benefits     = t('cfc.benefits',      { returnObjects: true });
  const submission   = t('cfc.submission',    { returnObjects: true });

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* ── Hero ── */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-white/10 border border-white/20 text-tuncis-yellow text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-5"
          >
            {t('cfc.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 font-bold"
          >
            {t('cfc.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl"
          >
            {t('cfc.intro')}
          </motion.p>
        </div>
      </section>

      {/* ── Animated gradient divider ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
        className="h-1 bg-gradient-to-r from-tuncis-yellow via-tuncis-blue/60 to-transparent"
      />

      {/* ── Content ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-tuncis-gray leading-relaxed"
        >
          {t('cfc.context')}
        </motion.p>

        {/* Row 1 — Objectives + Who Can Apply */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionCard icon={Target} title={t('cfc.objectivesTitle')}>
            <CheckList items={objectives} />
          </SectionCard>

          <SectionCard icon={Users} title={t('cfc.whoTitle')}>
            <div className="flex flex-wrap gap-3">
              {who.map((role, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 border border-tuncis-yellow/50 bg-tuncis-yellow/5 text-tuncis-blue text-sm font-medium px-4 py-2 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tuncis-yellow shrink-0" />
                  {role}
                </span>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Topics — numbered badges */}
        <SectionCard icon={Lightbulb} title={t('cfc.topicsTitle')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-tuncis-bg px-4 py-3 rounded-xl text-sm text-tuncis-gray"
              >
                <span className="w-6 h-6 rounded-full bg-tuncis-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {topic}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Row 2 — Evaluation + Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionCard icon={Award} title={t('cfc.evaluationTitle')}>
            <CheckList items={evaluation} />
          </SectionCard>

          <SectionCard icon={Rocket} title={t('cfc.benefitsTitle')}>
            <CheckList items={benefits} />
          </SectionCard>
        </div>

        {/* Pitch Format — visual timer cards */}
        <SectionCard icon={Clock} title={t('cfc.pitchTitle')}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-tuncis-blue rounded-2xl p-6 flex items-center gap-5">
              <span className="font-heading text-6xl font-bold text-tuncis-yellow leading-none">05</span>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-wider">min</p>
                <p className="text-white/70 text-sm mt-1">{t('cfc.pitchPresentation')}</p>
              </div>
            </div>
            <div className="flex-1 bg-tuncis-bg border border-tuncis-blue/20 rounded-2xl p-6 flex items-center gap-5">
              <span className="font-heading text-6xl font-bold text-tuncis-blue leading-none">05</span>
              <div>
                <p className="text-tuncis-blue font-bold text-sm uppercase tracking-wider">min</p>
                <p className="text-tuncis-gray text-sm mt-1">{t('cfc.pitchDiscussion')}</p>
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-tuncis-blue mb-3">{t('cfc.pitchAddressTitle')}</p>
          <CheckList items={pitchContent} />
        </SectionCard>

        {/* Submission — dark CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="bg-tuncis-blue rounded-2xl overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-tuncis-yellow shrink-0">
                <FileText size={20} />
              </div>
              <h2 className="font-heading text-lg sm:text-xl text-white font-bold">{t('cfc.submissionTitle')}</h2>
            </div>

            <p className="text-white/60 text-sm italic mb-6 border-l-2 border-tuncis-yellow/50 pl-4 leading-relaxed">
              "Selected projects will be presented before a distinguished panel of senior researchers, industry leaders, and innovation stakeholders."
            </p>

            <p className="text-white/80 text-sm mb-4">{t('cfc.submissionIntro')}</p>
            <ul className="space-y-3 mb-8">
              {submission.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <CheckCircle2 size={16} className="text-tuncis-yellow shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="inline-block bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-3.5 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(251,213,58,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
            >
              {t('cfc.submitCta')}
            </Link>
          </div>
        </motion.div>

      </section>
    </motion.main>
  );
}