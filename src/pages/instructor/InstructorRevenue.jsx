import React from 'react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DollarSign, TrendingUp, Percent } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const payouts = [
  { date: '2026-03-01', amount: 1638000, status: 'paid' },
  { date: '2026-02-01', amount: 1246000, status: 'paid' },
  { date: '2026-01-01', amount: 994000, status: 'paid' },
  { date: '2025-12-01', amount: 1295000, status: 'paid' },
  { date: '2025-11-01', amount: 840000, status: 'paid' },
];

const grossRevenue = 33400000;
const platformFee = grossRevenue * 0.30;
const instructorShare = grossRevenue * 0.70;

export function InstructorRevenue() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Gross Revenue" value={`${(grossRevenue / 1000000).toFixed(1)}M so'm`} icon={DollarSign} />
        <StatCard title="Platform Fee (30%)" value={`${(platformFee / 1000000).toFixed(1)}M so'm`} icon={Percent} />
        <StatCard title="Your Share (70%)" value={`${(instructorShare / 1000000).toFixed(1)}M so'm`} icon={TrendingUp} change={12} />
      </div>

      {/* Breakdown */}
      <div className="bg-surface border border-white/8 p-5">
        <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Revenue Breakdown</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Gross Revenue', value: grossRevenue, color: 'bg-white/20' },
            { label: 'Platform Fee (30%)', value: platformFee, color: 'bg-red-500/40' },
            { label: 'Your Earnings (70%)', value: instructorShare, color: 'bg-accent' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="text-xs text-muted w-40 flex-shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-white/5">
                <div
                  className={`h-full ${item.color} transition-all`}
                  style={{ width: `${(item.value / grossRevenue) * 100}%` }}
                />
              </div>
              <span className="text-sm text-text w-32 text-right">{item.value.toLocaleString()} so'm</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout history */}
      <div className="bg-surface border border-white/8">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h3 className="text-xs uppercase tracking-widest text-muted">Payout History</h3>
          <Button size="sm" variant="outline">Request Payout</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Date', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-muted text-xs">{p.date}</td>
                  <td className="px-5 py-3 text-text font-medium">{p.amount.toLocaleString()} so'm</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
