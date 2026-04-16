import React, { useState, useMemo } from 'react';
import { Download, DollarSign, Clock, RotateCcw } from 'lucide-react';
import { mockPayments } from '../../data/payments';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { StatCard } from '../../components/admin/StatCard';
import { Pagination } from '../../components/admin/DataTable';

const PER_PAGE = 10;

export function PaymentHistory() {
  const [filterProvider, setFilterProvider] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockPayments.filter(p => {
      const matchProvider = !filterProvider || p.provider === filterProvider;
      const matchStatus = !filterStatus || p.status === filterStatus;
      const matchFrom = !dateFrom || p.date >= dateFrom;
      const matchTo = !dateTo || p.date <= dateTo;
      return matchProvider && matchStatus && matchFrom && matchTo;
    });
  }, [filterProvider, filterStatus, dateFrom, dateTo]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalRevenue = mockPayments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalRefunded = mockPayments.filter(p => p.status === 'refunded').reduce((s, p) => s + p.amount, 0);

  const handleExport = () => {
    const header = 'ID,User,Course,Amount,Provider,Status,Date\n';
    const rows = filtered.map(p =>
      `${p.id},${p.user},${p.course},${p.amount},${p.provider},${p.status},${p.date}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'payments.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Revenue" value={`${(totalRevenue / 1000000).toFixed(1)}M so'm`} icon={DollarSign} />
        <StatCard title="Pending" value={`${(totalPending / 1000).toFixed(0)}K so'm`} icon={Clock} />
        <StatCard title="Refunded" value={`${(totalRefunded / 1000).toFixed(0)}K so'm`} icon={RotateCcw} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterProvider}
            onChange={e => { setFilterProvider(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          >
            <option value="">All Providers</option>
            <option value="Click">Click</option>
            <option value="Payme">Payme</option>
            <option value="Stripe">Stripe</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={e => { setDateFrom(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          />
          <input
            type="date"
            value={dateTo}
            onChange={e => { setDateTo(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          />
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-xs border border-white/10 text-muted hover:text-accent hover:border-accent/30 transition-colors uppercase tracking-wider"
        >
          <Download size={12} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['ID', 'User', 'Course', 'Amount', 'Provider', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-muted text-xs font-mono">{p.id}</td>
                  <td className="px-4 py-3 text-text/80 text-sm">{p.user}</td>
                  <td className="px-4 py-3 text-text/70 text-xs max-w-[160px] truncate">{p.course}</td>
                  <td className="px-4 py-3 text-text text-sm font-medium">{p.amount.toLocaleString()} so'm</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 border border-white/10 text-muted">{p.provider}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-muted text-xs">{p.date}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      </div>
    </div>
  );
}
