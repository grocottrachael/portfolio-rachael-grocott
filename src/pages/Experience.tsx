import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { C } from '../components/Shapes';
import { beyond, coreSkills, education, interests, roles, softSkills } from '../content/experience';

/* Experience, in the case study format: a colour card at the top, then one reading column */

const label = (bg: string, text: string) => (
  <span className="chunky-tag" style={{ background: bg }}>
    {text}
  </span>
);

function Chips({ list }: { list: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {list.map((x) => (
        <li key={x} className="px-3 py-1.5 text-[16px] font-medium" style={{ background: 'color-mix(in srgb, var(--c-yellow) 45%, white)' }}>
          {x}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="p-2.5 md:p-3">
        <div className="relative overflow-hidden px-5 py-8 md:py-14" style={{ background: C.blue }}>
          <div className="relative mx-auto max-w-[720px] flex flex-col gap-7">
            <Link to="/" className="self-start inline-flex items-center gap-1.5 text-[15px] font-bold hover:underline underline-offset-4">
              <ArrowLeft className="w-4 h-4" aria-hidden /> Rachael Grocott
            </Link>
            <div>
              <h1 className=" font-display leading-[1.02] text-[40px] md:text-[60px]">Experience</h1>
              <p className="mt-4 max-w-[34ch] text-[18px] md:text-[20px] leading-[1.5] font-medium">
                Thirteen years designing complex products, from trading platforms for banks to an SDK for AI agents.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:rachaelgrocott@gmail.com" className="chunky">
                Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
              <a href="https://www.linkedin.com/in/rachaelgrocott/" target="_blank" rel="noopener noreferrer" className="chunky">
                LinkedIn <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-[720px] space-y-16 md:space-y-20">
          <section>
            {label(C.blue, 'Experience')}
            <ol className="mt-5 border-t-[2px] border-[var(--ink)]">
              {roles.map((r) => (
                <li key={r.company} className="py-5 border-b border-[var(--ink)]/15">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[19px] font-bold">{r.company}</span>
                    <span className="text-[16px] text-[var(--ink-soft)]">{r.what}</span>
                    <span aria-hidden className="hidden sm:block flex-1 min-w-6" />
                    <span className="text-[15px] text-[var(--ink-soft)] tabular-nums inline-flex items-center gap-1.5 whitespace-nowrap">
                      {r.dates}
                    </span>
                  </div>
                  {r.highlight && (
                    <p className="mt-2"><span className="text-[16px] font-bold px-1" style={{ background: C.yellow }}>{r.highlight}</span></p>
                  )}
                  <p className="mt-2 text-[17px] leading-[1.6] text-[var(--ink-soft)]">{r.body}</p>
                  {r.introduced && (
                    <p className="mt-2 text-[15px] text-[var(--ink-soft)]">
                      <span className="font-bold text-[var(--ink)]">Introduced:</span> {r.introduced.join(' · ')}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section>
            {label(C.yellow, 'Skills')}
            <h3 className="mt-6 font-display text-[22px]">Core</h3>
            <Chips list={coreSkills} />
            <h3 className="mt-6 font-display text-[22px]">Soft</h3>
            <Chips list={softSkills} />
          </section>

          <section id="community" className="scroll-mt-8">
            {label(C.pink, 'Beyond the day job')}
            <h2 className="mt-4 font-display text-[30px] md:text-[40px] leading-[1.08]">Community, talks and press</h2>
            <dl className="mt-6 space-y-6">
              {beyond.map((b) => (
                <div key={b.title}>
                  <dt className="font-display text-[22px] md:text-[24px] leading-[1.2]">{b.title}</dt>
                  <dd className="mt-1.5 text-[17px] md:text-[18px] leading-[1.6] text-[var(--ink-soft)]">{b.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            {label(C.green, 'Education')}
            <dl className="mt-6 space-y-6">
              {education.map((e) => (
                <div key={e.where}>
                  <dt className="font-display text-[22px] md:text-[24px] leading-[1.2]">{e.where}</dt>
                  <dd className="mt-1.5 text-[17px] md:text-[18px] leading-[1.6] text-[var(--ink-soft)]">{e.what}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            {label(C.accent, 'Outside work')}
            <p className="mt-4 text-[18px] leading-[1.6] text-[var(--ink-soft)]">{interests.join(' · ')}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
