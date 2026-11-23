import { useState } from 'react';

import { MailMark, LinkedinMark, GithubMark } from './components/Marks';
import { Work } from './components/Work';
import { C, Flower, Heart, HiyaBubble } from './components/Shapes';
import profileImage from './assets/rachael-avatar.webp';
import { usePath } from './router';
import { caseStudies } from './content/caseStudies';
import { CaseStudy } from './pages/CaseStudy';
import { CaseStudyV2 } from './pages/CaseStudyV2';
import { Experience } from './pages/Experience';

function Pill({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="whitespace-nowrap px-[0.12em] -mx-[0.06em]"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

/* A round badge with a scalloped edge: 12 bumps round a circle */
function Scallop({ color, className }: { color: string; className?: string }) {
  const n = 12;
  const R = 41;
  const r = 8.6;
  const step = (2 * Math.PI) / n;
  const pt = (a: number) => `${50 + R * Math.cos(a)} ${50 + R * Math.sin(a)}`;
  let d = `M ${pt(-step / 2)}`;
  for (let i = 0; i < n; i++) d += ` A ${r} ${r} 0 0 1 ${pt(-step / 2 + (i + 1) * step)}`;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={d + ' Z'} fill={color} />
    </svg>
  );
}

function Home() {
  const [stickers, setStickers] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] xl:flex">
      {/* Who I am: pinned on the left while the blocks scroll on the right */}
      <aside className="xl:w-[34%] xl:flex-none xl:sticky xl:top-0 xl:h-screen p-3 pb-0 md:p-5 md:pb-0 xl:pb-5 xl:pr-5">
        {/* A block of its own, so the white gutters run round it like the grid */}
        <div className="relative overflow-hidden h-full xl:overflow-y-auto bg-[var(--c-grey)] px-5 md:px-[3vw] pt-10 pb-40 xl:py-[6vh] flex flex-col gap-6 md:gap-7 xl:justify-center">
        <div>
        {/* My photo on a scalloped badge, so the eyed flower is the only flower */}
        <div className="group relative mb-4 -ml-1 w-24 h-24 md:w-28 md:h-28">
          <Scallop
            color={C.pink}
            className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out motion-safe:group-hover:rotate-[15deg]"
          />
          <img
            src={profileImage}
            alt="Rachael"
            width={64}
            height={64}
            className="absolute inset-[15%] w-[70%] h-[70%] rounded-full object-cover border-2 border-[var(--ink)] transition-transform duration-500 ease-in-out motion-safe:group-hover:scale-[1.04]"
          />
        </div>
        <h1 className="whitespace-nowrap font-display leading-none text-[9vw] md:text-[clamp(26px,2.5vw,46px)]">
          Hiya, I&rsquo;m Rachael!
        </h1>
        </div>

        <div>
          <p className="text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            I&rsquo;m a Senior Product Designer at Graphy. I make <Pill bg={C.accent}>complex things simple</Pill>,
            ship them fast, then polish them till they&rsquo;re <Pill bg={C.yellow}>genuinely beautiful</Pill>.
          </p>
          <p className="mt-5 text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            I&rsquo;ve spent 13 years designing everything from a trading platform used by the world&rsquo;s major banks
            to an AI SDK. I work closely with CEOs and product leads on what to build and why, and I&rsquo;ve introduced
            design systems, principles and crits.
          </p>
          <p className="mt-5 text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            I design in working code on the real product, with AI doing the building and me setting the bar.
            Engineers get a pull request, not a mockup.
          </p>
        </div>

        {/* Email, LinkedIn and GitHub as three quiet icons; the flower's speech bubble does the hiya */}
        <div className="flex items-center gap-5 -ml-0.5">
          <a href="mailto:rachaelgrocott@gmail.com" aria-label="Email me" className="text-[var(--ink)] opacity-80 hover:opacity-100 transition-[opacity,transform] hover:-translate-y-0.5 [&_svg]:w-6 [&_svg]:h-6">
            <MailMark />
          </a>
          <a
            href="https://www.linkedin.com/in/rachaelgrocott/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--ink)] opacity-80 hover:opacity-100 transition-[opacity,transform] hover:-translate-y-0.5 [&_svg]:w-6 [&_svg]:h-6"
          >
            <LinkedinMark />
          </a>
          <a
            href="https://github.com/grocottrachael"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--ink)] opacity-80 hover:opacity-100 transition-[opacity,transform] hover:-translate-y-0.5 [&_svg]:w-6 [&_svg]:h-6"
          >
            <GithubMark />
          </a>
        </div>
        {/* A clipping frame, so the flower is cropped by the panel's edge instead of making it scroll */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* The flower with lashes. Hover her (or tap on a phone) and her stickers pop out */}
        <div
          className={`group/stickers absolute -right-8 -bottom-10 w-52 h-48 md:w-64 md:h-56 pointer-events-none ${stickers ? 'is-open' : ''}`}
          aria-hidden
        >
          <HiyaBubble className="pop [--d:60ms] absolute left-[4%] -top-[2%] w-20 h-16 md:w-24 md:h-[76px] -rotate-[6deg]" />
          <Heart color={C.pink} className="pop [--d:0ms] absolute left-[0%] top-[42%] w-14 h-14 md:w-16 md:h-16 -rotate-[16deg]" />
          <span
            className="pointer-events-auto absolute right-0 bottom-0 w-36 h-36 md:w-44 md:h-44"
            onClick={() => {
              /* Tapping only toggles them on phones; with a mouse they just follow the hover */
              if (!window.matchMedia('(hover: hover)').matches) setStickers((v) => !v);
            }}
          >
            <Flower color={C.blue} eyes className="sticker w-full h-full -rotate-[14deg]" />
          </span>
        </div>
        </div>
        </div>
      </aside>

      <main className="xl:flex-1 min-w-0">
        <Work />
      </main>
    </div>
  );
}

export default function App() {
  const path = usePath();
  const study = caseStudies.find((c) => path === `/work/${c.id}`);
  if (path === '/experience') return <Experience />;
  if (study) return study.v2 ? <CaseStudyV2 study={study} /> : <CaseStudy study={study} />;
  return <Home />;
}
