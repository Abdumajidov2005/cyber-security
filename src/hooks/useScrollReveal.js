import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('[data-reveal]');
    const targets = children.length > 0 ? children : [el];

    targets.forEach((target) => {
      target.classList.add('reveal-hidden');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const index = Array.from(targets).indexOf(target);
            const delay = options.stagger ? index * 120 : 0;

            setTimeout(() => {
              target.classList.remove('reveal-hidden');
              target.classList.add('reveal-visible');
            }, delay);

            observer.unobserve(target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [options.stagger, options.threshold, options.rootMargin]);

  return ref;
}
