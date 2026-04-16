import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

function formatSom(v) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1d24] border border-white/10 px-3 py-2 text-xs">
      <p className="text-muted mb-1">{label}</p>
      <p className="text-accent font-medium">{Number(payload[0].value).toLocaleString()} so'm</p>
    </div>
  );
};

export function RevenueChart({ data }) {
  return (
    <div className="bg-surface border border-white/8 p-5">
      <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Revenue — Last 30 Days</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b6b60', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tickFormatter={formatSom}
            tick={{ fill: '#6b6b60', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#c8b97a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#c8b97a', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
