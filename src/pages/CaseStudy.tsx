import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import type { Block, CaseStudy as Study } from '../content/caseStudies';

/*
 * Case study layout: one narrow reading column for text (about 65 characters
 * a line), with pictures allowed to run wider. A small type scale, used
 * consistently: eyebrow 12, body 18, headings 30, title up to 64.
 */

const text = 'mx-auto w-full max-w-[680px]';
const wide = 'mx-auto w-full max-w-[1080px]';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--ink-soft)]">{children}</p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[26px] md:text-[32px] font-display leading-[1.15] text-balance">
      {children}
    </h2>
  );
}

const prose =
  'mt-5 space-y-4 text-[17px] md:text-[18px] leading-[1.65] text-[var(--ink-soft)] [&_em]:text-[var(--ink)]';

function BlockView({ block, bg }: { block: Block; bg: string }) {
  switch (block.type) {
    case 'text':
      return (
        <section className={text}>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <Heading>{block.heading}</Heading>
          <div className={prose}>{block.body}</div>
        </section>
      );
    case 'figure':
      return (
        <figure className={wide}>
          {/* Columns sized by each image's shape, so a pair always comes out the same height */}
          <div
            className={`grid md:[grid-template-columns:var(--cols)] ${block.frame ? 'gap-4 md:gap-6 p-5 md:p-12' : 'gap-3'}`}
            style={
              {
                '--cols': block.images.map((i) => `${i.w / i.h}fr`).join(' '),
                background: block.frame ? bg : undefined,
              } as React.CSSProperties
            }
          >
            {block.images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                className={`w-full h-auto ${block.frame ? 'border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]' : ''}`}
              />
            ))}
          </div>
          {block.caption && (
            <figcaption className={`${text} mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)]`}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <blockquote className={`${text} border-l-4 pl-6 md:pl-8`} style={{ borderColor: 'var(--c-yellow)' }}>
          <p className="text-[26px] md:text-[36px] font-display leading-[1.15] text-balance">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );
    case 'stats':
      return (
        <section className={wide}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {block.items.map((st) => (
              <div key={st.label} className="p-6 md:p-7" style={{ background: 'var(--c-yellow)' }}>
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="block font-display text-[48px] md:text-[60px] leading-none tabular-nums">
                    {st.value}
                  </span>
                  <span className="mt-2 block text-[15px] font-bold leading-snug">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case 'shows':
      return (
        /* Same column as the facts above, but as tinted blocks so the two don't read as one table */
        <section className={text}>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {block.items.map((it) => (
              <li key={it.title} className="p-5" style={{ background: `color-mix(in srgb, ${bg} 45%, white)` }}>
                <span className="block text-[15px] font-black uppercase tracking-[0.02em]">{it.title}</span>
                <span className="mt-1.5 block text-[16px] leading-snug text-[var(--ink)]/75">{it.body}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    case 'decisions':
      return (
        <section className={text}>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <Heading>{block.heading}</Heading>
          <ol className="mt-6 divide-y divide-[var(--ink)]/10 border-y border-[var(--ink)]/10">
            {block.items.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-5">
                <span className="text-[14px] font-black leading-[1.6] tabular-nums text-[var(--ink-soft)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[18px] md:text-[19px] font-bold leading-snug tracking-[-0.01em]">{d.title}</h3>
                  <p className="mt-1.5 text-[16px] md:text-[17px] leading-[1.6] text-[var(--ink-soft)]">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'gallery':
      return (
        <section className={wide}>
          <div className={text}>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <Heading>{block.heading}</Heading>
            {block.body && <div className={prose}>{block.body}</div>}
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {block.images.map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="w-full" />
            ))}
          </div>
        </section>
      );
  }
}

export function CaseStudy({ study }: { study: Study }) {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <nav className="px-5 md:px-8 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="chunky"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden /> All work
        </Link>
        <Link to="/" className="font-black uppercase text-[14px] tracking-tight">
          Rachael Grocott
        </Link>
      </nav>

      <article className="px-5 md:px-8 pt-8 md:pt-14 pb-20 space-y-16 md:space-y-20">
        <header className={text}>
          <span
            className="chunky-tag"
            style={{ background: study.bg }}
          >
            {study.madeFor}
          </span>
          <h1 className="mt-4 font-display leading-[1.05] text-[36px] md:text-[48px]">
            {study.title}
          </h1>
          <p className="mt-5 text-[20px] md:text-[22px] leading-[1.45] font-medium text-[var(--ink-soft)] text-pretty">
            {study.intro}
          </p>
          <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 border-t border-[var(--ink)]/10 pt-5">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-soft)]">{f.label}</dt>
                <dd className="mt-1 text-[15px] font-bold leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
          {study.link && (
            <a
              href={study.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="chunky mt-8"
            >
              {study.link.label} <ArrowUpRight className="w-4 h-4" aria-hidden />
            </a>
          )}
        </header>

        {study.blocks.map((b, i) => (
          <BlockView key={i} block={b} bg={study.bg} />
        ))}

        <footer className={`${text} pt-8 border-t border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4`}>
          <Link
            to="/"
            className="chunky"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden /> All work
          </Link>
          <a
            href="mailto:rachaelgrocott@gmail.com"
            className="chunky"
          >
            Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
        </footer>
      </article>
    </div>
  );
}
