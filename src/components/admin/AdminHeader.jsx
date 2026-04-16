import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/admin':              'Dashboard',
  '/admin/courses':      'Course Management',
  '/admin/courses/new':  'Add New Course',
  '/admin/users':        'User Management',
  '/admin/payments':     'Payment History',
  '/admin/instructors':  'Instructor Management',
  '/admin/reviews':      'Review Moderation',
  '/admin/settings':     'Platform Settings',
};

export function AdminHeader() {
  const { pathname } = useLocation();
  const [search, setSearch] = useState('');

  const title =
    pageTitles[pathname] ||
    (pathname.startsWith('/admin/courses/') ? 'Edit Course' : '') ||
    (pathname.startsWith('/admin/users/') ? 'User Detail' : 'Admin');

  return (
    <header className="h-14 bg-surface border-b border-white/8 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="font-display text-xl tracking-widest text-text">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Global search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-bg border border-white/8 pl-8 pr-4 py-1.5 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 w-48 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center text-muted hover:text-text transition-colors">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
      </div>
    </header>
  );
}
