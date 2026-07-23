import { MapPin, Calendar, Mail, Hash } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-tuncis-blue-dark text-white border-t border-tuncis-blue shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        <div>
          <p className="font-heading text-2xl mb-3 flex items-center gap-2">
            <span className="font-bold">TUNCIS</span> <span className="text-tuncis-yellow">2026</span>
          </p>
          <p className="text-white/70 leading-relaxed">
            Tunisian Conference on Artificial Intelligence and Scientific Innovation.
            Organized by TunAISia in partnership with Horizon University and leading
            Tunisian institutions.
          </p>
        </div>
        <div>
          <p className="uppercase tracking-wider text-tuncis-yellow text-xs font-bold mb-4">Event Details</p>
          <div className="space-y-3">
            <p className="text-white/80 flex items-center gap-3">
              <Calendar size={16} className="text-tuncis-yellow" />
              October 23–24, 2026
            </p>
            <p className="text-white/80 flex items-center gap-3">
              <MapPin size={16} className="text-tuncis-yellow" />
              Green Park Hotel, Sousse, Tunisia
            </p>
            <p className="text-white/80 flex items-center gap-3">
              <Hash size={16} className="text-tuncis-yellow" />
              TUNCIS2026
            </p>
          </div>
        </div>
        <div>
          <p className="uppercase tracking-wider text-tuncis-yellow text-xs font-bold mb-4">Contact Us</p>
          <a href="mailto:tuncis2026@horizon-tech.tn" className="text-white/80 hover:text-tuncis-yellow transition-colors flex items-center gap-3">
            <Mail size={16} className="text-tuncis-yellow" />
            tuncis2026@horizon-tech.tn
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 TUNCIS. All rights reserved.
      </div>
    </footer>
  );
}