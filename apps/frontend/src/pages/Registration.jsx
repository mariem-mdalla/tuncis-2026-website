import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslation } from "react-i18next";

// ── Fee Table Data (order matters — Gala is last) ──────────────────
const getFeeRows = (t) => [
  { key: "day1",          label: t("registration.fees.day1"),             local: 170, intl: 70 },
  { key: "day2",          label: t("registration.fees.day2"),             local: 120, intl: 40 },
  { key: "accommodation", label: t("registration.fees.accommodation"),    local: 170, intl: 70,  note: t("registration.fees.accommodationNote") },
  { key: "nvidia",        label: t("registration.fees.nvidia"),           local: 130, intl: 100 },
  { key: "gala",          label: t("registration.fees.gala"),             local: 100, intl: 40 },
];

// ── Helpers ────────────────────────────────────────────────────────
const CustomCountrySelect = ({ value, onChange, labels, options, iconComponent: Icon }) => (
  <div className="PhoneInputCountry relative flex items-center gap-2 h-full">
    {Icon && (
      <div className="w-5 h-4 overflow-hidden rounded-[2px] shadow-sm">
        <Icon country={value} label={labels ? labels[value] : value} />
      </div>
    )}
    <span className="text-sm font-medium text-tuncis-blue whitespace-nowrap">
      {value ? `+${getCountryCallingCode(value)} ${labels ? labels[value] : value}` : "Intl"}
    </span>
    <ChevronDown size={14} className="text-tuncis-gray/70 ml-1" />
    <select
      value={value || ""}
      onChange={e => onChange(e.target.value || undefined)}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    >
      {options.map(({ value, label }) => (
        <option key={value || "ZZ"} value={value || ""}>
          {label} {value && `+${getCountryCallingCode(value)}`}
        </option>
      ))}
    </select>
  </div>
);

const inputClass =
  "w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm";

const REGISTRATION_OPEN = true; // ← flip to false to show "not yet open" message

export default function Registration() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", affiliation: "", status: "Researcher", category: "local",
  });
  const [checked, setChecked] = useState({
    day1: false, day2: false, accommodation: false, nvidia: false, gala: false,
  });
  const [dietary, setDietary] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const feeRows = getFeeRows(t);
  const isLocal    = form.category === "local";
  const currency   = isLocal ? "DT" : "€";
  const total      = feeRows.reduce((sum, row) => sum + (checked[row.key] ? (isLocal ? row.local : row.intl) : 0), 0);
  const toggleRow  = key => setChecked(p => ({ ...p, [key]: !p[key] }));
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...checked, dietary, total: `${total} ${currency}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("registration.errorFallback"));
      setSubmitStatus("success");
    } catch (err) {
      setSubmitStatus("error");
      setErrorMsg(err.message);
    }
  };

  // ── NOT YET OPEN ───────────────────────────────────────────────
  if (!REGISTRATION_OPEN) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tuncis-bg min-h-screen pb-20"
      >
        <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">{t("registration.title")}</h1>
            <p className="text-white/70 text-lg">{t("registration.subtitle")}</p>
          </div>
        </section>
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-14">
            <div className="w-20 h-20 rounded-full bg-tuncis-yellow/10 flex items-center justify-center mx-auto mb-6 text-4xl">⏳</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue mb-4">Registration Not Yet Open</h2>
            <p className="text-tuncis-gray text-lg leading-relaxed mb-10">
              Registration opens once abstract acceptances are confirmed — check back after <strong>September 30, 2026</strong>.
            </p>
            <div className="text-left">
              <p className="text-xs uppercase font-bold tracking-wider text-tuncis-blue mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-tuncis-yellow inline-block" /> Indicative Fees
              </p>
              <div className="rounded-xl border border-gray-100 overflow-x-auto">
                <table className="w-full text-sm min-w-[340px]">
                  <thead className="bg-tuncis-blue text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Item</th>
                      <th className="text-right px-4 py-3 font-semibold">Local (DT)</th>
                      <th className="text-right px-4 py-3 font-semibold">Intl (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {feeRows.map((row, i) => (
                      <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 text-gray-700">
                          {row.label}
                          {row.note && <span className="block text-xs text-amber-600 mt-0.5">⚠ {row.note}</span>}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-tuncis-blue">
                          {row.local === 170 && row.key === "accommodation" ? "~170" : row.local}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-tuncis-blue">
                          {row.key === "accommodation" ? "~70" : row.intl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic mt-3">* Accommodation rate to be confirmed.</p>
            </div>
          </div>
        </section>
      </motion.main>
    );
  }

  // ── SUCCESS ────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-tuncis-bg min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-tuncis-blue/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-tuncis-blue" />
          </div>
          <h1 className="font-heading text-3xl text-tuncis-blue mb-3 font-bold">{t("registration.confirmedTitle")}</h1>
          <p className="text-tuncis-gray">{t("registration.confirmedMessage")}</p>
        </div>
      </motion.main>
    );
  }

  // ── FORM ───────────────────────────────────────────────────────
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* Hero */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">{t("registration.title")}</h1>
          <p className="text-white/70 text-lg">{t("registration.subtitle")}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ─ 1. Personal Info ─ */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-tuncis-blue/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-tuncis-blue flex items-center justify-center text-white text-xs font-bold shrink-0">1</div>
              <h2 className="font-heading font-bold text-tuncis-blue text-lg">{t("registration.personalInfo")}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.fullName")} *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} required type="text" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.email")} *</label>
                <input name="email" value={form.email} onChange={handleChange} required type="email" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.phone")} *</label>
                <PhoneInput defaultCountry="TN" value={form.phone} onChange={v => setForm({ ...form, phone: v || "" })} className="tuncis-phone-layout" countrySelectComponent={CustomCountrySelect} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.affiliation")} *</label>
                <input name="affiliation" value={form.affiliation} onChange={handleChange} required type="text" placeholder={t("registration.affiliationPlaceholder")} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.status")} *</label>
                <select name="status" value={form.status} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="Researcher">{t("registration.statusOptions.researcher")}</option>
                  <option value="Engineer">{t("registration.statusOptions.engineer")}</option>
                  <option value="PhD Student">{t("registration.statusOptions.phd")}</option>
                  <option value="Other">{t("registration.statusOptions.other")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.category")} *</label>
                <select name="category" value={form.category} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="local">{t("registration.categoryOptions.local")}</option>
                  <option value="intl">{t("registration.categoryOptions.intl")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* ─ 2. Participation — interactive fee TABLE ─ */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-tuncis-blue/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-tuncis-blue flex items-center justify-center text-white text-xs font-bold shrink-0">2</div>
              <h2 className="font-heading font-bold text-tuncis-blue text-lg">{t("registration.participation")}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead>
                  <tr className="bg-tuncis-blue text-white">
                    <th className="w-12 px-4 py-3 text-center">✓</th>
                    <th className="text-left px-4 py-3 font-semibold">Item</th>
                    <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Local (DT)</th>
                    <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Intl (€)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feeRows.map((row, i) => {
                    const isChecked = checked[row.key];
                    return (
                      <tr
                        key={row.key}
                        onClick={() => toggleRow(row.key)}
                        className={`cursor-pointer transition-colors select-none ${
                          isChecked
                            ? "bg-tuncis-yellow/10 border-l-4 border-l-tuncis-yellow"
                            : i % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/60 hover:bg-gray-100"
                        }`}
                      >
                        {/* Checkbox cell */}
                        <td className="px-4 py-4 text-center">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mx-auto transition-all ${
                            isChecked ? "bg-tuncis-blue border-tuncis-blue" : "border-gray-300 bg-white"
                          }`}>
                            {isChecked && <Check size={11} className="text-white" strokeWidth={3} />}
                          </div>
                        </td>
                        {/* Label cell */}
                        <td className="px-4 py-4">
                          <p className={`font-medium ${isChecked ? "text-tuncis-blue" : "text-gray-700"}`}>{row.label}</p>
                          {row.note && <p className="text-xs text-amber-600 mt-0.5">⚠ {row.note}</p>}
                        </td>
                        {/* Local price */}
                        <td className={`px-4 py-4 text-right font-bold tabular-nums ${isChecked && isLocal ? "text-tuncis-blue text-base" : "text-gray-500"}`}>
                          {row.key === "accommodation" ? "~170" : row.local} DT
                        </td>
                        {/* Intl price */}
                        <td className={`px-4 py-4 text-right font-bold tabular-nums ${isChecked && !isLocal ? "text-tuncis-blue text-base" : "text-gray-500"}`}>
                          {row.key === "accommodation" ? "~70" : row.intl} €
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Running total row */}
                <tfoot>
                  <tr className="bg-tuncis-blue/5 border-t-2 border-tuncis-blue/20">
                    <td colSpan={2} className="px-4 py-4">
                      <span className="font-bold text-tuncis-blue">{t("registration.totalDue")}</span>
                    </td>
                    <td colSpan={2} className="px-4 py-4 text-right">
                      <span className="font-black text-2xl text-tuncis-blue font-heading">
                        {total} {currency}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="px-6 py-3 text-xs text-gray-400 italic border-t border-gray-100">
              * Accommodation rate to be confirmed. Click any row to select / deselect.
            </p>
          </div>

          {/* ─ 3. Additional Info ─ */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-tuncis-blue/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-tuncis-blue flex items-center justify-center text-white text-xs font-bold shrink-0">3</div>
              <h2 className="font-heading font-bold text-tuncis-blue text-lg">{t("registration.additionalInfo")}</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-bold text-tuncis-blue mb-1.5">{t("registration.dietary")}</label>
              <textarea value={dietary} onChange={e => setDietary(e.target.value)} rows="3" placeholder={t("registration.dietaryPlaceholder")} className={`${inputClass} resize-none`} />
            </div>
          </div>

          {submitStatus === "error" && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={submitStatus === "submitting"}
            className="w-full flex items-center justify-center gap-2 bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all shadow-lg text-base disabled:opacity-50"
          >
            <Check size={20} />
            {submitStatus === "submitting" ? t("registration.submitting") : t("registration.submit")}
          </button>
        </form>
      </section>
    </motion.main>
  );
}
