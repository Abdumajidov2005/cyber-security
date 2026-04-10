import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  default: 'border border-white/10 text-muted',
  accent: 'border border-accent/30 text-accent bg-accent/5',
  success: 'border border-green-500/30 text-green-400 bg-green-500/5',
  danger: 'border border-red-500/30 text-red-400 bg-red-500/5',
  free: 'border border-accent/50 text-accent bg-accent/10',
};

export function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-widest font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
