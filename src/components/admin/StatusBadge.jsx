import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  success:    'bg-green-500/15 text-green-400 border border-green-500/30',
  pending:    'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  failed:     'bg-red-500/15 text-red-400 border border-red-500/30',
  refunded:   'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  published:  'bg-green-500/15 text-green-400 border border-green-500/30',
  draft:      'bg-muted/20 text-muted border border-white/10',
  active:     'bg-green-500/15 text-green-400 border border-green-500/30',
  banned:     'bg-red-500/15 text-red-400 border border-red-500/30',
  approved:   'bg-green-500/15 text-green-400 border border-green-500/30',
  hidden:     'bg-muted/20 text-muted border border-white/10',
  admin:      'bg-accent/15 text-accent border border-accent/30',
  instructor: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  student:    'bg-white/10 text-text/70 border border-white/10',
};

export function StatusBadge({ status, className }) {
  const label = status?.charAt(0).toUpperCase() + status?.slice(1);
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase', variants[status] || variants.draft, className)}>
      {label}
    </span>
  );
}
