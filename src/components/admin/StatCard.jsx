import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function StatCard({ title, value, change, icon: Icon, prefix = '', suffix = '' }) {
  const isPositive = change >= 0;
  return (
    <div className="bg-surface border border-white/8 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-muted text-xs uppercase tracking-widest">{title}</span>
        {Icon && (
          <div className="w-9 h-9 bg-accent/10 flex items-center justify-center">
            <Icon size={16} className="text-accent" />
          </div>
        )}
      </div>
      <div className="text-2xl font-display tracking-wider text-text">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs', isPositive ? 'text-green-400' : 'text-red-400')}>
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{isPositive ? '+' : ''}{change}% this month</span>
        </div>
      )}
    </div>
  );
}
