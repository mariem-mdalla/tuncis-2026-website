import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTranslation } from 'react-i18next';

function YesNoToggle({ label, value, onChange, t }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
      <span className="text-tuncis-blue font-medium">{label}</span>
      <div className="flex gap-2">
        {['Yes', 'No'].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              value === opt
                ? 'bg-tuncis-blue text-white shadow-md'
                : 'bg-tuncis-bg text-tuncis-gray hover:bg-tuncis-blue/10 border border-gray-200'
            }`}
          >
            {opt === 'Yes' ? t('registration.yes') : t('registration.no')}
          </button>
        ))}
      </div>
    </div>
  );
}

const CustomCountrySelect = ({ value, onChange, labels, options, iconComponent: Icon }) => {
  return (
    <div className="PhoneInputCountry relative flex items-center gap-2 h-full">
      {Icon && <div className="w-5 h-4 overflow-hidden rounded-[2px] shadow-sm"><Icon country={value} label={labels ? labels[value] : value} /></div>}
      <span className="text-sm font-medium text-tuncis-blue whitespace-nowrap">
        {value ? `+${getCountryCallingCode(value)} ${labels ? labels[value] : value}` : 'Intl'}
      </span>
      <ChevronDown size={14} className="text-tuncis-gray/70 ml-1" />
      <select
        value={value || ''}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {options.map(({ value, label }) => (
          <option key={value || 'ZZ'} value={value || ''}>
            {label} {value && `+${getCountryCallingCode(value)}`}
          </option>
        ))}
      </select>
    </div>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const API_BASE = "/api";

export default function Registration() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', affiliation: '', status: 'Researcher',
  });
  const [consortium, setConsortium] = useState(null);
  const [gala, setGala] = useState(null);
  const [nvidia, setNvidia] = useState(null);
  const [dietary, setDietary] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
  
    const payload = {
      ...form,
      doctoralConsortium: consortium === 'Yes',
      galaDinner: gala === 'Yes',
      nvidiaCertification: nvidia === 'Yes',
      dietaryRestrictions: dietary,
    };

    try {
      const res = await fetch(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          throw new Error(Array.isArray(firstError) ? firstError[0] : t('registration.errorFallback'));
        }
        throw new Error(data.message || t('registration.errorFallback'));
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (status === 'success') {
    return (
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-tuncis-bg min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-tuncis-blue/10 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-tuncis-blue" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-tuncis-blue mb-3 font-bold">
            {t('registration.confirmedTitle')}
          </h1>
          <p className="text-tuncis-gray">
            {t('registration.confirmedMessage')}
          </p>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-3 font-bold">{t('registration.title')}</h1>
          <p className="text-white/80 text-base sm:text-lg">
            {t('registration.subtitle')}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden"
        >
          <div className="h-1.5 bg-gradient-to-r from-tuncis-blue via-tuncis-blue to-tuncis-yellow" />

          <div className="p-6 sm:p-10 space-y-10">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">1</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">{t('registration.personalInfo')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.fullName')} *</label>
                  <input
                    name="fullName" value={form.fullName} onChange={handleChange} required
                    type="text" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.email')} *</label>
                  <input
                    name="email" value={form.email} onChange={handleChange} required
                    type="email" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.phone')} *</label>
                  <PhoneInput
                    defaultCountry="TN"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    className="tuncis-phone-layout"
                    countrySelectComponent={CustomCountrySelect}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.affiliation')} *</label>
                  <input
                    name="affiliation" value={form.affiliation} onChange={handleChange} required
                    type="text" placeholder={t('registration.affiliationPlaceholder')} className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.status')} *</label>
                  <select
                    name="status" value={form.status} onChange={handleChange}
                    className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-sm">
                    <option value="Researcher">{t('registration.statusOptions.researcher')}</option>
                    <option value="Engineer">{t('registration.statusOptions.engineer')}</option>
                    <option value="PhD Student">{t('registration.statusOptions.phd')}</option>
                    <option value="Other">{t('registration.statusOptions.other')}</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">2</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">{t('registration.participation')}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                <YesNoToggle label={t('registration.doctoralConsortium')} value={consortium} onChange={setConsortium} t={t} />
                <YesNoToggle label={t('registration.galaDinner')} value={gala} onChange={setGala} t={t} />
                <YesNoToggle label={t('registration.nvidiaCertification')} value={nvidia} onChange={setNvidia} t={t} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">3</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">{t('registration.additionalInfo')}</h2>
              </div>
              <label className="block text-sm font-bold text-tuncis-blue mb-2">{t('registration.dietary')}</label>
              <textarea
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                rows="3"
                placeholder={t('registration.dietaryPlaceholder')}
                className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none resize-none text-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">4</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">{t('registration.feesTitle')}</h2>
              </div>
              <div className="bg-tuncis-blue rounded-xl p-6 space-y-3">
                <p className="text-white/90 text-sm leading-relaxed">{t('registration.feesText')}</p>
                <p className="text-white/60 text-xs italic">{t('registration.feesNote')}</p>
              </div>
            </motion.div>

            {status === 'error' && (
              <motion.p variants={itemVariants} className="text-red-600 text-sm">
                {errorMsg}
              </motion.p>
            )}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-4 rounded-xl hover:bg-[#e5c235] active:scale-95 transition-all shadow-md shadow-tuncis-yellow/20 text-base disabled:opacity-50"
              >
                <Check size={20} />
                {status === 'submitting' ? t('registration.submitting') : t('registration.submit')}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </section>
    </motion.main>
  );
}