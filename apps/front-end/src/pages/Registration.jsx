import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function YesNoToggle({ label, value, onChange }) {
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
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Registration() {
  const [consortium, setConsortium] = useState(null);
  const [gala, setGala] = useState(null);
  const [nvidia, setNvidia] = useState(null);

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* Page header */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-3 font-bold">Registration</h1>
          <p className="text-white/80 text-base sm:text-lg">
            Join us for TUNCIS 2026 — registration takes less than 5 minutes.
          </p>
        </div>
      </section>

      {/* Centered form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-tuncis-blue via-tuncis-blue to-tuncis-yellow" />

          <div className="p-6 sm:p-10 space-y-10">
            {/* Section 1 — Personal */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">1</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">First Name *</label>
                  <input type="text" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">Last Name *</label>
                  <input type="text" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">Email Address *</label>
                  <input type="email" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">Affiliation *</label>
                  <input type="text" placeholder="University or organization" className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-tuncis-blue mb-2">Status *</label>
                  <select className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-sm">
                    <option>Researcher</option>
                    <option>Post-doctoral Researcher</option>
                    <option>PhD Student</option>
                    <option>Practitioner</option>
                    <option>Teacher</option>
                    <option>Student</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Section 2 — Participation */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">2</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">Participation Options</h2>
              </div>
              <div className="divide-y divide-gray-100">
                <YesNoToggle label="Doctoral Consortium" value={consortium} onChange={setConsortium} />
                <YesNoToggle label="Gala Dinner" value={gala} onChange={setGala} />
                <YesNoToggle label="NVIDIA AI Certification" value={nvidia} onChange={setNvidia} />
              </div>
            </motion.div>

            {/* Section 3 — Additional */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 shrink-0 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue font-bold text-sm">3</div>
                <h2 className="font-heading text-lg sm:text-xl text-tuncis-blue font-bold">Additional Information</h2>
              </div>
              <label className="block text-sm font-bold text-tuncis-blue mb-2">Dietary Restrictions</label>
              <textarea
                rows="3"
                placeholder="Let us know of any allergies or dietary requirements"
                className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none resize-none text-sm"
              />
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-4 rounded-xl hover:bg-[#e5c235] active:scale-95 transition-all shadow-md shadow-tuncis-yellow/20 text-base"
              >
                <Check size={20} />
                Submit Registration
              </button>
            </motion.div>
          </div>
        </motion.form>
      </section>
    </motion.main>
  );
}