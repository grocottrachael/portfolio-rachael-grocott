import { useLayoutEffect, useRef, useState } from 'react';

/*
 * A sticker whose corner peels up on hover, like a real one: whichever corner
 * the pointer comes in nearest. The sticker is drawn twice: once with the corner
 * cut off along a 45° fold line, and once as the flap, which is that cut-off
 * corner mirrored over the fold line and turned to the sticker's white back.
 * Works for any shape, because the flap is the sticker's own outline.
 * flat: lie flat, e.g. while it's being dragged about.
 */
type Corner = 'tl' | 'tr' | 'bl' | 'br';

export default function Peel({ children, amount = 0.24, flat }: { children: React.ReactNode; amount?: number; flat?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [corner, setCorner] = useState<Corner>('br');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Pick the corner once, as the pointer comes in, so it doesn't flip about mid-peel */
  const onPointerEnter = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const right = e.clientX > r.left + r.width / 2;
    const bottom = e.clientY > r.top + r.height / 2;
    setCorner(`${bottom ? 'b' : 't'}${right ? 'r' : 'l'}` as Corner);
  };

  const style = {
    '--w': `${size.w}px`,
    '--h': `${size.h}px`,
    '--peel-max': `${Math.round(Math.min(size.w, size.h) * amount + 8)}px`,
  } as React.CSSProperties;

  return (
    /* Padded out, so the white outline and shadow sit inside the masked box */
    <div ref={ref} data-corner={corner} onPointerEnter={onPointerEnter} className={`peel relative -m-[8px] ${flat ? 'is-flat' : ''}`} style={style}>
      <div className="peel-front p-[8px]">{children}</div>
      <div aria-hidden className="peel-flap absolute inset-0 p-[8px] pointer-events-none">
        <div className="peel-back">{children}</div>
      </div>
    </div>
  );
}
