import { useEffect, useRef, useState } from 'react';

/* Colours from the original rachaelgrocott.com, and its eyes, redrawn as SVG */

export const C = {
  pink: 'var(--c-pink)',
  blue: 'var(--c-blue)',
  yellow: 'var(--c-yellow)',
  green: 'var(--c-green)',
  grey: 'var(--c-grey)',
  accent: 'var(--c-accent)',
  ink: 'var(--ink)',
  paper: 'var(--paper)',
};

const svg = 'absolute inset-0 w-full h-full';

/*
 * The eyes. They follow the pointer, blink now and then, and when nobody is
 * moving the mouse (or on a phone) they look about on their own.
 */
export function Eyes() {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      lastMove = Date.now();
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener('pointermove', onMove);

    if (reduce) return () => window.removeEventListener('pointermove', onMove);

    const wander = setInterval(() => {
      if (Date.now() - lastMove < 2500) return;
      const a = Math.random() * Math.PI * 2;
      const k = Math.random() < 0.25 ? 0 : 0.6 + Math.random() * 0.4;
      setLook({ x: Math.cos(a) * k, y: Math.sin(a) * k });
    }, 1400);
    let blinkTimer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 2200 + Math.random() * 3500);
    };
    scheduleBlink();
    return () => {
      window.removeEventListener('pointermove', onMove);
      clearInterval(wander);
      clearTimeout(blinkTimer);
    };
  }, []);

  const px = look.x * 3.6;
  const py = look.y * 5;
  const pupil = {
    transform: `translate(${px}px, ${py}px) scaleY(${blink ? 0.08 : 1})`,
    transition: blink ? 'transform 70ms ease-in' : 'transform 260ms cubic-bezier(.3,1.4,.5,1)',
  };

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={svg} aria-hidden>
      <rect x="-50" y="-50" width="200" height="200" fill={C.blue} />
      <ellipse cx="38.5" cy="50" rx="13.5" ry="19" fill={C.paper} />
      <ellipse cx="61.5" cy="50" rx="13.5" ry="19" fill={C.paper} />
      <g style={{ transformOrigin: '50px 50px', transformBox: 'view-box', ...pupil }}>
        <ellipse cx="38.5" cy="50" rx="10" ry="13" fill={C.ink} />
        <ellipse cx="61.5" cy="50" rx="10" ry="13" fill={C.ink} />
      </g>
    </svg>
  );
}
