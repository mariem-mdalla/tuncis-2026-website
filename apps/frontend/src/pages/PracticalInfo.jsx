import { motion } from "framer-motion";
import { MapPin, Plane, BedDouble, Mail, ExternalLink, Navigation, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Hotel+Marhaba+Palace+Port+El+Kantaoui+Sousse+Tunisia";
  const mapEmbedUrl = "https://maps.google.com/maps?q=Hotel+Marhaba+Palace+Port+El+Kantaoui+Sousse&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      {/* Hero */}
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tuncis-yellow/15 via-transparent to-transparent opacity-60" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            {t("practicalInfo.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl"
          >
            {t("practicalInfo.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20 space-y-10">

        {/* ── 1. Interactive Venue & Map Box Showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Left: Venue details */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 bg-tuncis-blue/10 text-tuncis-blue rounded-xl flex items-center justify-center mb-5">
                  <MapPin size={24} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-tuncis-yellow bg-tuncis-blue px-3 py-1 rounded-full">
                  {t("practicalInfo.venue")}
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-tuncis-blue mt-3 mb-2">
                  {t("practicalInfo.venueName")}
                </h2>

                <p className="text-gray-700 font-semibold text-sm flex items-center gap-1.5 mb-4">
                  <Navigation size={14} className="text-tuncis-yellow shrink-0" />
                  {t("practicalInfo.venueCity")}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t("practicalInfo.venueDescription")}
                </p>

                {/* Airport distances badges */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-tuncis-blue flex items-center gap-2">
                    <Plane size={13} className="text-tuncis-yellow" />
                    {t("practicalInfo.airportTransfers")}
                  </p>
                  <div className="flex flex-col gap-2 text-xs text-gray-700">
                    <div className="bg-tuncis-bg border border-gray-200 px-3.5 py-2 rounded-xl flex items-center gap-2 font-medium">
                      <Clock size={13} className="text-tuncis-blue shrink-0" />
                      <span>{t("practicalInfo.monastirAirport")}</span>
                    </div>
                    <div className="bg-tuncis-bg border border-gray-200 px-3.5 py-2 rounded-xl flex items-center gap-2 font-medium">
                      <Clock size={13} className="text-tuncis-blue shrink-0" />
                      <span>{t("practicalInfo.enfidhaAirport")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action: Open in Google Maps */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-tuncis-blue text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-tuncis-blue-dark transition-all shadow-sm"
                >
                  <span>{t("practicalInfo.viewMap")}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Right: Embedded Interactive Map */}
            <div className="lg:col-span-7 bg-gray-100 min-h-[340px] sm:min-h-[420px] relative">
              <iframe
                title="TUNCIS 2026 Venue - Hotel Marhaba Palace Kantaoui Sousse"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              />
            </div>

          </div>
        </motion.div>

        {/* ── 2. Information Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Getting There */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-tuncis-yellow/15 rounded-xl flex items-center justify-center text-tuncis-blue mb-5">
                <Plane size={24} />
              </div>
              <h3 className="font-heading text-lg font-bold text-tuncis-blue mb-2.5">
                {t("practicalInfo.gettingThere")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("practicalInfo.gettingThereText")}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Accommodation */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-tuncis-yellow/15 rounded-xl flex items-center justify-center text-tuncis-blue mb-5">
                <BedDouble size={24} />
              </div>
              <h3 className="font-heading text-lg font-bold text-tuncis-blue mb-2.5">
                {t("practicalInfo.accommodation")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("practicalInfo.accommodationPending")}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Contact */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-tuncis-yellow/15 rounded-xl flex items-center justify-center text-tuncis-blue mb-5">
                <Mail size={24} />
              </div>
              <h3 className="font-heading text-lg font-bold text-tuncis-blue mb-2.5">
                {t("practicalInfo.contact")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {t("practicalInfo.inquiries")}
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <a
                href="mailto:tuncis2026@horizon-tech.tn"
                className="text-tuncis-blue font-bold text-sm hover:text-tuncis-yellow transition-colors inline-block"
              >
                tuncis2026@horizon-tech.tn
              </a>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </motion.main>
  );
}
