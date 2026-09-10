import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, MapPin } from "lucide-react";

function CountdownUnit({ value, label }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <div className="bg-tuncis-blue rounded-xl w-full max-w-[64px] h-14 sm:max-w-[72px] sm:h-20 flex items-center justify-center shadow-md">
        <span className="font-heading text-2xl sm:text-3xl font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-tuncis-gray text-[10px] sm:text-xs uppercase tracking-wide font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useTranslation();
  const target = new Date("2026-10-23T08:00:00");

  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6 relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-tuncis-yellow/10 rounded-bl-full pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-xl text-tuncis-blue">
          {t("home.countdown.label")}
        </h3>
        <Clock size={20} className="text-blue-600" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 mb-6">
        <CountdownUnit value={time.days}    label={t("home.countdown.days")} />
        <CountdownUnit value={time.hours}   label={t("home.countdown.hours")} />
        <CountdownUnit value={time.minutes} label={t("home.countdown.minutes")} />
        <CountdownUnit value={time.seconds} label={t("home.countdown.seconds")} />
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-tuncis-gray">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-tuncis-blue shrink-0" />
          <span className="font-medium">{t("dates.event")}</span>
        </div>
        <span className="text-gray-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-tuncis-blue shrink-0" />
          <span className="font-medium">{t("home.infoLocationVal")}</span>
        </div>
      </div>
    </div>
  );
}
