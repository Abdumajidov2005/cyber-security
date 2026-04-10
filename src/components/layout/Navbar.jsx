import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const navLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/courses', label: 'Kurslar' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-bg border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      )}
      style={{ transition: 'background-color 400ms ease, border-color 400ms ease' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Shield size={20} className="text-accent" />
          <span className="font-display text-xl tracking-widest text-text">CYBERLEARN</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-xs uppercase tracking-widest transition-colors duration-200',
                  isActive ? 'text-accent' : 'text-muted hover:text-text'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                <div className="w-7 h-7 bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <span className="text-accent text-xs font-semibold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                {user.name.split(' ')[0]}
                <ChevronDown size={12} className={cn('transition-transform', userMenuOpen && 'rotate-180')} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 py-1 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted hover:text-text hover:bg-white/5 transition-colors uppercase tracking-wider"
                  >
                    <LayoutDashboard size={13} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-muted hover:text-red-400 hover:bg-white/5 transition-colors uppercase tracking-wider"
                  >
                    <LogOut size={13} /> Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                className="border border-accent text-accent px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-all duration-300"
              >
                Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'text-xs uppercase tracking-widest py-2',
                  isActive ? 'text-accent' : 'text-muted'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-muted py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-xs uppercase tracking-widest text-red-400 text-left py-2"
                >
                  Chiqish
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-muted py-2"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="border border-accent text-accent px-4 py-2 text-xs uppercase tracking-widest text-center"
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
