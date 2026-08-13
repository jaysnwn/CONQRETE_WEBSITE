"use client";

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Customers' },
  { value: 4.9, suffix: '★', label: 'Average Rating', isDecimal: true },
  { value: 500, suffix: '+', label: 'Verified Reviews' },
  { value: 1, suffix: ' Year', label: 'Product Warranty' },
];

function useCountUp(target: number, duration = 1800, isDecimal = false, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isDecimal, started]);
  return count;
}

function StatItem({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const value = useCountUp(stat.value, 1800, stat.isDecimal, started);
  return (
    <div style={{ textAlign: 'center', padding: '32px 24px' }}>
      <div style={{ fontSize: '48px', fontWeight: 900, color: '#111827', lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.02em' }}>
        {stat.isDecimal ? value.toFixed(1) : value.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: '#111827', fontFamily: 'system-ui, sans-serif', padding: '0 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid #1f2937' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ borderRight: '1px solid #1f2937', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
            <StatItem stat={stat} started={started} />
          </div>
        ))}
      </div>
    </section>
  );
}
