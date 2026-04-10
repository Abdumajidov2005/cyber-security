import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const words = ['CYBERLEARN', 'PENETRATION', 'MALWARE', 'SECURITY'];

export function HeroSlider() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMousePos({
        x: (e.clientX - cx) * 0.3,
        y: (e.clientY - cy) * 0.3,
      });
    };

    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Decorative rings — cursor parallax */}
      <div
        className="absolute pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
          transition: 'transform 0.1s ease-out',
          left: '50%',
          top: '50%',
          marginLeft: '-300px',
          marginTop: '-300px',
        }}
      >
        <div className="w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
          transition: 'transform 0.05s ease-out',
          left: '50%',
          top: '50%',
          marginLeft: '-200px',
          marginTop: '-200px',
        }}
      >
        <div className="w-[400px] h-[400px] border border-accent/10 rounded-full" />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
          transition: 'transform 0.08s ease-out',
          left: '50%',
          top: '50%',
          marginLeft: '-100px',
          marginTop: '-100px',
        }}
      >
        <div className="w-[200px] h-[200px] border border-white/3 rounded-full" />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/3 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-accent" />
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-medium">
            Elite Cybersecurity Education
          </span>
          <div className="w-8 h-px bg-accent" />
        </div>

        {/* Sliding words */}
        <div
          className="overflow-hidden"
          style={{ height: 'clamp(80px, 15vw, 140px)' }}
        >
          <div
            className="hero-slider"
            style={{ willChange: 'transform' }}
          >
            {[...words, words[0]].map((word, i) => (
              <div
                key={i}
                className="font-display text-text leading-none"
                style={{
                  fontSize: 'clamp(72px, 13vw, 130px)',
                  height: 'clamp(80px, 15vw, 140px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {word === 'CYBERLEARN' ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-muted text-sm md:text-base mt-8 max-w-md mx-auto leading-relaxed tracking-wide">
          Professional kiberxavfsizlik kurslarini o'rganing. Real laboratoriyalar, ekspert instruktorlar.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/courses"
            className="border border-accent text-accent px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-bg transition-all duration-300 font-medium"
          >
            Kurslarni ko'rish
          </Link>
          <Link
            to="/register"
            className="text-muted text-xs uppercase tracking-[0.2em] hover:text-text transition-colors flex items-center gap-2"
          >
            Bepul boshlash
            <span className="text-accent">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll down to discover</span>
        <ArrowDown
          size={14}
          className="animate-bounce text-accent"
          style={{ animationDuration: '2s' }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-6 text-[10px] text-muted/40 uppercase tracking-widest hidden lg:block">
        Est. 2024
      </div>
      <div className="absolute top-20 right-6 text-[10px] text-muted/40 uppercase tracking-widest hidden lg:block">
        Toshkent, UZ
      </div>
    </section>
  );
}
