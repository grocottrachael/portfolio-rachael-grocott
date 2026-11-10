import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUpRight, Plus, X } from 'lucide-react';

const card = 'group relative rounded-xl overflow-hidden';
const linkCard = `${card} transition-shadow hover:shadow-lg cursor-pointer`;
const contact =
  'col-span-2 bg-neutral-100 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 transition-colors';

const spring = { type: 'spring', stiffness: 380, damping: 36 } as const;

function Arrow() {
  return (
    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight className="w-3 h-3 text-neutral-700" />
    </div>
  );
}

function External(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`px-2 py-0.5 rounded-full text-[11px] ${
        dark ? 'bg-white/10 text-white/70' : 'bg-white/80 text-neutral-600'
      }`}
    >
      {children}
    </div>
  );
}

function VisitLink({ href, label, dark }: { href: string; label: string; dark?: boolean }) {
  return (
    <External
      href={href}
      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        dark ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-700'
      }`}
    >
      {label} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
    </External>
  );
}

type TileProps = {
  id: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  /** Grid placement and colours when closed, e.g. "md:col-span-2 bg-…" */
  className: string;
  dark?: boolean;
  title: string;
  tag?: string;
  summary: React.ReactNode;
  /** Shown under the summary when closed (images etc.) */
  preview?: React.ReactNode;
  /** Shown when open */
  details: React.ReactNode;
};

/*
 * A card that opens up in place: it takes the full width of the grid and
 * the other cards move out of the way. Each open card has its own URL hash
 * (#swatchmaker etc.) so it can be shared.
 */
function Tile({ id, openId, setOpenId, className, dark, title, tag, summary, preview, details }: TileProps) {
  const open = openId === id;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // Wait for the layout animation to settle before bringing the card into view.
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
    return () => clearTimeout(t);
  }, [open]);

  const toggle = () => setOpenId(open ? null : id);

  return (
    <motion.div
      ref={ref}
      id={id}
      layout
      transition={spring}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) return;
        toggle();
      }}
      className={`${linkCard} col-span-6 ${open ? 'md:col-span-6 md:row-span-1' : className} ${
        dark ? 'text-white' : 'text-neutral-900'
      } ${className.match(/bg-\S+/g)?.join(' ') ?? ''} ${className.match(/from-\S+|to-\S+/g)?.join(' ') ?? ''} p-4 flex flex-col`}
      style={{ borderRadius: 12 }}
    >
      <motion.div layout="position" transition={spring}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-details`}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="w-full text-left rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4EA6]"
        >
          <span className="flex items-center gap-2 mb-1 pr-8">
            <span className="text-[15px] tracking-tight font-medium">{title}</span>
            {tag && <Tag dark={dark}>{tag}</Tag>}
          </span>
          <span className={`block text-[14px] ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{summary}</span>
        </button>
      </motion.div>

      {!open && preview && (
        <motion.div layout="position" transition={spring} className="mt-3">
          {preview}
        </motion.div>
      )}

      {open && (
        <motion.div
          id={`${id}-details`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          className={`mt-4 space-y-4 text-[15px] leading-relaxed ${dark ? 'text-white/80' : 'text-neutral-700'}`}
        >
          {details}
        </motion.div>
      )}

      <motion.span
        layout="position"
        transition={spring}
        aria-hidden
        className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } ${dark ? 'bg-white/15 text-white' : 'bg-white/80 text-neutral-700'}`}
      >
        {open ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
      </motion.span>
    </motion.div>
  );
}

function readHash() {
  const h = window.location.hash.slice(1);
  return h || null;
}

export function BentoGrid() {
  const [openId, setOpenIdState] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : readHash(),
  );

  const setOpenId = (id: string | null) => {
    setOpenIdState(id);
    const url = id ? `#${id}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, '', url);
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

  const tile = { openId, setOpenId };

  return (
    <div className="w-full">
      <LayoutGroup>
        <div className="grid grid-cols-6 gap-3">
          <Tile
            {...tile}
            id="swatchmaker"
            className="md:col-span-4 md:row-span-2 bg-neutral-100"
            title="SWATCHMAKER"
            tag="Featured"
            summary="A passion project for people to see paint colours from all brands side by side."
            preview={
              <img
                src="/swatchmaker.webp"
                alt="SWATCHMAKER: a bathroom photo next to the paint colours La Torre, Follingsby and Pale Taupe"
                width={1200}
                height={657}
                className="w-full rounded-lg shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5"
              />
            }
            details={
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <p className="max-w-[60ch]">
                    Picking paint means juggling tester pots from a dozen brands. SWATCHMAKER puts colours from Farrow
                    &amp; Ball, Little Greene, COAT, Lick, Paint &amp; Paper Library, Dulux and more side by side, so
                    you can build a palette before you buy a thing. I designed and built it, and the palette posts for
                    its socials are made by code too.
                  </p>
                  <VisitLink href="https://swatchmaker.uk/" label="Visit swatchmaker.uk" />
                </div>
                <img
                  src="/swatchmaker.webp"
                  alt="SWATCHMAKER: a bathroom photo next to the paint colours La Torre, Follingsby and Pale Taupe"
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
            }
          />

          <Tile
            {...tile}
            id="graphy"
            dark
            className="md:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-800"
            title="Graphy SDK"
            summary={
              <>
                Beautiful, editable charts for developers and their AI agents. I also own the design of graphy.dev.
                <span className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[12px] text-neutral-300">Working on this now</span>
                </span>
              </>
            }
            details={
              <>
                <p className="max-w-[60ch]">
                  Graphy turns data into clear, beautiful stories. I&rsquo;m a Senior Product Designer on the SDK,
                  which lets developers and their AI agents put editable charts into their own products. I design the
                  developer experience, and I own the design of graphy.dev.
                </p>
                <div className="flex flex-wrap gap-2">
                  <VisitLink dark href="https://graphy.dev/" label="Visit graphy.dev" />
                  <External
                    href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
                    className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Latest Graphy work on LinkedIn <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </External>
                </div>
              </>
            }
          />

          <Tile
            {...tile}
            id="dotties"
            dark
            className="md:col-span-2 bg-[#0A0A0A]"
            title="Dotties"
            tag="Made for work"
            summary="I built this to help me at work. Turn any image into halftone dots, dithering or ASCII art."
            preview={
              <img
                src="/dotties.webp"
                alt="A halftone image made with Dotties: concentric rings of white dots on black"
                width={600}
                height={600}
                loading="lazy"
                className="w-full aspect-[16/9] object-cover rounded-md transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
              />
            }
            details={
              <>
                <p className="max-w-[60ch]">
                  Upload an image and turn it into halftone dots, ordered dithering or ASCII. Choose circle or square
                  dots, tune the size, spacing and contrast, pick your colours, then export a PNG or SVG.
                </p>
                <VisitLink dark href="https://dotties.app/" label="Visit dotties.app" />
              </>
            }
          />

          <Tile
            {...tile}
            id="knot-a-problem"
            className="md:col-span-2 md:row-span-2 bg-[#F3C5CD]"
            title="Knot a Problem"
            summary="Never get stuck reading a crochet pattern again."
            preview={
              <img
                src="/knot-a-problem.webp"
                alt="Knot a Problem social post: Put it down. Pick it up. Still on round 3. A granny square diagram that keeps your place."
                width={640}
                height={800}
                loading="lazy"
                className="w-full rounded-md"
              />
            }
            details={
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <p className="max-w-[60ch]">
                    It started with my granny, who has crocheted for sixty years and couldn&rsquo;t remember what a
                    pattern meant. Open the PDF the designer sent you, tap the row that has lost you, and get it back in
                    plain words or drawn as a diagram. It keeps your place, knows UK from US terms, and does the sums
                    when you change size or yarn. Accessibility is the spec, not a nice-to-have.
                  </p>
                  <VisitLink href="https://knotaproblem.app/" label="Visit knotaproblem.app" />
                </div>
                <img
                  src="/knot-a-problem.webp"
                  alt="Knot a Problem social post: Put it down. Pick it up. Still on round 3."
                  className="w-full max-w-sm md:justify-self-end rounded-md"
                />
              </div>
            }
          />

          <Tile
            {...tile}
            id="crumbs"
            className="md:col-span-4 bg-[#D4EAE2] md:min-h-[160px]"
            title="Crumbs"
            tag="Just for us"
            summary="A no-faff calorie diary for our household. Snap your plate and it works it out."
            details={
              <p className="max-w-[60ch]">
                Snap your plate, a receipt or a nutrition label and Claude works it out, or scan a barcode. Everyone
                gets their own diary, while the fridge, the shopping and saved meals are shared. It asks a quick
                follow-up only when the answer changes the total, like whether there was oil in the pan. It&rsquo;s
                self-hosted for our house, so there&rsquo;s nothing to visit.
              </p>
            }
          />

          <Tile
            {...tile}
            id="triangirls"
            className="md:col-span-2 bg-neutral-50"
            title="Triangirls"
            tag="Founder"
            summary="Founded and ran a 2000+ member strong community for women in tech, for years."
            details={
              <>
                <p className="max-w-[60ch]">
                  I founded Triangirls and ran it for years, growing it into a community of more than 2,000 women in
                  tech.
                </p>
                <VisitLink href="https://x.com/triangirlsocial" label="Triangirls on X" />
              </>
            }
          />

          {/* Talks */}
          <motion.div layout transition={spring} className={`${card} col-span-6 md:col-span-2 bg-neutral-50 p-4`}>
            <h4 className="text-[15px] tracking-tight mb-1 font-medium">Talks & workshops</h4>
            <p className="text-[14px] text-neutral-600">
              I{'’'}ve spoken at loads of events, and I run sessions like{' '}
              <em>How to give and receive feedback</em>.
            </p>
          </motion.div>

          {/* Latest work lives on LinkedIn */}
          <motion.div layout transition={spring} className="col-span-6 md:col-span-4">
            <External
              href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
              className={`${linkCard} block h-full bg-[#FFE3F1] p-4`}
            >
              <h4 className="text-[15px] tracking-tight mb-1 font-medium">My latest work</h4>
              <p className="text-[14px] text-neutral-700">
                I post what I{'’'}m working on as I go. LinkedIn is the place to see it.
              </p>
              <Arrow />
            </External>
          </motion.div>

          {/* Press */}
          <motion.div layout transition={spring} className={`${card} col-span-6 md:col-span-2 bg-neutral-50 p-4`}>
            <h4 className="text-[15px] tracking-tight mb-1 font-medium">Press</h4>
            <p className="text-[14px] text-neutral-600">
              Interviewed by VICE. Featured in Samsung{'’'}s Not a School.
            </p>
          </motion.div>

          {/* Contact: kept together in one row */}
          <motion.div layout transition={spring} className="col-span-6 grid grid-cols-6 gap-3">
          <a href="mailto:rachaelgrocott@gmail.com" className={contact}>
            <Mail className="w-4 h-4 text-neutral-700" />
            <span className="text-[15px] font-medium text-neutral-600">Email</span>
          </a>
          <a
            href="https://github.com/grocottrachael"
            target="_blank"
            rel="noopener noreferrer"
            className={contact}
          >
            <Github className="w-4 h-4 text-neutral-700" />
            <span className="text-[15px] font-medium text-neutral-600">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rachaelgrocott/"
            target="_blank"
            rel="noopener noreferrer"
            className={contact}
          >
            <Linkedin className="w-4 h-4 text-neutral-700" />
            <span className="text-[15px] font-medium text-neutral-600">LinkedIn</span>
          </a>
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
}
