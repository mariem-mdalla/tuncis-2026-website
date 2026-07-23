const milestones = [
  { date: "Sep 15, 2026", label: "Submission Deadline" },
  { date: "Sep 30, 2026", label: "Acceptance Notification" },
  { date: "Oct 7, 2026", label: "Registration Deadline" },
  { date: "Oct 10, 2026", label: "Final Programme Published" },
  { date: "Oct 23–24, 2026", label: "TUNCIS 2026" },
];

export default function Timeline() {
  return (
    <section className="bg-tuncis-bg py-14">
      <div className="max-w-6xl mx-auto px-6">
        <p className="uppercase tracking-wider text-xs text-tuncis-blue font-bold mb-8">
          Key Dates
        </p>
        <div className="relative">
          <div className="hidden md:block absolute top-2 left-0 right-0 h-px bg-tuncis-blue/20" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-6 md:pl-0">
                <div className="md:mb-4 w-3 h-3 rounded-full bg-tuncis-yellow border-2 border-tuncis-blue absolute md:static left-0 top-1" />
                <p className="font-heading text-tuncis-blue text-lg">{m.date}</p>
                <p className="text-sm text-tuncis-gray mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}