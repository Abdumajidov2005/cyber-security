import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1d24] border border-white/10 px-3 py-2 text-xs">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-accent font-medium">{payload[0].value} enrollments</p>
    </div>
  );
};

export function EnrollmentChart({ data }) {
  return (
    <div className="bg-surface border border-white/8 p-5">
      <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Enrollments by Category</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fill: '#6b6b60', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: '#6b6b60', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="enrollments" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? '#c8b97a' : '#8a7d52'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopCoursesChart({ data }) {
  return (
    <div className="bg-surface border border-white/8 p-5">
      <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Top 5 Courses by Enrollment</h3>
      <div className="flex flex-col gap-3 mt-2">
        {data.map((item, i) => {
          const max = data[0].enrollments;
          const pct = Math.round((item.enrollments / max) * 100);
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-muted text-xs w-4 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-text/80 truncate max-w-[160px]">{item.title}</span>
                  <span className="text-xs text-accent ml-2">{item.enrollments}</span>
                </div>
                <div className="h-1.5 bg-white/5 w-full">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RatingChart({ data }) {
  const chartData = data.map((count, i) => ({ star: `${i + 1}★`, count }));
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="star" tick={{ fill: '#6b6b60', fontSize: 9 }} tickLine={false} axisLine={false} />
        <Bar dataKey="count" radius={[2, 2, 0, 0]} fill="#c8b97a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
