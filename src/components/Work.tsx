import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { C, Eyes } from './Shapes';
import { navigate } from '../router';
import { caseStudies } from '../content/caseStudies';

const spring = { type: 'spring', stiffness: 380, damping: 38 } as const;

function External(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/* "For work", "Just for us"... who each thing was made for */
function For({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`chunky-tag `}
    >
      {children}
    </span>
  );
}

function Visit({ href, label, dark }: { href: string; label: string; dark?: boolean }) {
  return (
    <External
      href={href}
      className={`chunky `}
    >
      {label} <ArrowUpRight className="w-4 h-4" aria-hidden />
    </External>
  );
}

type Project = {
  id: string;
  title: string;
  madeFor: string;
  bg: string;
  dark?: boolean;
  /** grid placement when closed */
  span: string;
  summary: string;
  image?: { src: string; alt: string; className?: string };
  /** shown above the title */
  logo?: React.ReactNode;
  /** the logo spells out the name, so the big title is for screen readers only */
  wordmark?: boolean;
  story: React.ReactNode;
  link?: { href: string; label: string };
};

/* The Dotties logo, as drawn in the Dotties app: a framed, rotated 3x3 dot grid and the name in Jersey 20 */
function DottiesLogo() {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Dotties">
      <span className="relative w-9 h-9 border border-[var(--ink)]/15 bg-white/50" aria-hidden>
        {['-left-px -top-px', '-right-px -top-px', '-left-px -bottom-px', '-right-px -bottom-px'].map((pos) => (
          <span key={pos} className={`absolute w-1 h-1 bg-[var(--ink)]/40 ${pos}`} />
        ))}
        <svg viewBox="0 0 13 13" className="absolute inset-0 m-auto w-[13px] h-[13px] rotate-45">
          {[0, 5, 10].flatMap((y) => [0, 5, 10].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="var(--ink)" />))}
        </svg>
      </span>
      <span className="text-[34px] leading-none" style={{ fontFamily: '"Jersey 20", sans-serif' }} aria-hidden>
        Dotties
      </span>
    </span>
  );
}

const projects: Project[] = [
  {
    id: 'swatchmaker',
    title: 'SWATCHMAKER',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    span: 'col-span-2 md:row-span-2',
    summary: 'See paint colours from every brand side by side.',
    image: {
      src: '/swatchmaker-tile.webp',
      alt: 'SWATCHMAKER: a bathroom photo next to the paint it matched, COAT La Torre',
      className: 'aspect-[4/3] object-cover border-2 border-[var(--ink)]',
    },
    story: (
      <>
        Picking paint means juggling tester pots from a dozen brands. SWATCHMAKER puts colours from Farrow &amp; Ball,
        Little Greene, COAT, Lick, Paint &amp; Paper Library, Dulux and more side by side, so you can build a palette
        before you buy a thing. I designed and built it, and its social posts are made by code too.
      </>
    ),
    link: { href: 'https://swatchmaker.uk/', label: 'Visit swatchmaker.uk' },
  },
  {
    id: 'graphy',
    title: 'Graphy SDK',
    madeFor: 'For developers',
    bg: C.accent,
    span: 'col-span-2 md:col-span-1',
    summary: 'Beautiful, editable charts for developers and their AI agents. My day job.',
    story: (
      <>
        Graphy turns data into clear, beautiful stories. I&rsquo;m a Senior Product Designer on the SDK, which lets
        developers and their AI agents put editable charts into their own products. I design the developer
        experience, and I own the design of graphy.dev.
      </>
    ),
    link: { href: 'https://graphy.dev/', label: 'Visit graphy.dev' },
  },
  {
    id: 'dotties',
    title: 'Dotties',
    madeFor: 'For work',
    bg: C.grey,
    span: 'col-span-2 md:col-span-1',
    summary: 'I needed it, so I built it. Images into halftone, dithering or ASCII.',
    logo: <DottiesLogo />,
    wordmark: true,
    story: (
      <>
        Upload an image and turn it into halftone dots, ordered dithering or ASCII. Choose circle or square dots, tune
        the size, spacing and contrast, pick your colours, then export a PNG or SVG.
      </>
    ),
    link: { href: 'https://dotties.app/', label: 'Visit dotties.app' },
  },
  {
    id: 'knot-a-problem',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    span: 'col-span-2 md:col-span-1 md:row-span-2',
    summary: 'Never get stuck reading a crochet pattern again. It started with my granny.',
    image: {
      src: '/knot-diagram.webp',
      alt: 'A granny square drawn by Knot a Problem as a stitch diagram, round by round',
      className: 'aspect-square object-cover bg-white border-2 border-[var(--ink)]',
    },
    story: (
      <>
        It started with my granny, who has crocheted for sixty years and couldn&rsquo;t remember what a pattern
        meant. Open the PDF the designer sent you, tap the row that has lost you, and get it back in plain words or
        drawn as a diagram. It keeps your place, knows UK from US terms, and does the sums when you change size or
        yarn. Accessibility is the spec, not a nice-to-have.
      </>
    ),
    link: { href: 'https://knotaproblem.app/', label: 'Visit knotaproblem.app' },
  },
  {
    id: 'crumbs',
    title: 'Crumbs',
    madeFor: 'Just for us',
    bg: C.green,
    span: 'col-span-2',
    logo: <img src="/crumbs-icon.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-[10px]" />,
    summary: 'A no-faff calorie diary for our household. Snap your plate and it works it out.',
    story: (
      <>
        Snap your plate, a receipt or a nutrition label and Claude works it out, or scan a barcode. Everyone gets
        their own diary, while the fridge, the shopping and saved meals are shared. It asks a quick follow-up only
        when the answer changes the total, like whether there was oil in the pan. It&rsquo;s self-hosted for our
        house, so there&rsquo;s nothing to visit.
      </>
    ),
  },
  {
    id: 'triangirls',
    title: 'Triangirls',
    madeFor: 'For women in tech',
    bg: C.blue,
    span: 'col-span-2 md:col-span-1',
    summary: 'I founded and ran a 2,000+ member community, for years.',
    story: <>I founded Triangirls and ran it for years, growing it into a community of more than 2,000 women in tech.</>,
    link: { href: 'https://x.com/triangirlsocial', label: 'Triangirls on X' },
  },
];

function ProjectTile({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const soft = p.dark ? 'text-white/70' : 'text-[var(--ink-soft)]';
  return (
    <article
      id={p.id}
      onClick={onOpen}
      className={`group relative cursor-pointer overflow-hidden p-5 md:p-7 flex flex-col ${
        p.dark ? 'text-white' : 'text-[var(--ink)]'
      } ${p.span}`}
      style={{ background: p.bg }}
    >
      <div className="pr-12">
        <For dark={p.dark}>{p.madeFor}</For>
      </div>
      {p.logo && <div className="mt-6">{p.logo}</div>}
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="mt-4 block w-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        <span
          className={
            p.wordmark
              ? 'sr-only'
              : 'block font-black uppercase leading-[0.9] tracking-[-0.01em] text-[34px] md:text-[clamp(26px,2.3vw,42px)]'
          }
        >
          {p.title}
        </span>
        <span className={`${p.wordmark ? 'mt-1' : 'mt-3'} block text-[16px] leading-snug max-w-[36ch] ${soft}`}>{p.summary}</span>
      </button>

      {p.image && (
        <div className="mt-5 flex-1 flex items-end">
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            className={`w-full transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 ${
              p.image.className ?? ''
            }`}
          />
        </div>
      )}

      <span
        aria-hidden
        className="chunky-icon absolute top-5 right-5"
      >
        <Plus className="w-4 h-4" />
      </span>
    </article>
  );
}

/*
 * The detail panel. The grid stays exactly where it is; the panel fades and
 * rises in over a soft backdrop. Escape, the close button or a click outside
 * closes it.
 */
function ProjectPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[var(--ink)]/25 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${p.id}-title`}
        className="relative w-full md:max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 text-[var(--ink)] shadow-[0_24px_80px_rgba(43,35,64,0.25)]"
        style={{ background: p.bg }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="chunky-icon absolute top-5 right-5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
        >
          <X className="w-4 h-4" />
        </button>
        <For>{p.madeFor}</For>
        <h3
          id={`${p.id}-title`}
          className="mt-4 pr-12 font-black uppercase leading-[0.9] tracking-[-0.01em] text-[36px] md:text-[48px]"
        >
          {p.title}
        </h3>
        <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <p className="text-[18px] leading-relaxed text-[var(--ink-soft)]">{p.story}</p>
            {p.link && <Visit href={p.link.href} label={p.link.label} />}
          </div>
          {p.image && (
            <img
              src={p.image.src}
              alt={p.image.alt}
              className={`w-full md:max-w-sm md:justify-self-end ${p.image.className ?? ''}`}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ShapeTile({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={`relative aspect-square md:aspect-auto ${className}`} aria-hidden>
      {children}
    </motion.div>
  );
}

function InfoTile({
  bg,
  dark,
  madeFor,
  title,
  children,
  href,
  className = '',
}: {
  bg: string;
  dark?: boolean;
  madeFor: string;
  title: string;
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const inner = (
    <>
      <For dark={dark}>{madeFor}</For>
      <h3 className="mt-4 font-black uppercase leading-[0.9] text-[30px] md:text-[clamp(24px,2vw,36px)]">{title}</h3>
      <div className={`mt-3 text-[16px] leading-snug ${dark ? 'text-white/70' : 'text-[var(--ink-soft)]'}`}>{children}</div>
      {href && (
        <span className="chunky-icon absolute top-5 right-5">
          <ArrowUpRight className="w-4 h-4" aria-hidden />
        </span>
      )}
    </>
  );
  const cls = `group relative block p-5 md:p-7 ${dark ? 'text-white' : ''}`;
  return (
    <motion.div className={className.split(/\s+/).filter((c) => /(^|:)(col|row)-/.test(c)).join(' ')}>
      {href ? (
        <External href={href} className={`${cls} h-full`} style={{ background: bg }}>
          {inner}
        </External>
      ) : (
        <div className={`${cls} h-full`} style={{ background: bg }}>
          {inner}
        </div>
      )}
    </motion.div>
  );
}

function readHash() {
  const h = window.location.hash.slice(1);
  return projects.some((p) => p.id === h) ? h : null;
}

export function Work() {
  const [openId, setOpenIdState] = useState<string | null>(() => (typeof window === 'undefined' ? null : readHash()));
  const setOpenId = (id: string | null) => {
    setOpenIdState(id);
    window.history.replaceState(null, '', id ? `#${id}` : window.location.pathname + window.location.search);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null);
    const onHash = () => setOpenIdState(readHash());
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const tile = (id: string) => {
    const p = projects.find((x) => x.id === id)!;
    const hasStudy = caseStudies.some((c) => c.id === id);
    return <ProjectTile key={id} p={p} onOpen={() => (hasStudy ? navigate(`/work/${id}`) : setOpenId(id))} />;
  };
  const openProject = projects.find((x) => x.id === openId);

  return (
    <LayoutGroup>
      <section
        aria-label="Things I've made"
        className="grid grid-cols-2 md:grid-cols-3 grid-flow-row-dense md:auto-rows-[minmax(13vw,auto)] gap-2.5 p-2.5 md:gap-3 md:p-3 md:pl-0"
      >
        {tile('swatchmaker')}
        <ShapeTile>
          <Eyes />
        </ShapeTile>
        {tile('graphy')}
        {tile('knot-a-problem')}
        {tile('crumbs')}
        {tile('dotties')}
        {tile('triangirls')}
        <InfoTile bg={C.pink} madeFor="For teams" title="Talks & workshops" className="col-span-2 md:col-span-1">
          I&rsquo;ve spoken at loads of events, and I run sessions like <em>How to give and receive feedback</em>.
        </InfoTile>
        <InfoTile bg={C.green} madeFor="In the press" title="VICE & Samsung" className="col-span-2 md:col-span-1">
          Interviewed by VICE. Featured in Samsung&rsquo;s Not a School.
        </InfoTile>
        <InfoTile
          bg={C.accent}
          madeFor="For anyone curious"
          title="My latest work"
          href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
          className="col-span-2 md:col-span-1"
        >
          I post what I&rsquo;m working on as I go. LinkedIn is the place to see it.
        </InfoTile>
        <InfoTile bg={C.yellow} madeFor="What I bring" title="Skills" className="col-span-2 md:col-span-3">
          <ul className="mt-1 flex flex-wrap gap-2">
            {[
              'Clear IA',
              'Intuitive UX',
              'DX',
              'Visual polish',
              'Fast AI prototyping',
              'Design systems',
              'Interaction design',
              'Research & testing',
              'Product thinking',
              'Cross-team collaboration',
              'Clear communication',
              'Coaching',
              'Public speaking',
            ].map((skill) => (
              <li key={skill} className="bg-white/60 px-3 py-1.5 text-[15px] font-bold text-[var(--ink)]">
                {skill}
              </li>
            ))}
          </ul>
        </InfoTile>
      </section>
      <AnimatePresence>
        {openProject && <ProjectPanel key={openProject.id} p={openProject} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
