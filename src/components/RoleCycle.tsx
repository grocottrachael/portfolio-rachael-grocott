import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { roles } from '../content/experience';

/*
 * The Experience block's picture: one role at a time, with the company's
 * logo, flipping through the CV. Pauses while you hover, and sits still
 * on the latest role if you've asked for less motion.
 */

const logos: Record<string, string> = {
  Graphy: '/logos/graphy.png',
  Trint: '/logos/trint.png',
  Geckoboard: '/logos/geckoboard.png',
};

const years = (d: string) => d.replace(/[A-Z][a-z]{2} /g, '').replace(/^(\d{4}) – (\d{2})(\d{2})$/, '$1 – $3');

export default function RoleCycle() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const r = roles[i];
  return (
    <div
      className="mt-auto pt-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[84px] overflow-hidden pt-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={r.company}
            initial={{ y: 40, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -40, opacity: 0, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="flex items-center gap-3"
          >
            {/* Each logo as it comes, no frame. Graphy's mark is see-through, so it gets a white tile */}
            {logos[r.company] ? (
              <img
                src={logos[r.company]}
                alt=""
                className={`shrink-0 w-12 h-12 object-contain ${r.company === 'Graphy' ? 'bg-white rounded-xl p-2' : ''}`}
              />
            ) : (
              <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full bg-[var(--ink)] text-white font-display text-[20px]">
                {r.company[0]}
              </span>
            )}
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-display text-[20px] leading-tight">
                {r.company}
                {r.current && <span className="w-2.5 h-2.5 rounded-full bg-[#2BB24C] border-[1.5px] border-[var(--ink)]" aria-label="Currently working here" />}
              </span>
              <span className="block text-[14px] leading-snug text-[var(--ink-soft)] line-clamp-2">
                {years(r.dates)} · {r.what}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Little dots for where you are in the CV */}
      <span className="mt-1 flex gap-1.5" aria-hidden>
        {roles.map((x, n) => (
          <span key={x.company} className={`h-1.5 rounded-full bg-[var(--ink)] transition-all duration-300 ${n === i ? 'w-5' : 'w-1.5 opacity-30'}`} />
        ))}
      </span>
      <span className="sr-only">{roles.map((x) => `${x.company}, ${x.dates}`).join('. ')}</span>
    </div>
  );
}
