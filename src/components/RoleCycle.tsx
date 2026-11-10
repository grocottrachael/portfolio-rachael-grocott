import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { roles } from '../content/experience';

/*
 * The Experience block's picture: one role at a time, sliding right to left
 * with the same timing as the dots underneath, with the company's
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
      className="flex-1 flex flex-col justify-center pt-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[64px] overflow-hidden pt-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={r.company}
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -48, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
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
              <span className="block font-display text-[20px] leading-[1.2]">
                {r.company}
              </span>
              <span className="block mt-0.5 text-[15px] leading-[1.3] text-[var(--ink-soft)]">
                {years(r.dates)}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Little dots for where you are in the CV */}
      <span className="mt-1 flex gap-1.5" aria-hidden>
        {roles.map((x, n) => (
          <span key={x.company} className={`h-1.5 rounded-full bg-[var(--ink)] transition-all duration-[450ms] ease-[cubic-bezier(.65,0,.35,1)] ${n === i ? 'w-5' : 'w-1.5 opacity-30'}`} />
        ))}
      </span>
      <span className="sr-only">{roles.map((x) => `${x.company}, ${x.dates}`).join('. ')}</span>
    </div>
  );
}
