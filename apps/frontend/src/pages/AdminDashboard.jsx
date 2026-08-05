import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Search, Download, Users, Award, HelpCircle, ShieldAlert } from 'lucide-react';

const API_BASE = "https://tuncis-2026-website.onrender.com";
const ADMIN_USER = "admin";
const ADMIN_PASS = "Tuncis2026!";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
    setRegistrations([]);
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/registrations`);
        if (!res.ok) throw new Error('Failed to fetch registrations');
        const data = await res.json();
        // Sort registrations by creation date (newest first)
        const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setRegistrations(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [isLoggedIn]);

  // Statistics calculation
  const total = registrations.length;
  const docConsortiumCount = registrations.filter(r => r.doctoralConsortium).length;
  const galaDinnerCount = registrations.filter(r => r.galaDinner).length;
  const nvidiaCount = registrations.filter(r => r.nvidiaCertification).length;

  // Filter registrations
  const filtered = registrations.filter(r => {
    const matchesSearch = 
      r.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.affiliation?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export to CSV
  const exportToCSV = () => {
    if (filtered.length === 0) return;

    const headers = ["ID", "Full Name", "Email", "Phone", "Affiliation", "Status", "Doctoral Consortium", "Gala Dinner", "NVIDIA Certification", "Dietary Restrictions", "Date Registered"];
    const rows = filtered.map(r => [
      r.id,
      r.fullName,
      r.email,
      r.phone,
      r.affiliation,
      r.status,
      r.doctoralConsortium ? "Yes" : "No",
      r.galaDinner ? "Yes" : "No",
      r.nvidiaCertification ? "Yes" : "No",
      r.dietaryRestrictions || "None",
      r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tuncis_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoggedIn) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tuncis-bg min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden max-w-md w-full">
          <div className="h-1.5 bg-gradient-to-r from-tuncis-blue via-tuncis-blue to-tuncis-yellow" />
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-12 h-12 rounded-full bg-tuncis-blue/10 flex items-center justify-center text-tuncis-blue shrink-0">
                <LogIn size={24} />
              </div>
              <h1 className="font-heading text-2xl font-bold text-tuncis-blue">Admin Access</h1>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-tuncis-blue mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-tuncis-blue mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 focus:border-tuncis-blue focus:ring-2 focus:ring-tuncis-blue/20 focus:bg-white transition-all outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-tuncis-yellow text-tuncis-blue font-bold px-8 py-3.5 rounded-xl hover:bg-[#e5c235] active:scale-95 transition-all shadow-md shadow-tuncis-yellow/20 text-base"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-tuncis-bg min-h-screen pb-20"
    >
      <section className="bg-tuncis-blue text-white py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/75 text-sm mt-1">Manage event registrations for TUNCIS 2026</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-center border border-white/40 text-white hover:bg-white/10 px-5 py-2 rounded-full text-sm font-bold transition-all"
          >
            Log Out
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Registrations', value: total, icon: Users, color: 'text-tuncis-blue' },
            { label: 'Doctoral Consortium', value: docConsortiumCount, icon: HelpCircle, color: 'text-indigo-600' },
            { label: 'Gala Dinners', value: galaDinnerCount, icon: Award, color: 'text-rose-600' },
            { label: 'NVIDIA Certifications', value: nvidiaCount, icon: Award, color: 'text-emerald-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-tuncis-gray text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-bold font-heading text-tuncis-blue">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-tuncis-bg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-tuncis-gray/60" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, affiliation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-tuncis-bg border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-tuncis-blue focus:bg-white transition-all text-tuncis-blue"
              />
            </div>
            
            {/* Filter by Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-tuncis-bg border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-tuncis-blue focus:bg-white transition-all text-tuncis-blue cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Researcher">Researcher</option>
              <option value="Engineer">Engineer</option>
              <option value="PhD Student">PhD Student</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            onClick={exportToCSV}
            disabled={filtered.length === 0}
            className="bg-tuncis-yellow text-tuncis-blue font-bold px-6 py-3 rounded-xl hover:bg-[#e5c235] transition-all flex items-center gap-2 shadow-md shadow-tuncis-yellow/10 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            Export to CSV
          </button>
        </div>

        {/* Registrations Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-tuncis-gray font-medium">Loading registrations...</div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center text-tuncis-gray font-medium">No registrations found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-tuncis-bg text-tuncis-blue font-heading font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Contact info</th>
                    <th className="py-4 px-6">Affiliation</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Consortium</th>
                    <th className="py-4 px-6 text-center">Gala</th>
                    <th className="py-4 px-6 text-center">NVIDIA</th>
                    <th className="py-4 px-6">Dietary Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-tuncis-bg/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-tuncis-blue">{r.fullName}</td>
                      <td className="py-4 px-6">
                        <div className="text-tuncis-blue">{r.email}</div>
                        <div className="text-tuncis-gray text-xs mt-0.5">{r.phone}</div>
                      </td>
                      <td className="py-4 px-6 text-tuncis-gray font-medium">{r.affiliation}</td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-tuncis-blue/5 text-tuncis-blue font-bold text-xs px-2.5 py-1 rounded-full border border-tuncis-blue/10">
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block font-bold text-xs px-2.5 py-1 rounded-full ${r.doctoralConsortium ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-50 text-gray-400'}`}>
                          {r.doctoralConsortium ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block font-bold text-xs px-2.5 py-1 rounded-full ${r.galaDinner ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-gray-50 text-gray-400'}`}>
                          {r.galaDinner ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block font-bold text-xs px-2.5 py-1 rounded-full ${r.nvidiaCertification ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-50 text-gray-400'}`}>
                          {r.nvidiaCertification ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-tuncis-gray max-w-[200px] truncate" title={r.dietaryRestrictions}>
                        {r.dietaryRestrictions || <span className="text-gray-300">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
