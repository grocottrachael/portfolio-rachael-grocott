import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Plus, X, ExternalLink } from 'lucide-react';
import { C, Heart, WordSticker } from './Shapes';
import RoleCycle from './RoleCycle';
import { Link, navigate } from '../router';
import { caseStudies } from '../content/caseStudies';
import Peel from './Peel';

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
  /* scene: a picture drawn in code, shown in place of the image at the image's shape */
  image?: { src: string; alt: string; className?: string; fill?: boolean; scene?: React.ReactNode };
  /* A kitsch sticker stuck on the corner of the picture */
  sticker?: React.ReactNode;
  /* Where the sticker sits, if not bottom left */
  stickerClass?: string;
  /* how deep the sticker peels on hover, as a share of its shorter side */
  stickerPeel?: number;
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
    id: 'swatchmaker',
    title: 'SwatchMaker',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    span: 'col-span-2 md:col-span-4 md:row-span-2',
    summary: 'See paint colours from every brand side by side.',
    image: {
      src: '/work/swatchmaker/card.webp',
      alt: 'SwatchMaker showing a Living Quarters wallpaper next to three paint colours: Lick Green 03, Dulux Bracken Salts 5 and Valspar Ode to Joy',
      /* A sharp, high-resolution picture of the app at 4:3, with its own white frame */
      className: 'aspect-[4/3]',
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
    sticker: (
      <WordSticker lines={["Currently", "working here!"]} color={C.yellow} className="graphy-sticker -rotate-[5deg] origin-bottom-left" />
    ),
    /* Pinned to the bottom corner on desktop, so it doesn't make the card (and the row) taller */
    stickerClass: 'self-start xl:absolute xl:left-6 xl:bottom-5 xl:mt-0 xl:pt-0',
    /* The words sit in from the corner, so the peel goes deeper to reach them */
    stickerPeel: 0.4,
    id: 'graphy',
    title: 'Graphy SDK',
    madeFor: 'Currently working here',
    live: true,
    bg: C.accent,
    span: 'col-span-2 md:col-span-2',
    summary: 'Editable charts for developers and their AI agents. I design the developer experience.',
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
    span: 'col-span-1 md:col-span-2',
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
    sticker: <Heart color={C.pink} className="sticker block w-11 h-11 md:w-12 md:h-12 rotate-[12deg]" />,
    /* A heart's corner is empty, so it peels deeper to catch the curve */
    stickerPeel: 0.42,
    stickerClass: 'absolute -top-5 -right-3',
    id: 'knot-a-problem',
    title: 'Knot a Problem',
    madeFor: 'For crocheters',
    bg: C.yellow,
    span: 'col-span-2 md:col-span-2 md:row-span-2',
    summary: 'Never get stuck reading a crochet pattern again. It started with my granny.',
    image: {
      src: '/knot-diagram.webp',
      alt: 'A granny square drawn by Knot a Problem as a stitch diagram, round by round',
      /* No border: a white square sits cleanly on the yellow */
      className: 'aspect-square object-cover bg-white',
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
    madeFor: 'For our household',
    bg: C.green,
    span: 'col-span-2 md:col-span-4',
    /* The app icon as a sticker you can move about, like the Graphy one */
    sticker: (
      <img
        src="/crumbs-icon.svg"
        alt=""
        width={112}
        height={112}
        draggable={false}
        className="sticker w-[clamp(60px,5vw,84px)] h-auto rounded-[22%] rotate-[6deg]"
      />
    ),
    stickerClass: 'self-end md:absolute md:right-7 md:bottom-7 md:mt-0 md:pt-0',
    /* keeps the text narrow so it clears the sticker */
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
    span: 'col-span-1 md:col-span-3',
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
/* A sticker you can pick up and move around its card. It lifts when you hover or grab it */
function DragSticker({ cardRef, className, peel, children }: { cardRef: React.RefObject<HTMLElement | null>; className: string; peel?: number; children: React.ReactNode }) {
  /* Only draggable with a mouse or trackpad: on a phone, a thumb scrolling past would carry it off */
  const [canDrag] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const [dragging, setDragging] = useState(false);
  return (
    <motion.div
      drag={canDrag}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      dragConstraints={cardRef}
      dragElastic={0.15}
      dragMomentum={false}
      whileHover={{ scale: 1.04, rotate: -2 }}
      whileDrag={{ scale: 1.08, rotate: 3, filter: 'drop-shadow(0 10px 8px rgba(43,35,64,0.25))' }}
      onClick={(e) => e.stopPropagation()}
      className={`z-20 ${canDrag ? 'cursor-grab active:cursor-grabbing touch-none' : ''} ${className}`}
      title={canDrag ? 'Pick me up' : undefined}
    >
      <Peel amount={peel} flat={dragging}>{children}</Peel>
    </motion.div>
  );
}

export function HoverCta({ label, icon }: { label: string; icon: React.ReactNode }) {
  /* Just a round button with the icon: arrow for a case study, + for more, a corner arrow for a new tab */
  return (
    <span
      title={label}
      aria-hidden
      className="hover-cta pointer-events-none absolute right-4 md:right-5 z-10 grid place-items-center w-9 h-9 rounded-full border-2 border-[var(--ink)] bg-white text-[var(--ink)] shadow-[0_2px_0_var(--ink)] group-active:translate-y-0.5 group-active:shadow-none transition-all duration-200 ease-in-out [&_svg]:w-4 [&_svg]:h-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:scale-75 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-focus-within:scale-100"
    >
      {icon}
    </span>
  );
}

function ProjectTile({ p, onOpen, cta }: { p: Project; onOpen: () => void; cta: { label: string; icon: React.ReactNode } }) {
  const soft = p.dark ? 'text-white/70' : 'text-[var(--ink-soft)]';
  const cardRef = useRef<HTMLElement>(null);
  return (
    <article
      ref={cardRef}
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
          className="hidden md:block absolute right-7 bottom-7 w-[clamp(80px,6.5vw,112px)] [&_img]:w-full [&_img]:h-auto [&_img]:rounded-[22%]"
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
              : 'block pr-12 md:pr-0 font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]'
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
              : 'block pr-12 md:pr-0 font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]'
          }
        >
          {p.title}
        </span>
        <span className={`${p.wordmark ? 'mt-1' : 'mt-3'} block text-[16px] leading-snug ${p.logoRight ? "max-w-[36ch]" : "max-w-[52ch]"} ${soft}`}>{p.summary}</span>
      </button>
      )}

      <HoverCta {...cta} />
      {p.logo && p.logoBelow && <div className="mt-auto pt-6">{p.logo}</div>}
      {/* A sticker you can pick up and move around the card */}
      {!p.image && p.sticker && <DragSticker cardRef={cardRef} peel={p.stickerPeel} className={`relative mt-auto pt-6 ${p.stickerClass ?? 'self-start'}`}>{p.sticker}</DragSticker>}

      {p.image && (
        <div className={`relative mt-5 flex-1 flex ${p.image.fill ? 'min-h-0' : 'items-start'}`}>
          {p.image.scene ? (
            <div className="w-full aspect-[4/3]">{p.image.scene}</div>
          ) : (
            <img
              src={p.image.src}
              alt={p.image.alt}
              loading="lazy"
              className={`w-full ${p.image.fill ? 'h-full object-cover object-top' : ''} ${
                p.image.className ?? ''
              }`}
            />
          )}
          {p.sticker && <DragSticker cardRef={cardRef} peel={p.stickerPeel} className={p.stickerClass ?? 'absolute -top-5 -right-3'}>{p.sticker}</DragSticker>}
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
          className="mt-4 pr-12 md:pr-0 font-display leading-[1.05] text-[32px] md:text-[40px]"
        >
          {p.title}
        </h3>
        <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <p className="text-[18px] leading-relaxed text-[var(--ink-soft)]">{p.story}</p>
            {p.link && <Visit href={p.link.href} label={p.link.label} />}
          </div>
          {p.image &&
            (p.image.scene ? (
              <div className="w-full md:max-w-sm md:justify-self-end aspect-[4/3]">{p.image.scene}</div>
            ) : (
              <img
                src={p.image.src}
                alt={p.image.alt}
                className={`w-full md:max-w-sm md:justify-self-end ${p.image.className ?? ''}`}
              />
            ))}
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
  to,
  className = '',
}: {
  bg: string;
  dark?: boolean;
  madeFor: string;
  title: string;
  children: React.ReactNode;
  href?: string;
  to?: string;
  className?: string;
}) {
  const inner = (
    <>
      {href && <HoverCta label="Opens in a new tab" icon={<ArrowUpRight className="w-3.5 h-3.5" />} />}
      {to && <HoverCta label="See it on my Experience page" icon={<ArrowRight className="w-3.5 h-3.5" />} />}
      <h3 className="pr-12 md:pr-0 font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]">{title}</h3>
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
      ) : to ? (
        <Link to={to} className={`${cls} h-full`} style={{ background: bg }}>
          {inner}
        </Link>
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
        className="grid grid-cols-2 md:grid-cols-6 grid-flow-row-dense md:[grid-template-rows:1fr_1fr] md:auto-rows-[minmax(10vw,auto)] gap-3 p-3 md:gap-5 md:p-5 xl:pl-0"
      >
        {tile('swatchmaker')}
        {/* Experience: where hiring managers look first */}
        <Link
          to="/experience"
          className="group relative overflow-hidden p-5 md:p-7 flex flex-col text-[var(--ink)] col-span-2 md:col-span-2 min-h-[220px]"
          style={{ background: C.green }}
        >
          <HoverCta label="See my experience" icon={<ArrowRight className="w-3.5 h-3.5" />} />
          <span className="block pr-12 md:pr-0 font-display leading-[1.05] text-[clamp(22px,6.4vw,28px)] md:text-[clamp(22px,1.8vw,32px)]">
            Experience
          </span>
          <span className="mt-3 block text-[16px] leading-snug text-[var(--ink-soft)]">13 years of product design, from agency to AI.</span>
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
          className="col-span-2 md:col-span-2"
        >
          I post what I&rsquo;m working on as I go. LinkedIn is the place to see it.
        </InfoTile>

        {tile('triangirls')}
        {/* Talks, workshops and press in one card, linking to that part of the Experience page */}
        <InfoTile bg={C.pink} madeFor="For teams" title="Talks, workshops & press" to="/experience#community" className="col-span-2 md:col-span-3">
          I run sessions like <em>How to give and receive feedback</em>, I&rsquo;ve spoken at loads of events, and
          I&rsquo;ve been interviewed by VICE and featured in Samsung&rsquo;s Not a School.
        </InfoTile>
      </section>
      <AnimatePresence>
        {openProject && <ProjectPanel key={openProject.id} p={openProject} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
