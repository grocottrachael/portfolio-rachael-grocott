import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Plus, X, ExternalLink } from 'lucide-react';
import { C, Heart, Sparkle } from './Shapes';
import RoleCycle from './RoleCycle';
import { Link, navigate } from '../router';
import { caseStudies } from '../content/caseStudies';

const spring = { type: 'spring', stiffness: 380, damping: 38 } as const;

function External(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/* "For work", "Just for us"... who each thing was made for */
/* "live" adds a pulsing green dot: for what I'm doing right now */
function For({ children, live }: { children: React.ReactNode; dark?: boolean; live?: boolean }) {
  return (
    <span className="chunky-tag" style={live ? { display: 'inline-flex', alignItems: 'center', gap: '0.4rem' } : undefined}>
      {live && (
        <span className="relative flex w-2 h-2" aria-hidden>
          <span className="absolute inset-0 rounded-full bg-[#2FBF71] opacity-70 motion-safe:animate-ping" />
          <span className="relative w-2 h-2 rounded-full bg-[#2FBF71]" />
        </span>
      )}
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
  /* fill: the picture fills the rest of the block (for the big block) */
  image?: { src: string; alt: string; className?: string; fill?: boolean };
  /* A kitsch sticker stuck on the corner of the picture */
  sticker?: React.ReactNode;
  /** shown above the title */
  logo?: React.ReactNode;
  /** on a wide block, show the logo big on the right instead of above the title */
  logoRight?: boolean;
  /** show the logo big at the foot of the block, so titles line up with their neighbours */
  logoBelow?: boolean;
  /** happening now: a pulsing dot on the label */
  live?: boolean;
  /** no detail panel yet: the block goes straight to the project's own site */
  linksOut?: boolean;
  /** the logo spells out the name, so the big title is for screen readers only */
  wordmark?: boolean;
  story: React.ReactNode;
  link?: { href: string; label: string };
};

const projects: Project[] = [
  {
    sticker: <Sparkle color={C.yellow} className="sticker absolute -top-5 -right-4 w-12 h-12 md:w-14 md:h-14 rotate-[10deg]" />,
    id: 'swatchmaker',
    title: 'SwatchMaker',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    span: 'col-span-2 md:row-span-2',
    summary: 'See paint colours from every brand side by side.',
    image: {
      src: '/swatchmaker-tile.webp?v=2',
      alt: 'SwatchMaker matching paints to the Rivers wallpaper by Living Quarters: Lick Green 03, Dulux Bracken Salts 5 and Valspar Ode to Joy',
      className: 'aspect-[4/3] md:aspect-auto border-[3px] border-[var(--ink)]',
      fill: true,
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
    sticker: <Sparkle color={C.green} className="sticker absolute -bottom-4 -left-3 w-9 h-9 md:w-10 md:h-10 -rotate-[8deg]" />,
    id: 'graphy',
    title: 'Graphy SDK',
    madeFor: 'Currently working here',
    live: true,
    bg: C.accent,
    span: 'col-span-2 md:col-span-1',
    summary: 'Editable charts for developers and their AI agents. I design the developer experience, and own the design of graphy.dev.',
    image: {
      src: '/work/graphy/theme-botanical.webp',
      alt: 'A chart drawn with the Graphy SDK in its Botanical theme: bars as leaf blades on grained paper',
      className: 'border-[3px] border-[var(--ink)]',
    },
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
    span: 'col-span-1',
    summary: 'I needed it, so I built it. Images into halftone, dithering or ASCII.',
    story: (
      <>
        Upload an image and turn it into halftone dots, ordered dithering or ASCII. Choose circle or square dots, tune
        the size, spacing and contrast, pick your colours, then export a PNG or SVG.
      </>
    ),
    link: { href: 'https://www.dotties.app/', label: 'Visit dotties.app' },
    linksOut: true,
  },
  {
    sticker: <Heart color={C.pink} className="sticker absolute -top-5 -right-3 w-11 h-11 md:w-12 md:h-12 rotate-[12deg]" />,
    id: 'knot-a-problem',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    span: 'col-span-2 md:col-span-1 md:row-span-2',
    summary: 'Never get stuck reading a crochet pattern again. It started with my granny.',
    image: {
      src: '/knot-diagram.webp',
      alt: 'A granny square drawn by Knot a Problem as a stitch diagram, round by round',
      className: 'aspect-square object-cover bg-white border-[3px] border-[var(--ink)]',
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
    madeFor: 'Just for me',
    bg: C.green,
    span: 'col-span-2',
    logo: <img src="/crumbs-icon.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-[10px]" />,
    logoRight: true,
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
    linksOut: true,
  },
];

/*
 * What a block does, shown when you hover it (and always on touch screens,
 * which have no hover): read the case study, open a site, or find out more.
 */
export function HoverCta({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-4 right-4 md:top-5 md:right-5 z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-white px-2 [@media(hover:hover)]:px-3 py-1.5 text-[13px] font-bold text-[var(--ink)] shadow-[0_2px_0_var(--ink)] transition-all duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0"
    >
      {/* On touch screens there's no room for words next to the title, so just the icon */}
      <span className="hidden [@media(hover:hover)]:inline">{label}</span>
      {icon}
    </span>
  );
}

function ProjectTile({ p, onOpen, cta }: { p: Project; onOpen: () => void; cta: { label: string; icon: React.ReactNode } }) {
  const soft = p.dark ? 'text-white/70' : 'text-[var(--ink-soft)]';
  return (
    <article
      id={p.id}
      onClick={onOpen}
      className={`group relative cursor-pointer overflow-hidden p-5 md:p-7 flex flex-col transition-[filter] hover:brightness-[1.03] ${
        p.dark ? 'text-white' : 'text-[var(--ink)]'
      } ${p.span}`}
      style={{ background: p.bg }}
    >
      {p.logo && !p.logoBelow && <div className={`mt-6 ${p.logoRight ? 'md:hidden' : ''}`}>{p.logo}</div>}
      {p.logo && p.logoRight && (
        <div
          aria-hidden
          className="hidden md:block absolute right-[20%] top-1/2 -translate-y-1/2 w-[clamp(88px,8vw,130px)] [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[22%]"
        >
          {p.logo}
        </div>
      )}
      {p.linksOut && p.link ? (
        <a
          href={p.link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
        <span
          className={
            p.wordmark
              ? 'sr-only'
              : 'block font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]'
          }
        >
          {p.title}
        </span>
        <span className={`${p.wordmark ? 'mt-1' : 'mt-3'} block text-[16px] leading-snug ${p.logoRight ? "max-w-[36ch]" : "max-w-[52ch]"} ${soft}`}>{p.summary}</span>
      </a>
      ) : (
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="block w-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
        <span
          className={
            p.wordmark
              ? 'sr-only'
              : 'block font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]'
          }
        >
          {p.title}
        </span>
        <span className={`${p.wordmark ? 'mt-1' : 'mt-3'} block text-[16px] leading-snug ${p.logoRight ? "max-w-[36ch]" : "max-w-[52ch]"} ${soft}`}>{p.summary}</span>
      </button>
      )}

      <HoverCta {...cta} />
      {p.logo && p.logoBelow && <div className="mt-auto pt-6">{p.logo}</div>}

      {p.image && (
        <div className={`relative mt-5 flex-1 flex ${p.image.fill ? 'min-h-0' : 'items-start'}`}>
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            className={`w-full ${p.image.fill ? 'h-full object-cover object-left-top' : ''} transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 ${
              p.image.className ?? ''
            }`}
          />
          {p.sticker}
        </div>
      )}

    </article>
  );
}

/*
 * The detail panel. The grid stays exactly where it is; the panel fades and
 * rises in over a soft backdrop. Escape, the close button or a click outside
 * closes it.
 */
function ProjectPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  /* Focus the panel itself, so a ring doesn't land on the close button; Tab reaches it next */
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panelRef.current?.focus();
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
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${p.id}-title`}
        className="relative w-full md:max-w-4xl max-h-[90vh] overflow-y-auto outline-none p-6 md:p-10 text-[var(--ink)] shadow-[0_24px_80px_rgba(43,35,64,0.25)]"
        style={{ background: p.bg }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="chunky-icon absolute top-5 right-5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--c-blue)]"
        >
          <X className="w-4 h-4" />
        </button>
        <For>{p.madeFor}</For>
        <h3
          id={`${p.id}-title`}
          className="mt-4 pr-12 font-display leading-[1.05] text-[32px] md:text-[40px]"
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
      {href && (
        <HoverCta label="Opens in a new tab" icon={<ArrowUpRight className="w-3.5 h-3.5" />} />
      )}
      <h3 className="font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]">{title}</h3>
      <div className={`mt-3 text-[16px] leading-snug ${dark ? 'text-white/70' : 'text-[var(--ink-soft)]'}`}>{children}</div>
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
    const onOpen = () => {
      if (p.linksOut && p.link) window.open(p.link.href, '_blank', 'noopener,noreferrer');
      else if (hasStudy) navigate(`/work/${id}`);
      else setOpenId(id);
    };
    const cta = p.linksOut ? (
      { label: "Opens in a new tab", icon: <ArrowUpRight className="w-3.5 h-3.5" /> }
    ) : hasStudy ? (
      { label: "Read the case study", icon: <ArrowRight className="w-3.5 h-3.5" /> }
    ) : (
      { label: "Find out more", icon: <Plus className="w-3.5 h-3.5" /> }
    );
    return <ProjectTile key={id} p={p} onOpen={onOpen} cta={cta} />;
  };
  const openProject = projects.find((x) => x.id === openId);

  return (
    <LayoutGroup>
      <section
        aria-label="Things I've made"
        className="grid grid-cols-2 md:grid-cols-3 grid-flow-row-dense md:auto-rows-[minmax(13vw,auto)] gap-2.5 p-2.5 md:gap-3 md:p-3 md:pl-0"
      >
        {tile('swatchmaker')}
        {/* Experience: where hiring managers look first */}
        <Link
          to="/experience"
          className="group relative overflow-hidden p-5 md:p-7 flex flex-col text-[var(--ink)] col-span-2 md:col-span-1 min-h-[220px]"
          style={{ background: C.green }}
        >
          <HoverCta label="See my experience" icon={<ArrowRight className="w-3.5 h-3.5" />} />
          <span className="block font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]">
            Experience
          </span>
          <span className="mt-3 block text-[16px] leading-snug text-[var(--ink-soft)]">Plus skills, talks and press.</span>
          {/* A mini CV that flips through the roles, with their logos */}
          <RoleCycle />
        </Link>
        {tile('graphy')}
        {tile('knot-a-problem')}
        {tile('crumbs')}
        {tile('dotties')}
        <InfoTile
          bg={C.accent}
          madeFor="For anyone curious"
          title="My latest work"
          href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
          className="col-span-2 md:col-span-1"
        >
          I post what I&rsquo;m working on as I go. LinkedIn is the place to see it.
        </InfoTile>
        <InfoTile bg={C.pink} madeFor="For teams" title="Talks & workshops" className="col-span-1">
          I&rsquo;ve spoken at loads of events, and I run sessions like <em>How to give and receive feedback</em>.
        </InfoTile>
        {tile('triangirls')}
        <InfoTile bg={C.green} madeFor="In the press" title="VICE & Samsung" className="col-span-1">
          Interviewed by VICE. Featured in Samsung&rsquo;s Not a School.
        </InfoTile>
      </section>
      <AnimatePresence>
        {openProject && <ProjectPanel key={openProject.id} p={openProject} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
