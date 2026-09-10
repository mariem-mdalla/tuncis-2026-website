import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Lightbulb, Users, Award, CheckCircle2, Clock, FileText, Rocket, Mail, X, UploadCloud, Loader2 } from "lucide-react";

// TODO: Backend developers need to wire this form to an email sending API
// const SUBMISSION_API_ENDPOINT = "/api/submit-abstract";

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

function SectionCard({ icon: Icon, title, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
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

function SubmissionModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("file", file);

      const res = await fetch("/api/abstracts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit abstract. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Network error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-tuncis-blue-dark/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
            <X size={20} />
          </button>

          <div className="p-8">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-tuncis-blue mb-2">{t("cfc.modal.successTitle")}</h3>
                <p className="text-gray-600 mb-8">{t("cfc.modal.successMessage")}</p>
                <button onClick={onClose} className="bg-tuncis-blue text-white font-bold px-8 py-3 rounded-xl hover:bg-tuncis-blue-dark transition-colors">
                  {t("cfc.modal.close")}
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-2xl font-bold text-tuncis-blue mb-2">{t("cfc.modal.title")}</h3>
                <p className="text-gray-500 text-sm mb-6">{t("cfc.modal.subtitle")}</p>

                {status === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-tuncis-blue mb-1">{t("cfc.modal.fullName")} *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tuncis-yellow transition-all text-sm"
                      placeholder={t("cfc.modal.fullNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-tuncis-blue mb-1">{t("cfc.modal.email")} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tuncis-yellow transition-all text-sm"
                      placeholder={t("cfc.modal.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-tuncis-blue mb-1">{t("cfc.modal.file")} *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer relative">
                      <input type="file" accept=".pdf" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <UploadCloud size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 font-medium">{file ? file.name : t("cfc.modal.fileUpload")}</p>
                      {!file && <p className="text-xs text-gray-400 mt-1">{t("cfc.modal.fileHint")}</p>}
                    </div>
                  </div>
                  <div className="pt-2">
                    <button type="submit" disabled={status === "submitting"} className="w-full bg-tuncis-yellow text-tuncis-blue font-bold text-lg px-6 py-4 rounded-xl shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                      {status === "submitting" ? (
                        <><Loader2 size={20} className="animate-spin" /> {t("cfc.modal.sending")}</>
                      ) : (
                        t("cfc.modal.submit")
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function CallForCommunications() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const objectives   = t("cfc.objectives",    { returnObjects: true });
  const topics       = t("cfc.topics",        { returnObjects: true });
  const evaluation   = t("cfc.evaluation",    { returnObjects: true });
  const pitchContent = t("cfc.pitchContent",  { returnObjects: true });
  const who          = t("cfc.who",           { returnObjects: true });
  const benefits     = t("cfc.benefits",      { returnObjects: true });
  const submission   = t("cfc.submission",    { returnObjects: true });

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
            {t("cfc.badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 font-bold"
          >
            {t("cfc.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl"
          >
            {t("cfc.intro")}
          </motion.p>
        </div>
      </section>

      {/* ── Animated gradient divider ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="h-1 bg-gradient-to-r from-tuncis-yellow via-tuncis-blue/60 to-transparent"
      />

      {/* ── Content ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-tuncis-gray leading-relaxed text-lg"
        >
          {t("cfc.context")}
        </motion.p>

        {/* Row 1 — Objectives + Who Can Apply */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionCard icon={Target} title={t("cfc.objectivesTitle")}>
            <CheckList items={objectives} />
          </SectionCard>

          <SectionCard icon={Users} title={t("cfc.whoTitle")}>
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
        <SectionCard icon={Lightbulb} title={t("cfc.topicsTitle")}>
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
          <SectionCard icon={Award} title={t("cfc.evaluationTitle")}>
            <CheckList items={evaluation} />
          </SectionCard>

          <SectionCard icon={Rocket} title={t("cfc.benefitsTitle")}>
            <CheckList items={benefits} />
          </SectionCard>
        </div>

        {/* Pitch Format — visual timer cards */}
        <SectionCard icon={Clock} title={t("cfc.pitchTitle")}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-tuncis-blue rounded-2xl p-6 flex items-center gap-5">
              <span className="font-heading text-6xl font-bold text-tuncis-yellow leading-none">05</span>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-wider">min</p>
                <p className="text-white/70 text-sm mt-1">{t("cfc.pitchPresentation")}</p>
              </div>
            </div>
            <div className="flex-1 bg-tuncis-bg border border-tuncis-blue/20 rounded-2xl p-6 flex items-center gap-5">
              <span className="font-heading text-6xl font-bold text-tuncis-blue leading-none">05</span>
              <div>
                <p className="text-tuncis-blue font-bold text-sm uppercase tracking-wider">min</p>
                <p className="text-tuncis-gray text-sm mt-1">{t("cfc.pitchDiscussion")}</p>
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-tuncis-blue mb-3">{t("cfc.pitchAddressTitle")}</p>
          <CheckList items={pitchContent} />
        </SectionCard>

        {/* Submission Requirements + CTA */}
        <SectionCard icon={FileText} title={t("cfc.submissionTitle")}>
          <p className="text-white/80 text-sm mb-1 text-tuncis-gray">{t("cfc.submissionIntro")}</p>
          <ul className="space-y-3 mt-4 mb-6">
            {submission.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-tuncis-gray text-sm">
                <CheckCircle2 size={16} className="text-tuncis-yellow shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-4 mt-2 text-xs text-tuncis-gray italic">
            {t("cfc.panelNote")}
          </div>
        </SectionCard>

        {/* Dark CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="bg-tuncis-blue rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-tuncis-yellow/20 blur-3xl rounded-full pointer-events-none" />
          <div className="p-8 sm:p-12 relative z-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-tuncis-yellow mx-auto mb-6">
              <Mail size={32} />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-white font-bold mb-4">
              {t("cfc.ctaTitle")}
            </h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
              {t("cfc.ctaBody")} <strong className="text-white">{t("cfc.ctaDeadline")}</strong>.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 bg-tuncis-yellow text-tuncis-blue font-bold text-lg px-10 py-5 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(251,213,58,0.3)] hover:-translate-y-1"
            >
              <Mail size={24} />
              {t("cfc.submitCta")}
            </button>
            <p className="text-white/50 text-sm mt-4">{t("cfc.ctaFileHint")}</p>
          </div>
        </motion.div>

      </section>
    </motion.main>
  );
}
