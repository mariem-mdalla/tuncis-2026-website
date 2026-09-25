import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  MapPin,
  Coffee,
  Utensils,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Info,
  Rocket
} from "lucide-react";

import novationLogo from "../assets/logos/Novation_logo.png";

// ─── Schedule Definitions ─────────────────────────────────────────────────────

const DAY1_SCHEDULE = [
  {
    id: "d1-opening",
    type: "ceremony",
    time: "09h00 – 10h00",
    roomKey: "programme.plenaryRoom",
    badgeText: "Cérémonie",
    titleKey: "programme.sessions.d1_opening_title",
    speakersKey: "programme.sessions.d1_opening_speakers",
  },
  {
    id: "d1-keynote1",
    type: "keynote",
    time: "10h00 – 10h45",
    roomKey: "programme.plenaryRoom",
    badgeText: "Keynote 1",
    titleKey: "programme.sessions.d1_keynote1_title",
    speakerKey: "programme.sessions.d1_keynote1_speaker",
    roleKey: "programme.sessions.d1_keynote1_role",
    topicKey: "programme.sessions.d1_keynote1_topic",
  },
  {
    id: "d1-coffee1",
    type: "break",
    time: "10h45 – 11h00",
    duration: "15 min",
    titleKey: "programme.sessions.d1_coffee1_title",
    icon: Coffee,
  },
  {
    id: "d1-keynote2",
    type: "keynote",
    time: "11h00 – 11h45",
    roomKey: "programme.plenaryRoom",
    badgeText: "Keynote 2",
    titleKey: "programme.sessions.d1_keynote2_title",
    speakerKey: "programme.sessions.d1_keynote2_speaker",
    roleKey: "programme.sessions.d1_keynote2_role",
    topicKey: "programme.sessions.d1_keynote2_topic",
  },
  {
    id: "d1-session1",
    type: "parallel",
    time: "11h45 – 13h00",
    parallelTitleKey: "programme.parallelBadge",
    trackA: {
      room: "A",
      roomLabelKey: "programme.roomA",
      tag: "Atelier 1",
      titleKey: "programme.sessions.d1_w1_title",
      speakersKey: "programme.sessions.d1_w1_speakers",
    },
    trackB: {
      room: "B",
      roomLabelKey: "programme.roomB",
      tag: "Atelier 2",
      titleKey: "programme.sessions.d1_w2_title",
      speakersKey: "programme.sessions.d1_w2_speakers",
    },
  },
  {
    id: "d1-lunch",
    type: "break",
    time: "13h00 – 14h30",
    duration: "1h30",
    titleKey: "programme.sessions.d1_lunch_title",
    descKey: "programme.sessions.d1_lunch_desc",
    icon: Utensils,
  },
  {
    id: "d1-session2",
    type: "parallel",
    time: "14h30 – 15h45",
    parallelTitleKey: "programme.parallelBadge",
    isRotation: true,
    rotationNoteKey: "programme.rotationNote",
    trackA: {
      room: "A",
      roomLabelKey: "programme.roomA",
      tag: "Atelier 1 (Rotation)",
      titleKey: "programme.sessions.d1_w1_rot_title",
      speakersKey: "programme.sessions.d1_w1_speakers",
    },
    trackB: {
      room: "B",
      roomLabelKey: "programme.roomB",
      tag: "Atelier 2 (Rotation)",
      titleKey: "programme.sessions.d1_w2_rot_title",
      speakersKey: "programme.sessions.d1_w2_speakers",
    },
  },
  {
    id: "d1-coffee2",
    type: "break",
    time: "15h45 – 16h00",
    duration: "15 min",
    titleKey: "programme.sessions.d1_coffee2_title",
    icon: Coffee,
  },
  {
    id: "d1-session3",
    type: "parallel",
    time: "16h00 – 17h30",
    parallelTitleKey: "programme.parallelBadge",
    trackA: {
      room: "A",
      roomLabelKey: "programme.roomA",
      tag: "Atelier 3",
      titleKey: "programme.sessions.d1_w3_title",
      speakersKey: "programme.sessions.d1_w3_speakers",
    },
    trackB: {
      room: "B",
      roomLabelKey: "programme.roomB",
      tag: "Atelier 4",
      titleKey: "programme.sessions.d1_w4_title",
      speakersKey: "programme.sessions.d1_w4_speakers",
    },
  },
  {
    id: "d1-closing",
    type: "ceremony",
    time: "17h30 – 18h00",
    roomKey: "programme.plenaryRoom",
    badgeText: "Synthèse",
    titleKey: "programme.sessions.d1_closing_title",
    descKey: "programme.sessions.d1_closing_desc",
  },
];

const DAY2_SCHEDULE = [
  {
    id: "d2-opening",
    type: "ceremony",
    time: "09h00 – 09h15",
    roomKey: "programme.plenaryRoom",
    badgeText: "Accueil",
    titleKey: "programme.sessions.d2_opening_title",
    speakersKey: "programme.sessions.d2_opening_speakers",
  },
  {
    id: "d2-keynote",
    type: "keynote",
    time: "09h15 – 10h00",
    roomKey: "programme.plenaryRoom",
    badgeText: "Keynote",
    titleKey: "programme.sessions.d2_keynote_title",
    speakerKey: "programme.sessions.d2_keynote_speaker",
    roleKey: "programme.sessions.d2_keynote_role",
    topicKey: "programme.sessions.d2_keynote_topic",
    tbc: true,
  },
  {
    id: "d2-coffee",
    type: "break",
    time: "10h00 – 10h15",
    duration: "15 min",
    titleKey: "programme.sessions.d2_coffee_title",
    icon: Coffee,
  },
  {
    id: "d2-tracks",
    type: "parallel",
    time: "10h15 – 12h15",
    parallelTitleKey: "programme.parallelBadge",
    trackA: {
      room: "A",
      roomLabelKey: "programme.roomA",
      tag: "Session de Pitchs",
      badgeText: "Compétition",
      titleKey: "programme.sessions.d2_pitch_title",
      descKey: "programme.sessions.d2_pitch_desc",
      prizeKey: "programme.sessions.d2_pitch_prize",
      link: "/best-project-award",
      linkTextKey: "programme.viewPitchCall",
    },
    trackB: {
      room: "B",
      roomLabelKey: "programme.roomB",
      tag: "Formation Certifiante",
      badgeText: "NVIDIA DLI",
      badgeColor: "emerald",
      titleKey: "programme.sessions.d2_nvidia_title",
      descKey: "programme.sessions.d2_nvidia_desc",
      reqKey: "programme.sessions.d2_nvidia_req",
      link: "/nvidia-certification",
      linkTextKey: "programme.viewNvidiaTrack",
    },
    trackC: {
      room: "C",
      roomLabelKey: "programme.roomC",
      tag: "Formation",
      badgeText: "Axe Employabilité",
      titleKey: "programme.sessions.d2_genai_title",
      descKey: "programme.sessions.d2_genai_desc",
    },
  },
  {
    id: "d2-delib",
    type: "ceremony",
    time: "12h15 – 12h40",
    roomKey: "programme.plenaryRoom",
    badgeText: "Délibération & Réseautage",
    titleKey: "programme.sessions.d2_delib_title",
    descKey: "programme.sessions.d2_delib_desc",
  },
  {
    id: "d2-closing",
    type: "ceremony",
    time: "12h40 – 13h00",
    roomKey: "programme.plenaryRoom",
    badgeText: "Remise des Prix & Clôture",
    titleKey: "programme.sessions.d2_closing_title",
    descKey: "programme.sessions.d2_closing_desc",
  },
  {
    id: "d2-lunch",
    type: "break",
    time: "13h00",
    duration: "Clôture",
    titleKey: "programme.sessions.d2_lunch_title",
    descKey: "programme.sessions.d2_lunch_desc",
    icon: Utensils,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Programme() {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState("day1");
  const [selectedRoom, setSelectedRoom] = useState("all"); // "all" | "A" | "B"

  const schedule = activeDay === "day1" ? DAY1_SCHEDULE : DAY2_SCHEDULE;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-tuncis-bg min-h-screen pb-24"
    >
      {/* ── HERO ── */}
      <section className="bg-tuncis-blue text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-tuncis-blue-dark via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-tuncis-yellow border border-white/15 mb-3">
            <Calendar size={13} />
            <span>{t("programme.badge")}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
            {t("programme.title")}
          </h1>

          <p className="text-white/80 text-sm sm:text-base flex items-center justify-center gap-1.5 font-medium">
            <MapPin size={15} className="text-tuncis-yellow shrink-0" />
            <span>{t("programme.subtitle")}</span>
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        {/* ── DAY SELECTOR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-gray-200/90 shadow-sm mb-6">
          {/* Day 1 / Day 2 Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveDay("day1")}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeDay === "day1"
                  ? "bg-tuncis-blue text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {t("programme.tabs.day1")}
            </button>
            <button
              onClick={() => setActiveDay("day2")}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeDay === "day2"
                  ? "bg-tuncis-blue text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {t("programme.tabs.day2")}
            </button>
          </div>

          {/* Room Filter */}
          <div className="flex items-center gap-1 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 mr-1 hidden md:inline">
              Filtre :
            </span>
            <button
              onClick={() => setSelectedRoom("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoom === "all"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("programme.allRooms")}
            </button>
            <button
              onClick={() => setSelectedRoom("A")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoom === "A"
                  ? "bg-tuncis-blue text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("programme.roomA")}
            </button>
            <button
              onClick={() => setSelectedRoom("B")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoom === "B"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("programme.roomB")}
            </button>
            <button
              onClick={() => setSelectedRoom("C")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoom === "C"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t("programme.roomC")}
            </button>
          </div>
        </div>

        {/* ── TIMELINE CARD (Clean White Document) ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-8 divide-y divide-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${selectedRoom}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-gray-100"
            >
              {schedule.map((item) => (
                <TimelineRow
                  key={item.id}
                  item={item}
                  selectedRoom={selectedRoom}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-tuncis-gray/70 italic mt-8">
          {t("programme.note")}
        </p>
      </section>
    </motion.main>
  );
}

// ─── Row Renderer ─────────────────────────────────────────────────────────────

function TimelineRow({ item, selectedRoom }) {
  const { t } = useTranslation();

  // 1. Break / Lunch row (Minimal, unobtrusive)
  if (item.type === "break") {
    const Icon = item.icon || Coffee;
    return (
      <div className="py-3 px-3 my-2 rounded-xl bg-gray-50/80 border border-dashed border-gray-200 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2.5">
          <Icon size={14} className="text-gray-400 shrink-0" />
          <span className="font-bold text-gray-800">{item.time}</span>
          <span className="text-gray-300">·</span>
          <span className="font-medium text-gray-700">{t(item.titleKey)}</span>
        </div>
        {item.duration && (
          <span className="text-[11px] text-gray-400 font-medium">
            {item.duration}
          </span>
        )}
      </div>
    );
  }

  // 2. Parallel Session row
  if (item.type === "parallel") {
    const showTrackA = !!item.trackA && (selectedRoom === "all" || selectedRoom === "A");
    const showTrackB = !!item.trackB && (selectedRoom === "all" || selectedRoom === "B");
    const showTrackC = !!item.trackC && (selectedRoom === "all" || selectedRoom === "C");
    const visibleCount = [showTrackA, showTrackB, showTrackC].filter(Boolean).length;
    const gridColsCls =
      visibleCount >= 3
        ? "grid-cols-1 lg:grid-cols-3"
        : visibleCount === 2
        ? "grid-cols-1 lg:grid-cols-2"
        : "grid-cols-1";

    return (
      <div className="py-6 first:pt-2 last:pb-2">
        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
          {/* Time & Track label */}
          <div className="md:w-36 shrink-0">
            <span className="font-heading font-bold text-tuncis-blue text-sm sm:text-base block">
              {item.time}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mt-0.5">
              {t("programme.parallelBadge")}
            </span>
            {item.isRotation && (
              <span className="inline-block text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/70 rounded px-1.5 py-0.5 mt-1">
                {t("programme.rotationBadge")}
              </span>
            )}
          </div>

          {/* Parallel Columns */}
          <div className={`flex-1 grid gap-6 ${gridColsCls}`}>
            {/* Track A */}
            {showTrackA && (
              <TrackColumn
                track={item.trackA}
                accentColor="blue"
                roomLabel={t(item.trackA.roomLabelKey)}
              />
            )}

            {/* Track B */}
            {showTrackB && (
              <TrackColumn
                track={item.trackB}
                accentColor={item.trackB.badgeColor === "emerald" ? "emerald" : "indigo"}
                roomLabel={t(item.trackB.roomLabelKey)}
              />
            )}

            {/* Track C */}
            {showTrackC && (
              <TrackColumn
                track={item.trackC}
                accentColor="purple"
                roomLabel={t(item.trackC.roomLabelKey)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Plenary row (Keynote, Opening Ceremony, Restitution, Closing)
  const isKeynote = item.type === "keynote";
  const speakers = item.speakersKey
    ? t(item.speakersKey, { returnObjects: true })
    : [];

  return (
    <div className="py-6 first:pt-2 last:pb-2">
      <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
        {/* Time & Room */}
        <div className="md:w-36 shrink-0">
          <span className="font-heading font-bold text-tuncis-blue text-sm sm:text-base block">
            {item.time}
          </span>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mt-0.5">
            {t(item.roomKey)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          {item.badgeText && (
            <span
              className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                isKeynote ? "text-amber-700" : "text-tuncis-blue"
              }`}
            >
              {item.badgeText}
            </span>
          )}

          {/* Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
            {t(item.titleKey)}
          </h3>

          {/* Keynote Speaker */}
          {item.speakerKey && (
            <div className="mt-2 text-sm">
              <p className="text-gray-800">
                <strong className="text-tuncis-blue font-bold">
                  {t(item.speakerKey)}
                </strong>
                {item.roleKey && (
                  <span className="text-gray-600"> – {t(item.roleKey)}</span>
                )}
                {item.tbc && (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    {t("programme.tbc")}
                  </span>
                )}
              </p>
              {item.topicKey && (
                <p className="text-xs text-gray-500 italic mt-1">
                  Thème : {t(item.topicKey)}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {item.descKey && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t(item.descKey)}
            </p>
          )}

          {/* Ceremony Dignitaries list */}
          {Array.isArray(speakers) && speakers.length > 0 && (
            <ul className="mt-2.5 space-y-1 text-xs text-gray-700">
              {speakers.map((spk, idx) => (
                <li key={idx} className="flex items-baseline gap-2">
                  <span className="text-tuncis-blue font-bold">•</span>
                  <span>
                    <strong className="text-gray-900 font-semibold">
                      {spk.name}
                    </strong>{" "}
                    <span className="text-gray-500">({spk.role})</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Track Column for Parallel Workshops ─────────────────────────────────────

function TrackColumn({ track, accentColor, roomLabel }) {
  const { t } = useTranslation();
  const speakers = track.speakersKey
    ? t(track.speakersKey, { returnObjects: true })
    : [];

  const isEmerald = accentColor === "emerald";
  const ACCENT_BORDER = {
    blue: "border-tuncis-blue",
    indigo: "border-indigo-500",
    emerald: "border-emerald-500",
    purple: "border-purple-500",
  };
  const ACCENT_TEXT = {
    blue: "text-tuncis-blue",
    indigo: "text-indigo-600",
    emerald: "text-emerald-700",
    purple: "text-purple-700",
  };
  const ACCENT_BADGE = {
    blue: "bg-amber-100 text-amber-800",
    indigo: "bg-amber-100 text-amber-800",
    emerald: "bg-emerald-100 text-emerald-800",
    purple: "bg-purple-100 text-purple-800",
  };
  const borderCls = ACCENT_BORDER[accentColor] || ACCENT_BORDER.indigo;
  const roomTextCls = ACCENT_TEXT[accentColor] || ACCENT_TEXT.indigo;
  const badgeCls = ACCENT_BADGE[accentColor] || ACCENT_BADGE.indigo;

  return (
    <div className={`border-l-3 ${borderCls} pl-4 py-1 flex flex-col justify-between`}>
      <div>
        {/* Room & Tag */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-xs font-bold uppercase tracking-wider ${roomTextCls}`}>
            {roomLabel} · {track.tag}
          </span>
          {track.badgeText && (
            <>
              {" "}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${badgeCls}`}
              >
                {track.badgeText}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h4 className="font-heading font-bold text-sm sm:text-base text-gray-900 mb-1.5 leading-snug">
          {t(track.titleKey)}
        </h4>

        {/* Description / Requirement */}
        {track.descKey && (
          <p className="text-xs text-gray-600 mb-2 leading-relaxed">
            {t(track.descKey)}
          </p>
        )}

        {track.reqKey && (
          <p className="text-xs font-medium text-emerald-800 mb-2">
            {t(track.reqKey)}
          </p>
        )}

        {track.juryKey && (
          <p className="text-xs font-medium text-amber-800 mb-2">
            {t(track.juryKey)}
          </p>
        )}

        {track.prizeKey && (
          <div className="mt-2 mb-3 bg-gradient-to-br from-tuncis-yellow/25 to-tuncis-yellow/5 border-2 border-tuncis-yellow rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-tuncis-yellow/30 flex items-center justify-center shrink-0">
                <Rocket size={22} className="text-tuncis-blue" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-white/70 px-2.5 py-1 rounded-full">
                {t("programme.prizeLabel")}
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-tuncis-blue leading-snug mb-3">
              {t(track.prizeKey)}
            </p>
            <img
              src={novationLogo}
              alt="Novation City"
              style={{ maxHeight: "100px", maxWidth: "100px", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        )}

        {/* Speakers List */}
        {Array.isArray(speakers) && speakers.length > 0 && (
          <ul className="space-y-1 text-xs text-gray-700 mt-2">
            {speakers.map((spk, idx) => (
              <li key={idx} className="flex items-baseline gap-2">
                <span className="text-gray-400">•</span>
                <span>
                  <strong className="text-gray-900 font-semibold">{spk.name}</strong>{" "}
                  <span className="text-gray-500">({spk.role})</span>
                  {spk.tbc && (
                    <span className="ml-1.5 text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-800">
                      {t("programme.tbc")}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link button if present */}
      {track.link && (
        <div className="mt-3 pt-2">
          <Link
            to={track.link}
            className={`inline-flex items-center gap-1 text-xs font-bold underline underline-offset-2 transition-colors ${
              isEmerald
                ? "text-emerald-700 hover:text-emerald-900"
                : "text-tuncis-blue hover:text-tuncis-blue-dark"
            }`}
          >
            <span>{t(track.linkTextKey)}</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}
