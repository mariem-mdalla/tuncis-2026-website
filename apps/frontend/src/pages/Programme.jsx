import { motion } from 'framer-motion';

const day1 = [
  { time: "08:30 – 09:00", title: "Registration & Welcome Coffee" },
  { time: "09:00 – 10:00", title: "Opening Keynote" },
  { time: "10:00 – 12:00", title: "Collaborative Workshops" },
  { time: "12:00 – 13:30", title: "Lunch" },
  { time: "13:30 – 16:00", title: "Doctoral Consortium Sessions" },
  { time: "16:00 – 17:00", title: "NVIDIA AI Certification Track" },
];

const day2 = [
  { time: "09:00 – 10:30", title: "Keynote: Industrial Deployment of AI" },
  { time: "10:30 – 12:30", title: "Paper Presentations" },
  { time: "12:30 – 14:00", title: "Lunch" },
  { time: "14:00 – 16:00", title: "Panel: Research-Industry Collaboration" },
  { time: "20:00", title: "Gala Dinner" },
];

function DaySchedule({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8"
    >
      <h3 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-4 border-b border-gray-100">{title}</h3>
      <div className="border-l-2 border-tuncis-blue/20 pl-8 space-y-8 relative">
        {items.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-tuncis-bg border-4 border-tuncis-yellow group-hover:scale-125 transition-transform" />
            <p className="text-sm uppercase tracking-widest text-tuncis-yellow font-bold mb-1">{item.time}</p>
            <p className="text-tuncis-blue font-bold text-lg group-hover:text-tuncis-blue-dark transition-colors">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Programme() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-tuncis-blue-dark via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl mb-4 font-bold"
          >
            Programme
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg"
          >
            October 23–24, 2026 · Green Park Hotel, Sousse
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <DaySchedule title="Day 1 — October 23" items={day1} />
          <DaySchedule title="Day 2 — October 24" items={day2} />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-sm text-tuncis-gray/70 mt-12 italic"
        >
          Schedule subject to updates by the organizing committee.
        </motion.p>
      </section>
    </motion.main>
  );
}