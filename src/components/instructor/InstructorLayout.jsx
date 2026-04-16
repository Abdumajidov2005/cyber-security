import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, DollarSign, Users, LogOut, Cpu,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { Bell } from 'lucide-react';

const navItems = [
  { to: '/instructor',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/instructor/courses',  label: 'My Courses', icon: BookOpen },
  { to: '/instructor/revenue',  label: 'Revenue',   icon: DollarSign },
  { to: '/instructor/students', label: 'Students',  icon: Users },
];

const pageTitles = {
  '/instructor':          'Dashboard',
  '/instructor/courses':  'My Courses',
  '/instructor/revenue':  'Revenue',
  '/instructor/students': 'Students',
};

export function InstructorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const title = pageTitles[pathname] || 'Instructor';

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-60 bg-surface border-r border-white/8 flex flex-col z-40">
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-accent" />
            <span className="font-display text-lg tracking-widest text-accent">CYBERLEARN</span>
          </div>
          <p className="text-[10px] text-muted tracking-widest mt-0.5 ml-6">INSTRUCTOR</p>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200',
                      isActive
                        ? 'text-accent bg-accent/8 border-l-2 border-accent pl-[10px]'
                        : 'text-muted hover:text-text hover:bg-white/4 border-l-2 border-transparent pl-[10px]'
                    )
                  }
                >
                  <Icon size={15} />
                  <span className="tracking-wide">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-white/8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
              {user?.name?.charAt(0) || 'I'}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text truncate">{user?.name || 'Instructor'}</p>
              <p className="text-[10px] text-muted truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-red-400 hover:bg-red-500/8 transition-all"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <header className="h-14 bg-surface border-b border-white/8 flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="font-display text-xl tracking-widest text-text">{title}</h1>
          <button className="relative w-8 h-8 flex items-center justify-center text-muted hover:text-text transition-colors">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
