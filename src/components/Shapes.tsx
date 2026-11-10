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

/* Rachael's flower: five round petals, one soft shape */
const FLOWER =
  'M235.739 105.777C242.383 95.157 246.223 82.6031 246.223 69.1522C246.223 30.9605 215.263 0 177.071 0C138.88 0 107.919 30.9605 107.919 69.1522C107.919 79.7207 110.29 89.7354 114.529 98.6936C102.384 88.1247 86.5156 81.7253 69.1522 81.7253C30.9605 81.7253 0 112.686 0 150.878C0 189.069 30.9605 220.03 69.1522 220.03C74.6174 220.03 79.9346 219.396 85.0341 218.197C60.2991 228.733 42.9583 253.265 42.9583 281.848C42.9583 320.039 73.9188 351 112.111 351C144.45 351 171.605 328.801 179.167 298.81C186.73 328.801 213.884 351 246.224 351C284.416 351 315.376 320.039 315.376 281.848C315.376 253.489 298.305 229.117 273.879 218.447C278.641 219.484 283.586 220.03 288.658 220.03C326.85 220.03 357.81 189.069 357.81 150.878C357.81 112.686 326.85 81.7253 288.658 81.7253C267.552 81.7253 248.654 91.1809 235.97 106.087L235.739 105.777Z';

export function Flower({ color, eyes = false, className = '' }: { color: string; eyes?: boolean; className?: string }) {
  const { ref, look, blink } = useLook<SVGSVGElement>();
  return (
    <svg ref={ref} viewBox="0 0 358 351" className={className} aria-hidden>
      <path d={FLOWER} fill={color} fillRule="evenodd" clipRule="evenodd" />
      {eyes && <GooglyEyes cx={179} cy={180} r={30} look={look} blink={blink} />}
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
