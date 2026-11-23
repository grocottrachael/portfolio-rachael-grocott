/* Source for public/rachael-grocott-cv.pdf. To regenerate: copy this into src/, add a /cv route in App.tsx, build and run vite preview on 5173, then run: node cv/pdf.js public/rachael-grocott-cv.pdf <screenshot-prefix>. Then remove the route and src/CvPage.tsx. */
import { C } from './components/Shapes';
import CompanyLogo from './components/CompanyLogo';
import { roles, beyond, education, interests } from './content/experience';
import profileImage from './assets/rachael-avatar.webp';

/* Rachael's CV as two A4 pages, in the site's style, for printing to PDF. Kept in the scratchpad, not the site */
/* The intro highlights: the site's lilac and yellow at 60%, pre-mixed with the paper so every PDF viewer shows them the same */
const soft: Record<string, string> = { [C.accent]: '#DBD1F2', [C.yellow]: '#F6E3B0' };
const pill = (bg: string, t: string) => <span className="px-[0.12em]" style={{ background: soft[bg] ?? bg }}>{t}</span>;

function Scallop({ color, className }: { color: string; className?: string }) {
  const n = 12, R = 41, r = 8.6, step = (2 * Math.PI) / n;
  const pt = (a: number) => `${50 + R * Math.cos(a)} ${50 + R * Math.sin(a)}`;
  let d = `M ${pt(-step / 2)}`;
  for (let i = 0; i < n; i++) d += ` A ${r} ${r} 0 0 1 ${pt(-step / 2 + (i + 1) * step)}`;
  return <svg viewBox="0 0 100 100" className={className}><path d={d + ' Z'} fill={color} /></svg>;
}

function Label({ children }: { bg?: string; children: React.ReactNode }) {
  return <h2 className="font-display text-[16pt] leading-none">{children}</h2>;
}

/* My own apps, written like jobs: what it is, what it shows, and what I did */
const quests = [
  {
    t: 'SwatchMaker', what: 'Paint colour comparison', bg: C.pink, url: 'https://rachaelgrocott.com/work/swatchmaker', live: 'swatchmaker.uk',
    lead: 'An idea taken from prototype to live product, solo',
    d: 'A website for comparing paint colours from ten UK brands side by side, before you buy tester pots. I designed and built it end to end, including pulling in over 5,000 real colours from each brand’s own data.',
  },
  {
    t: 'Knot a Problem', what: 'Crochet pattern reader', bg: C.yellow, url: 'https://rachaelgrocott.com/work/knot-a-problem', live: 'knotaproblem.app',
    lead: 'A real user problem, solved and tested with real users',
    d: 'An app that turns hard-to-read crochet patterns into plain English or stitch diagrams. I designed and built it in two months, testing it against real patterns and with my granny, its first user.',
  },
  {
    t: 'Crumbs', what: 'Calorie tracking app', bg: C.green, url: 'https://rachaelgrocott.com/work/crumbs', live: 'In daily use',
    lead: 'Mobile-first design, improved through daily use',
    d: 'A phone app for me and my partner: snap a meal and AI works out the calories. Built to sharpen my mobile-first design. It was on our phones in two days, and I’ve improved it 49 times since.',
  },
  {
    t: 'Dotties', what: 'Image effects tool', bg: C.grey, url: 'https://www.dotties.app/', live: 'dotties.app',
    lead: 'A tool I needed at work, so I built it',
    d: 'A web tool that turns images into halftone, dithered or ASCII art for design work, with PNG and SVG export.',
  },
];

/* Links look like the site's: a soft underline that says you can click */
const link = 'underline decoration-[0.3mm] underline-offset-[0.8mm] decoration-[var(--ink)]/30';

/* The CV's own tweaks to the Experience content */
const cvBody: Record<string, string> = {
  Graphy: 'Leading all of design in a small startup, working closely with the founders. I code interactive explorations and work with engineers to ship production-quality work, and make demos, SDK playgrounds and sales materials with our go-to-market team. Point and edit, which I designed, became one of our strongest sales demos, and one of our biggest customers is building it into their own product.',
};
const cvCore = ['AI prototyping', 'Design systems', 'User research', 'Product strategy', 'Developer experience', 'Visual polish'];
const cvSoft = ['Workshops and team alignment', 'Storytelling', 'Communication', 'Collaboration', 'Empathy'];

const page = 'relative w-[210mm] h-[297mm] overflow-hidden bg-[var(--paper)] text-[var(--ink)] px-[16mm] py-[14mm] flex flex-col break-after-page';
const body = 'text-[9.8pt] leading-[1.55] text-[var(--ink-soft)]';

export default function CvPage() {
  return (
    <div className="cv">
      <style>{`@page { size: A4; margin: 0 } html, body { background: var(--paper) }`}</style>

      {/* Page one: who I am and where I've worked */}
      <section className={page}>
        <header className="relative -mx-[16mm] -mt-[14mm] px-[16mm] pt-[12mm] pb-[9mm] bg-[var(--c-grey)] flex items-center gap-[7mm]">
          <div className="relative w-[30mm] h-[30mm] shrink-0">
            <Scallop color={C.pink} className="absolute inset-0 w-full h-full" />
            <img src={profileImage} alt="" className="absolute inset-[15%] w-[70%] h-[70%] rounded-full object-cover border-[0.5mm] border-[var(--ink)]" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-[30pt] leading-none">Rachael Grocott</h1>
            <p className="mt-[2mm] text-[12pt]"><span className="font-bold">Senior Product Designer</span><span className="text-[var(--ink-soft)]"> · York, or remote</span></p>
            <p className="mt-[2.5mm] text-[9pt] text-[var(--ink-soft)] flex flex-wrap gap-x-[4mm]">
              <a href="https://rachaelgrocott.com" className={link}>rachaelgrocott.com</a><a href="mailto:rachaelgrocott@gmail.com" className={link}>rachaelgrocott@gmail.com</a><a href="https://www.linkedin.com/in/rachaelgrocott/" className={link}>linkedin.com/in/rachaelgrocott</a>
            </p>
          </div>
        </header>

        <div className={`${body} mt-[7mm] text-[10.5pt] space-y-[2.5mm]`}>
          <p>
            I&rsquo;m a Senior Product Designer at Graphy. I make {pill(C.accent, 'complex things simple')}, ship them fast, then polish them till they&rsquo;re {pill(C.yellow, 'genuinely beautiful')}.
          </p>
          <p>
            I&rsquo;ve spent 13 years designing everything from a trading platform used by the world&rsquo;s major banks to an AI SDK. I work closely with CEOs and product leads on what to build and why, and I&rsquo;ve introduced design systems, principles and crits.
          </p>
          <p>
            I design in working code on the real product, with AI doing the building and me setting the bar. Engineers get a pull request, not a mockup.
          </p>
        </div>

        <div className="mt-[9mm]"><Label bg={C.green}>Experience</Label></div>
        {/* A timeline: each logo joined to the next by a thin line */}
        <ol className="mt-[3mm]">
          {roles.map((r) => (
            <li key={r.company} className="relative pl-[11mm] pb-[8.5mm] last:pb-0">
              {/* The logo is centred on the name and the bold line together, hanging out into the left margin */}
              <div className="relative">
              <CompanyLogo company={r.company} className="absolute -left-[11mm] top-1/2 -translate-y-1/2 w-[8mm] h-[8mm] !rounded-[1.8mm] !border-[0.4mm]" />
              <div className="flex items-center gap-[2.5mm]">
                {r.study ? (
                  <a href={`https://rachaelgrocott.com/work/${r.study}`} className={`text-[11pt] font-bold leading-none ${link}`}>{r.company}</a>
                ) : (
                  <span className="text-[11pt] font-bold leading-none">{r.company}</span>
                )}
                <span className="text-[9.5pt] leading-none text-[var(--ink-soft)]">{r.what}</span>
                <span className="flex-1" />
                <span className="text-[9pt] leading-none text-[var(--ink-soft)] tabular-nums whitespace-nowrap">{r.dates}</span>
              </div>
              {r.highlight && <p className="mt-[1mm] text-[9.8pt] leading-tight font-bold">{r.highlight}</p>}
              </div>
              <p className={`${body} mt-[1.2mm]`}>{cvBody[r.company] ?? r.body}</p>
              {r.introduced && (
                <p className="mt-[1.2mm] text-[8.8pt] text-[var(--ink-soft)]"><span className="font-bold text-[var(--ink)]">Introduced:</span> {r.introduced.join(' · ')}</p>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Page two: the work, skills and the rest */}
      <section className={page}>
        <Label bg={C.pink}>Side quests</Label>
        <p className={`${body} mt-[2mm]`}>My own apps, designed and built solo with Claude Code.</p>
        <ol className="mt-[3mm] space-y-[3.6mm]">
          {quests.map((w) => (
            <li key={w.t}>
              <div className="flex items-center gap-[2.5mm]">
                <span className="w-[2.4mm] h-[2.4mm] rounded-full shrink-0" style={{ background: w.bg }} />
                <a href={w.url} className={`text-[11pt] font-bold leading-none ${link}`}>{w.t}</a>
                <span className="text-[9.5pt] leading-none text-[var(--ink-soft)]">{w.what}</span>
                <span className="flex-1" />
                <span className="text-[9pt] leading-none text-[var(--ink-soft)] whitespace-nowrap">{w.live}</span>
              </div>
              <div className="pl-[4.9mm]">
                <p className={`${body} mt-[0.8mm]`}>{w.d}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Beyond the day job across the full width as a 2x2, then Skills beside Education and Outside work, so the columns balance */}
        <div className="mt-[8mm]">
          <Label>Beyond the day job</Label>
          <dl className="mt-[2.5mm] grid grid-cols-2 gap-x-[8mm] gap-y-[3.5mm]">
            {beyond.map((b) => b.title === 'Mentoring' ? { ...b, body: 'I mentor designers through ADP List, and coached the brilliant women who helped me run Triangirls.' } : b).map((b) => (
              <div key={b.title}><dt className="text-[10pt] font-bold">{b.title}</dt><dd className={`${body} mt-[0.8mm]`}>{b.body}</dd></div>
            ))}
          </dl>
        </div>
        {/* Skills as its own row, Core beside Soft */}
        <div className="mt-[8mm]">
          <Label>Skills</Label>
          <div className="mt-[2.5mm] grid grid-cols-2 gap-x-[8mm]">
            <div>
              <p className="text-[10pt] font-bold">Core</p>
              <p className={`${body} mt-[0.8mm]`}>{cvCore.join(' · ')}</p>
            </div>
            <div>
              <p className="text-[10pt] font-bold">Soft</p>
              <p className={`${body} mt-[0.8mm]`}>{cvSoft.join(' · ')}</p>
            </div>
          </div>
        </div>
        {/* The last row: Education beside Outside work */}
        <div className="mt-[8mm] grid grid-cols-2 gap-x-[8mm]">
          <div>
            <Label>Education</Label>
            <ul className="mt-[2.5mm] space-y-[2.5mm]">
              {education.map((e) => (
                <li key={e.where}><p className="text-[10pt] font-bold">{e.where}</p><p className={body}>{e.what}</p></li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Outside work</Label>
            <p className={`${body} mt-[2.5mm]`}>{interests.join(' · ')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
