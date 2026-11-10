import { lazy, Suspense, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
/* The Graphy SDK only loads on the page that uses it */
const LiveCharts = lazy(() => import('../components/LiveCharts'));
const LiveEdit = lazy(() => import('../components/LiveEdit'));
import { caseStudies, type Block, type CaseStudy as Study, type Img } from '../content/caseStudies';

/*
 * The case study, built on the home page's frame: the project pinned on the
 * left in its own colour, and the story on the right as a grid of flat
 * blocks with white gutters. Text blocks are warm grey, pictures sit in the
 * project colour with the ink stroke, same as the home grid.
 */

const prose =
  'space-y-4 text-[17px] md:text-[18px] leading-[1.65] text-[var(--ink-soft)] [&_em]:text-[var(--ink)] [&_strong]:text-[var(--ink)]';

/* Long-form column on the right: one reading measure, pictures a little wider */
const measure = '';

function Picture({ img, bg }: { img: Img; bg: string }) {
  /* A picture that's already a coloured card stands alone; anything else gets the ink stroke on the project colour */
  if (img.bg)
    return <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="w-full h-auto block" />;
  return (
    <div className="p-2.5 sm:p-4 md:p-6 h-full flex items-center" style={{ background: bg }}>
      <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" className="w-full h-auto border-[3px] border-[var(--ink)]" />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="chunky-tag self-start">{children}</span>;
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className={`${measure} mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]`}>{children}</p>;
}

function Blocks({ block, bg, id, tight }: { block: Block; bg: string; id?: string; tight?: boolean }) {
  switch (block.type) {
    case 'chapter':
      return (
        <section id={id} className={`${measure} scroll-mt-10 pt-12 md:pt-20 first:pt-0`}>
          <span className="chunky-tag" style={{ background: bg }}>{block.label}</span>
          <h2 className="mt-4 font-display text-[30px] md:text-[40px] leading-[1.08] text-balance">{block.heading}</h2>
          {block.body && <div className={`${prose} mt-5`}>{block.body}</div>}
        </section>
      );
    case 'text':
      return (
        <section className={`${measure} ${block.heading ? 'pt-4 md:pt-6' : ''}`}>
          {block.heading && (
            <h3 className="font-display text-[23px] md:text-[26px] leading-[1.15] text-balance mb-3">{block.heading}</h3>
          )}
          <div className={prose}>{block.body}</div>
        </section>
      );
    case 'figure':
      return (
        /* A picture straight after another picture sits close, so they read as one set */
        <figure className={tight ? '!mt-4' : ''}>
          {/* One or two pictures: columns sized so a pair comes out the same height. More: a two-up grid, so none get tiny */}
          <div
            className={`grid gap-2.5 md:gap-3 ${
              block.images.length > 3
                ? 'grid-cols-2'
                : block.images.every((i) => i.h > i.w)
                  ? /* tall phone screens stay side by side on phones too, so they don't fill the screen */
                    '[grid-template-columns:var(--cols)]'
                  : 'md:[grid-template-columns:var(--cols)]'
            }`}
            style={{ '--cols': block.images.map((i) => `${i.w / i.h}fr`).join(' ') } as React.CSSProperties}
          >
            {block.images.map((img) => (
              <Picture key={img.src} img={img} bg={bg} />
            ))}
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    case 'hmw':
      return (
        <ol className={`${measure} space-y-4`}>
          {block.items.map((q) => (
            <li key={q} className="font-display text-[22px] md:text-[25px] leading-[1.25]">
              <span className="text-[var(--ink)]/45">How might we </span>
              {q}
            </li>
          ))}
        </ol>
      );
    case 'pivot':
      return (
        <div className={`${measure} grid sm:grid-cols-2 gap-6 sm:gap-8`}>
          <div>
            <Label>{block.before.label}</Label>
            <p className="mt-3 font-display text-[21px] leading-[1.2] line-through decoration-2 decoration-[var(--ink)]/40 text-[var(--ink)]/60">
              {block.before.title}
            </p>
            <p className="mt-2 text-[16px] leading-[1.6] text-[var(--ink-soft)]">{block.before.body}</p>
          </div>
          <div>
            <span className="chunky-tag" style={{ background: bg }}>{block.after.label}</span>
            <p className="mt-3 font-display text-[21px] leading-[1.2]">{block.after.title}</p>
            <p className="mt-2 text-[16px] leading-[1.6] text-[var(--ink-soft)]">{block.after.body}</p>
          </div>
        </div>
      );
    case 'quote':
      return (
        <blockquote className={`${measure} font-display text-[30px] md:text-[42px] leading-[1.1] text-balance`}>
          <span className="px-1 box-decoration-clone" style={{ background: bg }}>&ldquo;{block.text}&rdquo;</span>
        </blockquote>
      );
    case 'stats':
      return <Stats items={block.items} bg={bg} />;
    case 'liveEdit':
      return (
        <figure>
          <div className="p-5 md:p-8" style={{ background: bg }}>
            <Suspense fallback={<div className="h-[460px]" />}>
              <LiveEdit />
            </Suspense>
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    case 'liveCharts':
      return (
        <figure>
          <div className="p-5 md:p-8" style={{ background: bg }}>
            <Suspense fallback={<div className="h-[440px]" />}>
              <LiveCharts />
            </Suspense>
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    default:
      return null;
  }
}

/* Stats as a 2x2 of flat blocks in the project colour, so big numbers always have room */
function Stats({ items, bg }: { items: { value: string; label: string }[]; bg: string }) {
  return (
    <dl className="grid grid-cols-2 gap-2.5 md:gap-3">
      {items.map((st) => (
        <div key={st.label} className="p-5 md:p-7" style={{ background: bg }}>
          <dt className="sr-only">{st.label}</dt>
          <dd>
            <span className="block font-display text-[34px] sm:text-[40px] md:text-[52px] leading-none tabular-nums">{st.value}</span>
            <span className="mt-2 block text-[15px] md:text-[16px] font-medium leading-snug">{st.label}</span>
          </dd>
        </div>
      ))}
    </dl>
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
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* The project as one card at the top, like a block from the home grid. Scroll past it to read */}
      <header className="p-2.5 md:p-3">
        <div className="px-5 py-8 md:py-14" style={{ background: study.bg }}>
          <div className="mx-auto max-w-[720px] flex flex-col gap-7">
            <Link to="/" className="self-start inline-flex items-center gap-1.5 text-[15px] font-bold hover:underline underline-offset-4">
              <ArrowLeft className="w-4 h-4" aria-hidden /> Rachael Grocott
            </Link>
            <div>
              <h1 className=" font-display leading-[1.02] text-[40px] md:text-[60px]">{study.title}</h1>
              <p className="mt-4 text-[18px] md:text-[20px] leading-[1.5] font-medium">{study.intro}</p>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t-[2px] border-[var(--ink)] pt-4">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[14px] text-[var(--ink)]/70">{f.label}</dt>
                  <dd className="mt-0.5 text-[15px] font-bold leading-snug">{f.value}</dd>
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
      </header>

      <main className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-8 md:space-y-10">
          {tldr && study.tldr ? (
            <>
              <dl className={`${measure} space-y-8`}>
                {study.tldr.points.map((p) => (
                  <div key={p.label}>
                    <dt><span className="chunky-tag" style={{ background: study.bg }}>{p.label}</span></dt>
                    <dd className="mt-3 text-[19px] leading-[1.55]">{p.body}</dd>
                  </div>
                ))}
              </dl>
              {study.tldr.stats && <Stats items={study.tldr.stats} bg={study.bg} />}
              <button type="button" className="chunky" onClick={() => { setTldr(false); window.scrollTo({ top: 0 }); }}>
                Read the full story <ArrowRight className="w-4 h-4" aria-hidden />
              </button>
            </>
          ) : (
            <>
              {study.blocks.map((b, i) => (
                <Blocks key={i} block={b} bg={study.bg} id={ids[i]} tight={b.type === 'figure' && study.blocks[i - 1]?.type === 'figure'} />
              ))}
            </>
          )}

        </div>
      </main>

      {/* Next project: a full-width card in its own colour, like the one at the top */}
      <div className="p-2.5 md:p-3 pt-0 md:pt-0">
        <Link to={`/work/${next.id}`} className="group block px-5 py-8 md:py-12" style={{ background: next.bg }}>
          <div className="mx-auto max-w-[720px] flex items-center justify-between gap-6">
            <div>
              <Label>Next case study</Label>
              <p className="mt-3 font-display text-[26px] md:text-[32px] leading-none">{next.title}</p>
              {next.teaser && <p className="mt-2 text-[16px] md:text-[17px] leading-snug">{next.teaser}</p>}
            </div>
            <span className="chunky-icon shrink-0 transition-transform group-hover:translate-x-1" aria-hidden>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
