import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { caseStudies, type Block, type CaseStudy as Study, type Img } from '../content/caseStudies';

/*
 * The case study, built on the home page's frame: the project pinned on the
 * left in its own colour, and the story on the right as a grid of flat
 * blocks with white gutters. Text blocks are warm grey, pictures sit in the
 * project colour with the ink stroke, same as the home grid.
 */

const grey = 'var(--c-grey)';
const prose =
  'space-y-4 text-[17px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch] [&_em]:text-[var(--ink)] [&_strong]:text-[var(--ink)]';
const pad = 'p-6 md:p-10';

/* A block in the grid. `full` spans both columns */
function Tile({
  bg = grey,
  full = true,
  className = '',
  children,
  id,
}: {
  bg?: string;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`${full ? 'md:col-span-2' : ''} ${className}`} style={{ background: bg }}>
      {children}
    </section>
  );
}

function Picture({ img }: { img: Img }) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading="lazy"
      className="w-full h-auto border-[3px] border-[var(--ink)]"
    />
  );
}

/*
 * A picture as a block. When the picture is already a coloured card (it has
 * its own bg), it IS the block: no padding, no stroke, no box in a box.
 * Otherwise it sits in a block of the project colour with the ink stroke.
 */
function PictureTile({ img, bg, full }: { img: Img; bg: string; full: boolean }) {
  if (img.bg)
    return (
      <Tile bg={img.bg} full={full} className="flex items-center">
        <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="w-full h-auto" />
      </Tile>
    );
  return (
    <Tile bg={bg} full={full} className="p-6 md:p-10 flex items-center">
      <Picture img={img} />
    </Tile>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="chunky-tag self-start">{children}</span>;
}

function Blocks({ block, bg, id }: { block: Block; bg: string; id?: string }) {
  switch (block.type) {
    case 'chapter':
      return (
        <Tile id={id} className={`${pad} scroll-mt-3`}>
          <Label>{block.label}</Label>
          <h2 className="mt-4 font-display text-[30px] md:text-[40px] leading-[1.08] text-balance max-w-[22ch]">
            {block.heading}
          </h2>
          {block.body && <div className={`${prose} mt-5`}>{block.body}</div>}
        </Tile>
      );
    case 'text':
      return (
        <Tile className={pad}>
          {block.heading && (
            <h3 className="font-display text-[24px] md:text-[28px] leading-[1.15] text-balance mb-4">{block.heading}</h3>
          )}
          <div className={prose}>{block.body}</div>
        </Tile>
      );
    case 'figure':
      return (
        <>
          {block.images.map((img) => (
            <PictureTile key={img.src} img={img} bg={bg} full={block.images.length === 1} />
          ))}
          {block.caption && (
            <p className="md:col-span-2 -mt-0.5 mb-4 px-1 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-[70ch]">
              {block.caption}
            </p>
          )}
        </>
      );
    case 'hmw':
      return (
        <>
          {block.items.map((q) => (
            <Tile key={q} bg={bg} full={false} className="p-6 md:p-10 flex flex-col">
              <Label>How might we…</Label>
              <p className="mt-4 font-display text-[22px] md:text-[26px] leading-[1.2]">{q}</p>
            </Tile>
          ))}
        </>
      );
    case 'pivot':
      return (
        <>
          <Tile full={false} className="p-6 md:p-10">
            <Label>{block.before.label}</Label>
            <p className="mt-4 font-display text-[22px] md:text-[26px] leading-[1.2] line-through decoration-2 decoration-[var(--ink)]/40">
              {block.before.title}
            </p>
            <p className="mt-3 text-[16px] leading-[1.6] text-[var(--ink-soft)]">{block.before.body}</p>
          </Tile>
          <Tile bg={bg} full={false} className="p-6 md:p-10">
            <Label>{block.after.label}</Label>
            <p className="mt-4 font-display text-[22px] md:text-[26px] leading-[1.2]">{block.after.title}</p>
            <p className="mt-3 text-[16px] leading-[1.6] text-[var(--ink)]/80">{block.after.body}</p>
          </Tile>
        </>
      );
    case 'quote':
      return (
        <Tile bg={bg} className="p-6 md:p-10">
          <blockquote className="font-display text-[30px] md:text-[48px] leading-[1.08] text-balance max-w-[20ch]">
            &ldquo;{block.text}&rdquo;
          </blockquote>
        </Tile>
      );
    case 'stats':
      return <StatTiles items={block.items} bg={bg} />;
    default:
      return null;
  }
}

function StatTiles({ items, bg }: { items: { value: string; label: string }[]; bg: string }) {
  return (
    <>
      {items.map((st) => (
        <Tile key={st.label} bg={bg} full={false} className="p-6 md:p-10">
          <p className="font-display text-[52px] md:text-[64px] leading-none tabular-nums">{st.value}</p>
          <p className="mt-2 text-[16px] font-bold">{st.label}</p>
        </Tile>
      ))}
    </>
  );
}

function Toggle({ tldr, setTldr }: { tldr: boolean; setTldr: (v: boolean) => void }) {
  const btn = (on: boolean) =>
    `px-4 py-2 text-[14px] font-bold transition-colors ${
      on ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-white text-[var(--ink)] hover:bg-[var(--ink)]/5'
    }`;
  return (
    <div role="group" aria-label="How much to read" className="inline-flex border-[2px] border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
      <button type="button" aria-pressed={!tldr} onClick={() => setTldr(false)} className={btn(!tldr)}>
        Full story
      </button>
      <button type="button" aria-pressed={tldr} onClick={() => setTldr(true)} className={`${btn(tldr)} border-l-[2px] border-[var(--ink)]`}>
        TL;DR
      </button>
    </div>
  );
}

export function CaseStudyV2({ study }: { study: Study }) {
  const [tldr, setTldr] = useState(false);

  const ids = useMemo(() => {
    let n = 0;
    return study.blocks.map((b) => (b.type === 'chapter' ? `ch-${++n}` : undefined));
  }, [study]);

  const next = useMemo(() => {
    const i = caseStudies.findIndex((c) => c.id === study.id);
    return caseStudies[(i + 1) % caseStudies.length];
  }, [study]);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] md:flex">
      {/* The project, pinned on the left like the intro on the home page */}
      <aside className="md:w-[34%] md:flex-none md:sticky md:top-0 md:h-screen p-2.5 pb-0 md:p-3">
        <div className="h-full md:overflow-y-auto px-5 md:px-[3vw] py-8 md:py-[5vh] flex flex-col gap-6" style={{ background: study.bg }}>
          <Link to="/" className="self-start inline-flex items-center gap-1.5 text-[15px] font-bold hover:underline underline-offset-4">
            <ArrowLeft className="w-4 h-4" aria-hidden /> Rachael Grocott
          </Link>
          <div className="md:my-auto flex flex-col gap-6">
            <div>
              <Label>{study.madeFor}</Label>
              <h1 className="mt-4 font-display leading-[1.02] text-[40px] md:text-[clamp(34px,3.4vw,56px)]">{study.title}</h1>
              <p className="mt-4 text-[17px] md:text-[clamp(16px,1.15vw,19px)] leading-[1.5] font-medium">{study.intro}</p>
            </div>
            <dl className="border-t-[2px] border-[var(--ink)]">
              {study.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2 border-b border-[var(--ink)]/20">
                  <dt className="text-[14px] text-[var(--ink)]/70">{f.label}</dt>
                  <dd className="text-[14px] font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-3">
              {study.tldr && <Toggle tldr={tldr} setTldr={setTldr} />}
              {study.link && (
                <a href={study.link.href} target="_blank" rel="noopener noreferrer" className="chunky">
                  Visit <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* The story, as a grid of blocks */}
      <main className="md:flex-1 min-w-0">
        <div className="grid md:grid-cols-2 gap-2.5 p-2.5 md:gap-3 md:p-3 md:pl-0">
          {tldr && study.tldr ? (
            <>
              {study.tldr.points.map((p) => (
                <Tile key={p.label} full={false} className="p-6 md:p-10">
                  <Label>{p.label}</Label>
                  <p className="mt-4 text-[18px] leading-[1.55]">{p.body}</p>
                </Tile>
              ))}
              {study.tldr.stats && <StatTiles items={study.tldr.stats} bg={study.bg} />}
              {study.hero?.map((img) => (
                <PictureTile key={img.src} img={img} bg={study.bg} full={false} />
              ))}
              <Tile className="p-6 md:p-10 flex justify-center">
                <button type="button" className="chunky" onClick={() => { setTldr(false); window.scrollTo({ top: 0 }); }}>
                  Read the full story <ArrowRight className="w-4 h-4" aria-hidden />
                </button>
              </Tile>
            </>
          ) : (
            <>
              {study.hero?.map((img) => (
                <PictureTile key={img.src} img={img} bg={study.bg} full={false} />
              ))}
              {study.blocks.map((b, i) => (
                <Blocks key={i} block={b} bg={study.bg} id={ids[i]} />
              ))}
            </>
          )}

          {/* Next project, in its own colour */}
          <Link
            to={`/work/${next.id}`}
            className="group md:col-span-2 p-6 md:p-10 flex items-center justify-between gap-6"
            style={{ background: next.bg }}
          >
            <div>
              <Label>Next case study</Label>
              <p className="mt-4 font-display text-[34px] md:text-[48px] leading-none">{next.title}</p>
            </div>
            <span className="chunky-icon transition-transform group-hover:translate-x-1" aria-hidden>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Tile className="p-6 md:p-10 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-[22px]">Like what you see?</p>
            <a href="mailto:rachaelgrocott@gmail.com" className="chunky">
              Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
            </a>
          </Tile>
        </div>
      </main>
    </div>
  );
}
