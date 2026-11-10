import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { C, Eyes } from './Shapes';

const spring = { type: 'spring', stiffness: 380, damping: 38 } as const;

function External(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/* "For work", "Just for us"... who each thing was made for */
function For({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.06em] ${
        dark ? 'bg-white text-[#181818]' : 'bg-[#181818] text-white'
      }`}
    >
      {children}
    </span>
  );
}

function Visit({ href, label, dark }: { href: string; label: string; dark?: boolean }) {
  return (
    <External
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5 ${
        dark ? 'bg-white text-[#181818]' : 'bg-[#181818] text-white'
      }`}
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
  story: React.ReactNode;
  link?: { href: string; label: string };
};

const projects: Project[] = [
  {
    id: 'swatchmaker',
    title: 'SWATCHMAKER',
    madeFor: 'For anyone choosing paint',
    bg: C.pink,
    span: 'col-span-2 md:row-span-2',
    summary: 'See paint colours from every brand side by side.',
    image: {
      src: '/swatchmaker.webp',
      alt: 'SWATCHMAKER: a bathroom photo next to the paint colours La Torre, Follingsby and Pale Taupe',
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
    madeFor: 'For developers & AI agents',
    bg: C.black,
    dark: true,
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
    image: {
      src: '/dotties.webp',
      alt: 'A halftone image made with Dotties: concentric rings of white dots on black',
      className: 'aspect-[4/3] object-cover',
    },
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
    madeFor: 'For crocheters (and my granny)',
    bg: C.yellow,
    span: 'col-span-2 md:col-span-1 md:row-span-2',
    summary: 'Never get stuck reading a crochet pattern again.',
    image: {
      src: '/knot-a-problem.webp',
      alt: 'Knot a Problem social post: Put it down. Pick it up. Still on round 3.',
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

function ProjectTile({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
    return () => clearTimeout(t);
  }, [open]);

  const text = p.dark ? 'text-white' : 'text-[#181818]';
  const soft = p.dark ? 'text-white/70' : 'text-[#181818]/75';

  return (
    <motion.article
      ref={ref}
      id={p.id}
      layout
      transition={spring}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) return;
        onToggle();
      }}
      className={`group relative cursor-pointer overflow-hidden p-5 md:p-7 flex flex-col ${text} ${
        open ? 'col-span-2 md:col-span-3' : p.span
      }`}
      style={{ background: p.bg }}
    >
      <motion.div layout="position" transition={spring}>
        <div className="pr-12">
          <For dark={p.dark}>{p.madeFor}</For>
        </div>
        <button
          type="button"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="mt-4 block w-full text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <span className="block font-black uppercase leading-[0.9] tracking-[-0.01em] text-[34px] md:text-[clamp(26px,2.3vw,42px)]">
            {p.title}
          </span>
          <span className={`mt-3 block text-[16px] leading-snug max-w-[36ch] ${soft}`}>{p.summary}</span>
        </button>
      </motion.div>

      {!open && p.image && (
        <motion.div layout="position" transition={spring} className="mt-5 flex-1 flex items-end">
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            className={`w-full transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-[-1deg] ${
              p.image.className ?? ''
            }`}
          />
        </motion.div>
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          className="mt-6 grid md:grid-cols-2 gap-8 items-start"
        >
          <div className="space-y-6">
            <p className={`text-[19px] leading-relaxed ${soft}`}>{p.story}</p>
            {p.link && <Visit dark={p.dark} href={p.link.href} label={p.link.label} />}
          </div>
          {p.image && <img src={p.image.src} alt={p.image.alt} className="w-full md:max-w-md md:justify-self-end" />}
        </motion.div>
      )}

      <motion.span
        layout="position"
        transition={spring}
        aria-hidden
        className={`absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:rotate-90 ${
          p.dark ? 'bg-white text-[#181818]' : 'bg-[#181818] text-white'
        }`}
      >
        {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </motion.span>
    </motion.article>
  );
}

function ShapeTile({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div layout transition={spring} className={`relative aspect-square md:aspect-auto ${className}`} aria-hidden>
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
      <div className={`mt-3 text-[16px] leading-snug ${dark ? 'text-white/70' : 'text-[#181818]/75'}`}>{children}</div>
      {href && (
        <span className={`absolute top-5 right-5 w-9 h-9 rounded-full flex ${dark ? 'bg-white text-[#181818]' : 'bg-[#181818] text-white'} items-center justify-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}>
          <ArrowUpRight className="w-4 h-4" aria-hidden />
        </span>
      )}
    </>
  );
  const cls = `group relative block p-5 md:p-7 ${dark ? 'text-white' : ''}`;
  return (
    <motion.div layout transition={spring} className={className.split(/\s+/).filter((c) => /(^|:)(col|row)-/.test(c)).join(' ')}>
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
    return <ProjectTile key={id} p={p} open={openId === id} onToggle={() => setOpenId(openId === id ? null : id)} />;
  };

  return (
    <LayoutGroup>
      <section
        aria-label="Things I've made"
        className="grid grid-cols-2 md:grid-cols-3 grid-flow-row-dense md:auto-rows-[minmax(21vw,auto)]"
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
          bg={C.black}
          dark
          madeFor="For anyone curious"
          title="My latest work"
          href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
          className="col-span-2 md:col-span-1"
        >
          I post what I&rsquo;m working on as I go. LinkedIn is the place to see it.
        </InfoTile>
      </section>
    </LayoutGroup>
  );
}
