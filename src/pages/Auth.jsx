import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { PageTransition } from '../components/layout/PageTransition';
import { cn } from '../utils/cn';

const loginSchema = z.object({
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(6, 'Parol kamida 6 ta belgi'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgi'),
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(6, 'Parol kamida 6 ta belgi'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Parollar mos kelmadi',
  path: ['confirmPassword'],
});

function InputField({ label, error, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted mb-2">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          className={cn(
            'w-full bg-bg border text-text text-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-muted/50',
            error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent/50'
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function Login() {
  const { login, user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const searchParams = new URLSearchParams(window.location.search);
  const returnUrl = searchParams.get('returnUrl');

  if (user) {
    if (returnUrl) return <Navigate to={returnUrl} replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'instructor') return <Navigate to="/instructor" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast({ message: 'Muvaffaqiyatli kirdingiz!', type: 'success' });
      if (returnUrl) { navigate(returnUrl); return; }
      const role = result.role || 'student';
      if (role === 'admin') navigate('/admin');
      else if (role === 'instructor') navigate('/instructor');
      else navigate('/dashboard');
    } else {
      toast({ message: result.error || 'Kirish xatosi', type: 'error' });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-surface border-r border-white/10 flex-col items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10 text-center">
            <Shield size={40} className="text-accent mx-auto mb-6" />
            <h2 className="font-display text-6xl tracking-wider mb-4">CYBERLEARN</h2>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Professional kiberxavfsizlik ta'limi. Real laboratoriyalar, ekspert instruktorlar.
            </p>
            <div className="mt-12 space-y-4 text-left">
              {[
                '240+ professional darslar',
                '4000+ faol talabalar',
                'Sertifikatlangan instruktorlar',
                'Real CTF laboratoriyalari',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted">
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
                <Shield size={18} className="text-accent" />
                <span className="font-display text-lg tracking-widest">CYBERLEARN</span>
              </Link>
              <h1 className="font-display text-4xl tracking-wider mb-2">KIRISH</h1>
              <p className="text-muted text-sm">
                Hisobingiz yo'qmi?{' '}
                <Link to="/register" className="text-accent hover:underline">
                  Ro'yxatdan o'ting
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                label="Email"
                type="email"
                placeholder="sardor@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <InputField
                label="Parol"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-end">
                <a href="#" className="text-xs text-muted hover:text-accent transition-colors">
                  Parolni unutdingizmi?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-bg py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                )}
                Kirish
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-muted text-xs text-center mb-1 uppercase tracking-wider">Demo kirish</p>
              <p className="text-accent/70 text-xs text-center font-mono">admin@cyberlearn.uz</p>
              <p className="text-accent/70 text-xs text-center font-mono">cyber2026</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export function Register() {
  const { register: registerUser, user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      toast({ message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', type: 'success' });
      navigate('/dashboard');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-surface border-r border-white/10 flex-col items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10 text-center">
            <Shield size={40} className="text-accent mx-auto mb-6" />
            <h2 className="font-display text-6xl tracking-wider mb-4">CYBERLEARN</h2>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Kiberxavfsizlik sohasida karyerangizni boshlang. Bepul kurslar bilan hoziroq o'rganing.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
                <Shield size={18} className="text-accent" />
                <span className="font-display text-lg tracking-widest">CYBERLEARN</span>
              </Link>
              <h1 className="font-display text-4xl tracking-wider mb-2">RO'YXATDAN O'TISH</h1>
              <p className="text-muted text-sm">
                Hisobingiz bormi?{' '}
                <Link to="/login" className="text-accent hover:underline">
                  Kiring
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                label="To'liq ism"
                placeholder="Sardor Nazarov"
                error={errors.name?.message}
                {...register('name')}
              />
              <InputField
                label="Email"
                type="email"
                placeholder="sardor@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <InputField
                label="Parol"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              <InputField
                label="Parolni tasdiqlang"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-bg py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                )}
                Ro'yxatdan o'tish
              </button>

              <p className="text-muted text-xs text-center">
                Ro'yxatdan o'tish orqali{' '}
                <a href="#" className="text-accent hover:underline">foydalanish shartlari</a>
                {' '}ga rozilik bildirasiz
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
