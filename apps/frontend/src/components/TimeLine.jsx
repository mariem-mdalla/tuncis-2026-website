import { useTranslation } from "react-i18next";
import { FileText, Bell, UserCheck, LayoutList, Calendar } from "lucide-react";

const milestoneConfig = [
  { icon: FileText,   statusKey: "extended", dateKey: "dates.submission",           labelKey: "milestones.submission" },
  { icon: Bell,       statusKey: "upcoming", dateKey: "dates.acceptance",            labelKey: "milestones.acceptance" },
  { icon: UserCheck,  statusKey: "upcoming", dateKey: "dates.registrationDeadline",  labelKey: "milestones.registrationDeadline" },
  { icon: LayoutList, statusKey: "upcoming", dateKey: "dates.programmePublished",    labelKey: "milestones.programmePublished" },
  { icon: Calendar,   statusKey: "event",    dateKey: "dates.event",                 labelKey: "milestones.event" },
];

const statusStyles = {
  extended: { bg: "bg-orange-50",  border: "border-orange-200",  text: "text-orange-700", badge: "bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse", label: "EXTENDED" },
  upcoming: { bg: "bg-blue-50",    border: "border-blue-100",    text: "text-blue-700",   badge: "bg-gray-500 text-white", label: "UPCOMING" },
  event:    { bg: "bg-yellow-50",  border: "border-yellow-100",  text: "text-yellow-700", badge: "bg-tuncis-yellow text-tuncis-blue", label: "EVENT" },
};

export default function KeyDates() {
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-heading font-bold text-xl text-tuncis-blue">{t("home.keyDates")}</h3>
        <Calendar size={20} className="text-tuncis-blue opacity-50" />
      </div>

      {/* List */}
      <div className="p-5 space-y-4">
        {milestoneConfig.map((m, i) => {
          const Icon = m.icon;
          const style = statusStyles[m.statusKey];
          return (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${style.bg} ${style.border}`}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-gray-100">
                <Icon size={18} className={style.text} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-bold text-tuncis-blue">
                    {t(m.labelKey)}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
                <p className={`font-bold text-lg ${style.text}`}>
                  {t(m.dateKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
