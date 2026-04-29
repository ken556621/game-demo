import { useEffect, useRef } from 'react';

const COLORS = ['#fbbf24', '#ef4444', '#f97316', '#10b981', '#3b82f6', '#a855f7', '#ec4899', '#fff'];

export default function Confetti({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const pieces = [];

    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.random() * 10 + 6;
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 1 : 0.4)}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        animation-duration: ${Math.random() * 2 + 2}s;
        animation-delay: ${Math.random() * 0.8}s;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      document.body.appendChild(el);
      pieces.push(el);
    }

    const cleanup = setTimeout(() => pieces.forEach(p => p.remove()), 4000);
    return () => { clearTimeout(cleanup); pieces.forEach(p => p.remove()); };
  }, [active]);

  return <div ref={containerRef} />;
}
