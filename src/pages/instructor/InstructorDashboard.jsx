import React from 'react';
import { DollarSign, Users, Star, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { StatusBadge } from '../../components/admin/StatusBadge';

const revenueData = [
  { month: 'Nov', revenue: 1200000 },
  { month: 'Dec', revenue: 1850000 },
  { month: 'Jan', revenue: 1420000 },
  { month: 'Feb', revenue: 2100000 },
  { month: 'Mar', revenue: 1780000 },
  { month: 'Apr', revenue: 2340000 },
];

const myCourses = [
  { title: 'SQL Injection Mastery', students: 1240, rating: 4.8, revenue: 12400000, status: 'published' },
  { title: 'XSS Attacks', students: 870, rating: 4.7, revenue: 8700000, status: 'published' },
  { title: 'Web App Pentest', students: 640, rating: 4.9, revenue: 6400000, status: 'draft' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1d24] border border-white/10 px-3 py-2 text-xs">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-accent font-medium">{Number(payload[0].value).toLocaleString()} so'm</p>
    </div>
  );
};

export function InstructorDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Earnings This Month" value="2,340,000" suffix=" so'm" icon={DollarSign} change={12} />
        <StatCard title="Total Students" value={2750} icon={Users} change={8} />
        <StatCard title="Avg Rating" value="4.8" icon={Star} change={2} />
        <StatCard title="Total Courses" value={3} icon={TrendingUp} />
      </div>

      {/* Revenue chart */}
      <div className="bg-surface border border-white/8 p-5">
        <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Revenue — Last 6 Months (70% share)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={revenueData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#6b6b60', fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={v => `${(v / 1000000).toFixed(1)}M`}
              tick={{ fill: '#6b6b60', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="revenue" stroke="#c8b97a" strokeWidth={2} dot={false}
              activeDot={{ r: 4, fill: '#c8b97a', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* My courses table */}
      <div className="bg-surface border border-white/8">
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="text-xs uppercase tracking-widest text-muted">My Courses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Title', 'Students', 'Rating', 'Revenue', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myCourses.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-text font-medium">{c.title}</td>
                  <td className="px-5 py-3 text-text/70">{c.students.toLocaleString()}</td>
                  <td className="px-5 py-3 text-accent">★ {c.rating}</td>
                  <td className="px-5 py-3 text-text">{c.revenue.toLocaleString()} so'm</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
