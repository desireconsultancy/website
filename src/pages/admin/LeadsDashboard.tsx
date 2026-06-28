import { useState, useEffect, useCallback } from 'react';
import type { Lead, LeadStatus } from '../../lib/supabase/database.types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new:         { label: 'New',         color: '#60a5fa', bg: 'rgba(96,165,250,0.1)'  },
  contacted:   { label: 'Contacted',   color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
  in_progress: { label: 'In Progress', color: '#f97316', bg: 'rgba(249,115,22,0.1)'  },
  converted:   { label: 'Converted',   color: '#4ade80', bg: 'rgba(74,222,128,0.1)'  },
  closed:      { label: 'Closed',      color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}30` }}
      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold whitespace-nowrap"
    >
      {cfg.label}
    </span>
  );
}

export function LeadsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('');
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  // ── Auth ──────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // ── Fetch leads ───────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
      });
      if (statusFilter) params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/get-leads?${params}`,
        {
          headers: {
            Authorization: `Bearer ${ADMIN_PASSWORD}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
          },
        },
      );

      if (res.status === 401) {
        sessionStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load leads');
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(fetchLeads, 300); // debounce search
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, fetchLeads]);

  // ── Update status ─────────────────────────────────────────────
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/update-lead-status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    } catch {
      alert('Failed to update status. Please try again.');
    }
  };

  // ── CSV Export ────────────────────────────────────────────────
  const exportCSV = () => {
    const headers = ['Name', 'Business', 'Phone', 'Email', 'Service', 'Status', 'Date', 'Message'];
    const rows = leads.map((l) => [
      l.full_name, l.business_name, l.phone, l.email,
      l.service, l.status,
      new Date(l.created_at).toLocaleDateString('en-IN'),
      `"${l.message.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `desire-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Login screen ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <span className="text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono uppercase">
              DESIRE CONSULTANCY
            </span>
            <h1 className="text-2xl font-bold text-white mt-2 font-display uppercase tracking-tight">
              Admin Access
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#16D9C5]/50 focus:outline-none transition-all duration-300"
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-xs font-mono">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / LIMIT);

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-[9px] tracking-[0.25em] text-[#16D9C5] font-mono uppercase">
            DESIRE CONSULTANCY
          </span>
          <h1 className="text-lg font-bold text-white font-display uppercase tracking-tight leading-none mt-0.5">
            Lead Management
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono">{total} total leads</span>
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-full border border-white/10 text-[10px] tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-mono uppercase"
          >
            Export CSV
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setIsAuthenticated(false); }}
            className="px-4 py-2 rounded-full border border-red-500/20 text-[10px] tracking-widest text-red-400 hover:bg-red-500/10 transition-all duration-300 font-mono uppercase"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {ALL_STATUSES.map((s) => {
            const count = leads.filter((l) => l.status === s).length;
            const cfg = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(statusFilter === s ? '' : s); setPage(1); }}
                style={{ borderColor: statusFilter === s ? cfg.color : 'rgba(255,255,255,0.05)' }}
                className="bg-white/[0.02] border rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-white/5"
              >
                <div className="text-2xl font-bold font-mono" style={{ color: cfg.color }}>{count}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{cfg.label}</div>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            placeholder="Search by name, email, phone, business..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/40 focus:outline-none transition-all duration-300"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as LeadStatus | ''); setPage(1); }}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#16D9C5]/40 focus:outline-none transition-all duration-300 appearance-none"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <button
            onClick={fetchLeads}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 font-mono"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400 mb-6 font-mono">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-white/30 text-sm font-mono">
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/30">
              <span className="text-4xl mb-4">📋</span>
              <p className="text-sm font-mono">No leads found</p>
              {(search || statusFilter) && (
                <button
                  onClick={() => { setSearch(''); setStatusFilter(''); }}
                  className="mt-3 text-xs text-[#16D9C5] font-mono"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-white/30 text-[10px] tracking-widest font-mono uppercase">
                    <th className="px-5 py-4 text-left">Name / Business</th>
                    <th className="px-5 py-4 text-left">Contact</th>
                    <th className="px-5 py-4 text-left">Service</th>
                    <th className="px-5 py-4 text-left">Message</th>
                    <th className="px-5 py-4 text-left">Status</th>
                    <th className="px-5 py-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-150 ${
                        idx === leads.length - 1 ? 'border-none' : ''
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-[11px]">{lead.full_name}</div>
                        <div className="text-white/40 text-[10px] mt-0.5">{lead.business_name}</div>
                      </td>
                      <td className="px-5 py-4">
                        <a href={`tel:${lead.phone}`} className="text-[#16D9C5] hover:underline block">{lead.phone}</a>
                        <a href={`mailto:${lead.email}`} className="text-white/50 hover:text-white hover:underline block mt-0.5">{lead.email}</a>
                      </td>
                      <td className="px-5 py-4 text-white/60 max-w-[140px]">
                        <span className="block truncate">{lead.service}</span>
                      </td>
                      <td className="px-5 py-4 text-white/50 max-w-[200px]">
                        <span className="block truncate" title={lead.message}>{lead.message}</span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="bg-transparent border-none text-[10px] font-mono cursor-pointer focus:outline-none"
                          style={{ color: STATUS_CONFIG[lead.status].color }}
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s} style={{ color: STATUS_CONFIG[s].color, background: '#0a0a0a' }}>
                              {STATUS_CONFIG[s].label}
                            </option>
                          ))}
                        </select>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-5 py-4 text-white/40 whitespace-nowrap font-mono">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60 disabled:opacity-30 hover:border-white/30 transition-all"
            >
              ← Prev
            </button>
            <span className="text-xs text-white/40 font-mono">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60 disabled:opacity-30 hover:border-white/30 transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
