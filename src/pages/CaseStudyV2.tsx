import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { caseStudies, type Block, type CaseStudy as Study, type Img } from '../content/caseStudies';

/*
 * The case study template, v2.
 * - A colour block header: the story on the left, real screens on the right.
 * - A TL;DR switch, for whoever is reading fifty portfolios today.
 * - Numbered chapters with a big outlined number and a rule, and a sticky
 *   chapter list on wide screens.
 * - Pictures sit in full-width bands of the project colour.
 */

const text = 'mx-auto w-full max-w-[680px]';
const wide = 'mx-auto w-full max-w-[1080px]';
const prose =
  'space-y-4 text-[17px] md:text-[18px] leading-[1.65] text-[var(--ink-soft)] [&_em]:text-[var(--ink)] [&_strong]:text-[var(--ink)]';

const tint = (bg: string, pct: number) => `color-mix(in srgb, ${bg} ${pct}%, white)`;

function Framed({ img, className = '' }: { img: Img; className?: string }) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading="lazy"
      className={`w-full h-auto border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] ${className}`}
    />
  );
}

/* Images side by side at one shared height: each column is as wide as its picture's shape */
function Row({ images }: { images: Img[] }) {
  return (
    <div
      className="grid gap-5 md:gap-7 md:[grid-template-columns:var(--cols)]"
      style={{ '--cols': images.map((i) => `${i.w / i.h}fr`).join(' ') } as React.CSSProperties}
    >
      {images.map((img) => (
        <Framed key={img.src} img={img} />
      ))}
    </div>
  );
}

type Chapter = { n: number; id: string; label: string };

function ChapterOpener({ ch, heading, body, bg }: { ch: Chapter; heading: string; body?: React.ReactNode; bg: string }) {
  return (
    <section id={ch.id} className="scroll-mt-8">
      <div className={`${wide} flex items-center gap-4 md:gap-6`}>
        <span
          aria-hidden
          className="font-display leading-none text-[72px] md:text-[104px] tabular-nums"
          style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--ink)' }}
        >
          {String(ch.n).padStart(2, '0')}
        </span>
        <span className="chunky-tag shrink-0" style={{ background: bg }}>
          <span className="sr-only">Chapter {ch.n}: </span>
          {ch.label}
        </span>
        <span aria-hidden className="h-[2px] flex-1 bg-[var(--ink)]/15" />
      </div>
      <div className={`${text} mt-6 md:mt-8`}>
        <h2 className="font-display text-[30px] md:text-[42px] leading-[1.08] text-balance">{heading}</h2>
        {body && <div className={`${prose} mt-6`}>{body}</div>}
      </div>
    </section>
  );
}

function BlockView({ block, bg, chapter, joined }: { block: Block; bg: string; chapter?: Chapter; joined?: boolean }) {
  switch (block.type) {
    case 'chapter':
      return <ChapterOpener ch={chapter!} heading={block.heading} body={block.body} bg={bg} />;
    case 'text':
      return (
        <section className={text}>
          {block.heading && (
            <h3 className="font-display text-[24px] md:text-[28px] leading-[1.15] text-balance mb-5">{block.heading}</h3>
          )}
          <div className={prose}>{block.body}</div>
        </section>
      );
    case 'figure':
      /* A full-width band of the project colour, with the pictures framed inside */
      return (
        <figure
          className={`-mx-5 md:-mx-8 px-5 md:px-8 py-10 md:py-16 ${joined ? '-mt-16 md:-mt-24 pt-0 md:pt-0' : ''}`}
          style={{ background: bg }}
        >
          <div className={wide}>
            <Row images={block.images} />
            {block.caption && (
              <figcaption className="mt-6 max-w-[680px] text-[15px] leading-relaxed font-medium text-[var(--ink)]">
                {block.caption}
              </figcaption>
            )}
          </div>
        </figure>
      );
    case 'hmw':
      return (
        <section className={text}>
          <ol className="space-y-3">
            {block.items.map((q, i) => (
              <li key={q} className="p-5 md:p-6 border-l-[6px] border-[var(--ink)]" style={{ background: tint(bg, 45) }}>
                <span className="block text-[13px] font-bold text-[var(--ink-soft)]">How might we… {i + 1}</span>
                <span className="mt-1 block font-display text-[21px] md:text-[24px] leading-[1.25]">{q}</span>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'pivot':
      return (
        <section className={wide}>
          <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
            <div className="p-6 md:p-8 bg-white border-[3px] border-dashed border-[var(--ink)]/30">
              <p className="text-[13px] font-bold text-[var(--ink-soft)]">{block.before.label}</p>
              <p className="mt-2 font-display text-[22px] md:text-[26px] leading-[1.2] text-[var(--ink)]/55">
                {block.before.title}
              </p>
              <p className="mt-3 text-[16px] leading-[1.6] text-[var(--ink-soft)]">{block.before.body}</p>
            </div>
            <div className="flex items-center justify-center" aria-hidden>
              <span className="chunky-icon rotate-90 md:rotate-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="p-6 md:p-8 border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)]" style={{ background: tint(bg, 60) }}>
              <p className="text-[13px] font-bold text-[var(--ink)]/70">{block.after.label}</p>
              <p className="mt-2 font-display text-[22px] md:text-[26px] leading-[1.2]">{block.after.title}</p>
              <p className="mt-3 text-[16px] leading-[1.6] text-[var(--ink)]/80">{block.after.body}</p>
            </div>
          </div>
        </section>
      );
    case 'quote':
      return (
        <blockquote className={`${text} border-l-[6px] pl-6 md:pl-8`} style={{ borderColor: bg }}>
          <p className="text-[28px] md:text-[40px] font-display leading-[1.12] text-balance">&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case 'stats':
      return <Stats items={block.items} bg={bg} />;
    case 'gallery':
      return (
        <figure className="-mx-5 md:-mx-8 px-5 md:px-8 py-10 md:py-16" style={{ background: tint(bg, 45) }}>
          <div className={wide}>
            {block.heading && <h3 className="font-display text-[24px] md:text-[28px] leading-[1.15] mb-2">{block.heading}</h3>}
            {block.body && <p className="text-[16px] text-[var(--ink-soft)] mb-8 max-w-[680px]">{block.body}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {block.images.map((g) => (
                <Framed key={g.src} img={g} />
              ))}
            </div>
          </div>
        </figure>
      );
    default:
      return null;
  }
}

function Stats({ items, bg }: { items: { value: string; label: string }[]; bg: string }) {
  return (
    <section className={wide}>
      <dl className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-[var(--ink)] shadow-[5px_5px_0_var(--ink)]" style={{ background: bg }}>
        {items.map((st, i) => (
          <div
            key={st.label}
            className={`p-5 md:p-7 ${i % 2 ? 'border-l-[3px]' : ''} ${i > 1 ? 'border-t-[3px] md:border-t-0' : ''} ${i === 2 ? 'md:border-l-[3px]' : ''} border-[var(--ink)]`}
          >
            <dt className="sr-only">{st.label}</dt>
            <dd>
              <span className="block font-display text-[44px] md:text-[56px] leading-none tabular-nums">{st.value}</span>
              <span className="mt-2 block text-[15px] font-bold leading-snug">{st.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* Chapter list on wide screens, with the chapter you're reading picked out */
function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);
  return (
    <nav aria-label="Chapters" className="hidden 2xl:block fixed left-8 top-1/2 -translate-y-1/2 z-10">
      <ol className="space-y-1.5">
        {chapters.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={`flex items-baseline gap-2 text-[13px] font-bold transition-opacity ${
                active === c.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <span className="tabular-nums w-5">{String(c.n).padStart(2, '0')}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Toggle({ tldr, setTldr }: { tldr: boolean; setTldr: (v: boolean) => void }) {
  const btn = (on: boolean) =>
    `px-4 py-2 text-[14px] font-bold transition-colors ${on ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-white text-[var(--ink)] hover:bg-[var(--ink)]/5'}`;
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

  /* Number the chapters in the order they appear */
  const chapters = useMemo(() => {
    let n = 0;
    return study.blocks.map((b) => (b.type === 'chapter' ? { n: ++n, id: `ch-${n}`, label: b.label } : null));
  }, [study]);
  const chapterList = chapters.filter(Boolean) as Chapter[];

  const next = useMemo(() => {
    const i = caseStudies.findIndex((c) => c.id === study.id);
    return caseStudies[(i + 1) % caseStudies.length];
  }, [study]);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Colour block header */}
      <header style={{ background: study.bg }}>
        <nav className="px-5 md:px-8 py-6">
          <div className="mx-auto max-w-[1240px]">
            <Link to="/" className="font-display text-[20px] hover:underline underline-offset-4" aria-label="Rachael Grocott, back to all work">
              Rachael Grocott
            </Link>
          </div>
        </nav>
        <div className="px-5 md:px-8 pt-4 md:pt-8 pb-12 md:pb-16">
          <div className="mx-auto max-w-[1240px] grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="chunky-tag">{study.madeFor}</span>
              <h1 className="mt-4 font-display leading-[1.02] text-[44px] md:text-[64px]">{study.title}</h1>
              <p className="mt-5 text-[19px] md:text-[21px] leading-[1.45] font-medium text-pretty">{study.intro}</p>
              <dl className="mt-8 border-t-[2px] border-[var(--ink)]">
                {study.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 border-b border-[var(--ink)]/20">
                    <dt className="text-[15px] text-[var(--ink)]/70">{f.label}</dt>
                    <dd className="text-[15px] font-bold">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {study.link && (
                <a href={study.link.href} target="_blank" rel="noopener noreferrer" className="chunky mt-8">
                  {study.link.label} <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              )}
            </div>
            {study.hero && (
              /* One row, equal heights, edges lined up with the column */
              <Row images={study.hero} />
            )}
          </div>
        </div>
      </header>

      <div className="px-5 md:px-8 pt-10 flex justify-center">
        <Toggle tldr={tldr} setTldr={setTldr} />
      </div>

      {tldr && study.tldr ? (
        <article className="px-5 md:px-8 pt-10 pb-20 space-y-12">
          <section className={text}>
            <dl className="divide-y-[2px] divide-[var(--ink)]/10 border-y-[2px] border-[var(--ink)]/10">
              {study.tldr.points.map((p) => (
                <div key={p.label} className="py-6 grid md:grid-cols-[9rem_1fr] gap-2 md:gap-6">
                  <dt className="font-display text-[20px]">{p.label}</dt>
                  <dd className="text-[18px] leading-[1.55] text-[var(--ink-soft)]">{p.body}</dd>
                </div>
              ))}
            </dl>
          </section>
          {study.tldr.stats && <Stats items={study.tldr.stats} bg={study.bg} />}
          <div className="flex justify-center">
            <button type="button" className="chunky" onClick={() => { setTldr(false); window.scrollTo({ top: 0 }); }}>
              Read the full story <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </article>
      ) : (
        <article className="px-5 md:px-8 pt-14 md:pt-20 pb-20 space-y-16 md:space-y-24">
          <ChapterNav chapters={chapterList} />
          {study.blocks.map((b, i) => (
            <BlockView
              key={i}
              block={b}
              bg={study.bg}
              chapter={chapters[i] ?? undefined}
              joined={b.type === 'figure' && study.blocks[i - 1]?.type === 'figure'}
            />
          ))}
        </article>
      )}

      {/* Next project, in its own colour */}
      <Link to={`/work/${next.id}`} className="group block px-5 md:px-8 py-12 md:py-16" style={{ background: next.bg }}>
        <div className={`${wide} flex items-center justify-between gap-6`}>
          <div>
            <p className="text-[14px] font-bold">Next case study</p>
            <p className="mt-1 font-display text-[36px] md:text-[56px] leading-none">{next.title}</p>
          </div>
          <span className="chunky-icon transition-transform group-hover:translate-x-1" aria-hidden>
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </Link>
      <footer className="px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="chunky">
          <ArrowLeft className="w-4 h-4" aria-hidden /> All work
        </Link>
        <a href="mailto:rachaelgrocott@gmail.com" className="chunky">
          Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
        </a>
      </footer>
    </div>
  );
}
