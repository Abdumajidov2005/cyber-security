import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';

export function NotFound() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');
    chars.forEach((char, i) => {
      setTimeout(() => {
        char.style.opacity = '1';
        char.style.transform = 'translateY(0)';
      }, i * 80);
    });
  }, []);

  const text = '404';

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Animated 404 */}
        <div ref={textRef} className="flex items-center justify-center mb-6" aria-label="404">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="char font-display text-[20vw] leading-none text-text"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                color: i === 1 ? '#c8b97a' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-accent" />
          <span className="text-accent text-xs uppercase tracking-[0.3em]">Sahifa topilmadi</span>
          <div className="w-8 h-px bg-accent" />
        </div>

        <p className="text-muted text-sm max-w-sm mb-10 leading-relaxed">
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/"
            className="bg-accent text-bg px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors"
          >
            Bosh sahifaga qaytish
          </Link>
          <Link
            to="/courses"
            className="border border-white/20 text-text px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-accent/50 transition-colors"
          >
            Kurslarni ko'rish
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
