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
 * Where the eyes are looking. They follow the pointer, blink now and then,
 * and when nobody is moving the mouse (or on a phone) they look about on
 * their own. Reduced motion: they follow the pointer, but don't wander or blink.
 */
function useLook<T extends Element>() {
  const ref = useRef<T>(null);
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
    }, 1400 + Math.random() * 600);
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

  return { ref, look, blink };
}

/* A pair of googly eyes centred on (cx, cy), r = size of each eye */
function GooglyEyes({ cx, cy, r, look, blink }: { cx: number; cy: number; r: number; look: { x: number; y: number }; blink: boolean }) {
  const gap = r * 1.02;
  const pr = r * 0.62;
  const move = r - pr - r * 0.08;
  return (
    <g>
      <circle cx={cx - gap} cy={cy} r={r} fill={C.paper} />
      <circle cx={cx + gap} cy={cy} r={r} fill={C.paper} />
      <g
        style={{
          transform: `translate(${look.x * move}px, ${look.y * move}px) scaleY(${blink ? 0.08 : 1})`,
          transformOrigin: `${cx}px ${cy}px`,
          transformBox: 'view-box',
          transition: blink ? 'transform 70ms ease-in' : 'transform 260ms cubic-bezier(.3,1.4,.5,1)',
        }}
      >
        <circle cx={cx - gap} cy={cy} r={pr} fill={C.ink} />
        <circle cx={cx + gap} cy={cy} r={pr} fill={C.ink} />
      </g>
    </g>
  );
}

/* The flower from the old site: five round petals */
export function Flower({ color, eyes = false, className = '' }: { color: string; eyes?: boolean; className?: string }) {
  const { ref, look, blink } = useLook<SVGSVGElement>();
  const petals = [0, 1, 2, 3, 4].map((i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return { x: 50 + Math.cos(a) * 24, y: 52 + Math.sin(a) * 24 };
  });
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={className} aria-hidden>
      {petals.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={21} fill={color} />
      ))}
      <circle cx={50} cy={52} r={24} fill={color} />
      {eyes && <GooglyEyes cx={50} cy={52} r={8.5} look={look} blink={blink} />}
    </svg>
  );
}

/* The burst from the old site's about page */
export function Burst({ color, eyes = false, className = '' }: { color: string; eyes?: boolean; className?: string }) {
  const { ref, look, blink } = useLook<SVGSVGElement>();
  const pts = Array.from({ length: 18 }, (_, i) => {
    const a = (i * 20 - 90) * (Math.PI / 180);
    const r = i % 2 ? 26 : 48;
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
  }).join(' ');
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points={pts} fill={color} strokeLinejoin="round" />
      {eyes && <GooglyEyes cx={50} cy={50} r={8} look={look} blink={blink} />}
    </svg>
  );
}

/*
 * The eyes.
 They follow the pointer, blink now and then, and when nobody is
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
