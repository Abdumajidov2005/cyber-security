import React, { useRef, useEffect, useState } from 'react';
import { useCounter } from '../../hooks/useCounter';

const stats = [
  { value: 240, suffix: '+', label: 'Darslar', sublabel: 'Video darslar' },
  { value: 4000, suffix: '+', label: 'Talabalar', sublabel: 'Faol o\'quvchilar' },
  { value: 12, suffix: '+', label: 'Instruktorlar', sublabel: 'Sertifikatlangan' },
  { value: 98, suffix: '%', label: 'Mamnunlik', sublabel: 'Talabalar bahosi' },
];

function StatItem({ value, suffix, label, sublabel, animate }) {
  const { count, start } = useCounter(value, 1800);
  const [lineAnimated, setLineAnimated] = useState(false);

  useEffect(() => {
    if (animate) {
      start();
      setTimeout(() => setLineAnimated(true), 200);
    }
  }, [animate]);

  return (
    <div className="text-center md:text-left" data-reveal>
      <div className="font-display text-6xl md:text-7xl text-text leading-none mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-display text-lg tracking-widest text-accent mb-1">{label}</div>
      <div className="text-muted text-xs tracking-wider mb-4">{sublabel}</div>
      <div className="h-px bg-white/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-accent transition-transform duration-[1800ms] ease-out"
          style={{
            transform: lineAnimated ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  );
}

export function CounterSection() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
