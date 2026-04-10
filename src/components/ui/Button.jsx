import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-accent text-bg hover:bg-accent/90 font-semibold',
  outline: 'border border-accent text-accent hover:bg-accent hover:text-bg',
  ghost: 'text-text hover:text-accent border border-transparent hover:border-white/10',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 tracking-wide uppercase text-xs font-medium',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
