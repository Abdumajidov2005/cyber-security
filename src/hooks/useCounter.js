import { useState, useEffect, useRef } from 'react';

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function useCounter(target, duration = 1800, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const frameRef = useRef(null);

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [started, target, duration]);

  return { count, start };
}
