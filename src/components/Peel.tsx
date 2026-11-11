import { useLayoutEffect, useRef, useState } from 'react';

/*
 * A sticker whose bottom-right corner peels up on hover, like a real one.
 * The sticker is drawn twice: once with the corner cut off along a 45° fold line,
 * and once as the flap, which is that cut-off corner mirrored over the fold line
 * and turned to the sticker's white back. Works for any shape, because the flap
 * is the sticker's own outline.
 */
/* amount: how deep the peel goes, as a share of the sticker's shorter side */
export default function Peel({ children, amount = 0.24 }: { children: React.ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const style = {
    '--w': `${size.w}px`,
    '--h': `${size.h}px`,
    '--peel-max': `${Math.round(Math.min(size.w, size.h) * amount + 8)}px`,
  } as React.CSSProperties;

  return (
    /* Padded out, so the white outline and shadow sit inside the masked box */
    <div ref={ref} className="peel relative -m-[8px]" style={style}>
      <div className="peel-front p-[8px]">{children}</div>
      <div aria-hidden className="peel-flap absolute inset-0 p-[8px] pointer-events-none">
        <div className="peel-back">{children}</div>
      </div>
    </div>
  );
}
