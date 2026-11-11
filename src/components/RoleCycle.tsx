import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { roles } from '../content/experience';
import CompanyLogo from './CompanyLogo';

/*
 * The Experience block's picture: one role at a time, sliding right to left
 * with an even ease in and out, with the company's
 * logo, flipping through the CV. Pauses while you hover, and sits still
 * on the latest role if you've asked for less motion.
 */


const years = (d: string) => d.replace(/[A-Z][a-z]{2} /g, '');

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
            <CompanyLogo company={r.company} />
            <span className="min-w-0">
              <span className="block font-display text-[22px] leading-[1.15]">
                {r.company}
              </span>
              <span className="block mt-0.5 text-[15px] leading-[1.3] text-[var(--ink-soft)]">
                {years(r.dates)}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="sr-only">{roles.map((x) => `${x.company}, ${x.dates}`).join('. ')}</span>
    </div>
  );
}
