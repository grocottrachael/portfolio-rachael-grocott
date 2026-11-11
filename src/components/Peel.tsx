import { useLayoutEffect, useRef, useState } from 'react';

/*
 * A sticker whose corner peels up on hover, like a real one: whichever corner
 * the pointer is nearest, lifting more as it gets closer. The sticker is drawn twice: once with the corner
 * cut off along a 45° fold line, and once as the flap, which is that cut-off
 * corner mirrored over the fold line and turned to the sticker's white back.
 * Works for any shape, because the flap is the sticker's own outline.
 * flat: lie flat, e.g. while it's being dragged about.
 */
export default function Peel({ children, amount = 0.24, flat }: { children: React.ReactNode; amount?: number; flat?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /*
   * Follow the pointer: the corner nearest it peels, more the closer you get.
   * The lift is sqrt(4|dx||dy|) from the middle, so it's zero along the centre lines,
   * where it hands over to the next corner, and that hand-over never jumps.
   */
  const lift = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    const c = `${dy > 0 ? 'b' : 't'}${dx > 0 ? 'r' : 'l'}`;
    if (el.dataset.corner !== c) el.dataset.corner = c;
    const t = Math.min(1, Math.sqrt(4 * Math.abs(dx) * Math.abs(dy)) * 1.25);
    el.style.setProperty('--peel', `calc(var(--peel-max) * ${t.toFixed(3)})`);
    el.classList.add('is-tracking');
  };
  const drop = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--peel', '0px');
    e.currentTarget.classList.remove('is-tracking');
  };

  const style = {
    '--w': `${size.w}px`,
    '--h': `${size.h}px`,
    '--peel-max': `${Math.round(Math.min(size.w, size.h) * amount + 8)}px`,
  } as React.CSSProperties;

  return (
    /* Padded out, so the white outline and shadow sit inside the masked box */
    <div ref={ref} data-corner="br" onPointerMove={lift} onPointerLeave={drop} className={`peel relative -m-[8px] ${flat ? 'is-flat' : ''}`} style={style}>
      <div className="peel-front p-[8px]">{children}</div>
      <div aria-hidden className="peel-flap absolute inset-0 p-[8px] pointer-events-none">
        <div className="peel-back">{children}</div>
      </div>
    </div>
  );
}
