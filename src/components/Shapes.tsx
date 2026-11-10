import { useEffect, useRef, useState } from 'react';

/*
 * The shape tiles from the original rachaelgrocott.com, redrawn as SVG.
 * Each one fills its tile and has a small idle animation. Everything that
 * moves is switched off for people who ask for reduced motion (see index.css).
 */

export const C = {
  blue: '#7B9AE8',
  pink: '#E5BAC4',
  yellow: '#EBCC70',
  green: '#8CCC94',
  grey: '#E5E5E5',
  black: '#181818',
};

const svg = 'absolute inset-0 w-full h-full';

export function Arches() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice" className={svg} aria-hidden>
      <rect x="-50" y="-50" width="200" height="200" fill={C.grey} />
      <g className="anim-bob-slow">
        <path d="M0,49 H100 A50,50 0 0 1 0,49 Z" fill={C.yellow} />
        <path d="M25,49 H75 A25,25 0 0 1 25,49 Z" fill={C.grey} />
      </g>
      <g className="anim-bob">
        <circle cx="50" cy="3" r="50" fill={C.blue} />
        <circle cx="50" cy="2" r="25" fill={C.pink} />
      </g>
    </svg>
  );
}

export function Bands() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={svg} aria-hidden>
      <rect width="100" height="100" fill={C.pink} />
      <rect y="28" width="100" height="44" fill={C.yellow} className="anim-breathe" />
    </svg>
  );
}

export function Flower() {
  const petals = [
    [49, 29],
    [26, 45],
    [73, 45],
    [35.5, 72],
    [64, 72],
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={svg} aria-hidden>
      <rect x="-50" y="-50" width="200" height="200" fill={C.green} />
      <g className="anim-spin" style={{ transformOrigin: '49.5px 52px' }}>
        <circle cx="49.5" cy="53" r="17" fill={C.blue} />
        {petals.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="14.8" fill={C.blue} />
        ))}
      </g>
    </svg>
  );
}

export function Ovals() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={svg} aria-hidden>
      <rect width="100" height="100" fill={C.pink} />
      {[14, 38, 61, 84].map((y) => (
        <ellipse key={y} cx="50" cy={y} rx="50" ry="13" fill={C.yellow} />
      ))}
      {[26.5, 40.5, 55, 69].map((y, i) => (
        <polygon
          key={y}
          points={`39.5,${y} 60.5,${y} 50,${y + 14}`}
          fill={C.green}
          className="anim-drop"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </svg>
  );
}

export function Stairs() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={svg} aria-hidden>
      <rect width="100" height="100" fill={C.pink} />
      <path d="M0,0 H69 V25 H46 V50 H23 V75 H0 Z" fill={C.grey} />
    </svg>
  );
}

/* A ball that hops down the stairs, drawn in its own square layer so it stays round */
export function StairsBall() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <span className="anim-hop absolute w-[9%] aspect-square rounded-full" style={{ background: C.black }} />
    </div>
  );
}

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
      <ellipse cx="38.5" cy="50" rx="13.5" ry="19" fill={C.grey} />
      <ellipse cx="61.5" cy="50" rx="13.5" ry="19" fill={C.grey} />
      <g style={{ transformOrigin: '50px 50px', transformBox: 'view-box', ...pupil }}>
        <ellipse cx="38.5" cy="50" rx="10" ry="13" fill={C.black} />
        <ellipse cx="61.5" cy="50" rx="10" ry="13" fill={C.black} />
      </g>
    </svg>
  );
}
