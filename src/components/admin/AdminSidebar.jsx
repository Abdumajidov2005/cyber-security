import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, CreditCard,
  UserCheck, Star, Settings, LogOut, Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/admin',             label: 'Dashboard',    icon: LayoutDashboard, end: true },
  { to: '/admin/courses',     label: 'Courses',      icon: BookOpen },
  { to: '/admin/users',       label: 'Users',        icon: Users },
  { to: '/admin/payments',    label: 'Payments',     icon: CreditCard },
  { to: '/admin/instructors', label: 'Instructors',  icon: UserCheck },
  { to: '/admin/reviews',     label: 'Reviews',      icon: Star },
  { to: '/admin/settings',    label: 'Settings',     icon: Settings },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-surface border-r border-white/8 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-accent" />
          <span className="font-display text-lg tracking-widest text-accent">CYBERLEARN</span>
        </div>
        <p className="text-[10px] text-muted tracking-widest mt-0.5 ml-6">ADMIN PANEL</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 relative',
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

      {/* User */}
      <div className="px-4 py-4 border-t border-white/8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-accent/20 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text truncate">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-muted truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-red-400 hover:bg-red-500/8 transition-all duration-200"
        >
          <LogOut size={13} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
