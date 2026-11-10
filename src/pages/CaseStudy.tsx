import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { CaseStudy as Study, extraSections } from '../content/caseStudies';

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10 py-10 md:py-14 border-t border-[var(--ink)]/10">
      <h2 className="font-black uppercase text-[22px] md:text-[26px] leading-[0.95] tracking-[-0.01em]">{heading}</h2>
      <div className="space-y-5 text-[18px] md:text-[20px] leading-relaxed text-[var(--ink-soft)] max-w-[60ch]">
        {children}
      </div>
    </section>
  );
}

export function CaseStudy({ study }: { study: Study }) {
  const extra = extraSections[study.id] ?? [];
  const [problem, ...restSections] = study.sections;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <nav className="px-5 md:px-10 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--c-grey)] px-4 py-2 text-[15px] font-bold transition-transform hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden /> All work
        </Link>
        <Link to="/" className="font-black uppercase text-[15px] tracking-tight">
          Rachael Grocott
        </Link>
      </nav>

      {/* Hero: the project's colour block, with the gutter like the grid */}
      <header className="px-2.5 md:px-3">
        <div className="grid md:grid-cols-[3fr_2fr] gap-8 p-6 md:p-12" style={{ background: study.bg }}>
          <div className="flex flex-col justify-between gap-8">
            <div>
              <span className="inline-block whitespace-nowrap rounded-full bg-white/75 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.06em]">
                {study.madeFor}
              </span>
              <h1 className="mt-5 font-black uppercase leading-[0.88] tracking-[-0.02em] text-[44px] md:text-[clamp(48px,5.5vw,96px)]">
                {study.title}
              </h1>
              <p className="mt-6 text-[20px] md:text-[24px] leading-snug max-w-[34ch] font-bold">{study.intro}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-xl">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--ink-soft)]">{f.label}</dt>
                  <dd className="mt-1 text-[16px] font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
            {study.link && (
              <a
                href={study.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5"
              >
                {study.link.label} <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
            )}
          </div>
          <img src={study.hero.src} alt={study.hero.alt} className="w-full max-w-md md:justify-self-end self-center" />
        </div>
      </header>

      <main className="px-5 md:px-12 max-w-[1200px] mx-auto pb-10">
        <Section heading={problem.heading}>{problem.body}</Section>
        {restSections.map((s) => (
          <Section key={s.heading} heading={s.heading}>
            {s.body}
          </Section>
        ))}

        {study.decisions && (
          <section className="py-10 md:py-14 border-t border-[var(--ink)]/10">
            <h2 className="font-black uppercase text-[22px] md:text-[26px] leading-[0.95] tracking-[-0.01em]">
              Decisions that shaped it
            </h2>
            <ol className="mt-8 grid md:grid-cols-2 gap-3">
              {study.decisions.map((d, i) => (
                <li key={d.title} className="p-6 md:p-8" style={{ background: 'var(--c-grey)' }}>
                  <span className="font-black text-[15px] text-[var(--ink-soft)]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-black text-[22px] md:text-[24px] leading-tight tracking-[-0.01em]">{d.title}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-[var(--ink-soft)]">{d.body}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {extra.map((s) => (
          <Section key={s.heading} heading={s.heading}>
            {s.body}
          </Section>
        ))}

        {study.gallery && (
          <section className="py-10 md:py-14 border-t border-[var(--ink)]/10">
            <h2 className="font-black uppercase text-[22px] md:text-[26px] leading-[0.95] tracking-[-0.01em]">
              Telling people about it
            </h2>
            <p className="mt-4 text-[18px] leading-relaxed text-[var(--ink-soft)] max-w-[60ch]">
              A set of posts for Instagram, each making one point a crocheter would recognise.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {study.gallery.map((g) => (
                <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="w-full" />
              ))}
            </div>
          </section>
        )}

        <div className="pt-10 border-t border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--c-grey)] px-5 py-2.5 text-[15px] font-bold"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden /> All work
          </Link>
          <a
            href="mailto:rachaelgrocott@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 text-[15px] font-bold"
          >
            Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
        </div>
      </main>
    </div>
  );
}
