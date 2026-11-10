import { useState } from 'react';

/* Solid brand marks (Simple Icons), rather than outline icons */
function MailMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <rect x="1.5" y="4" width="21" height="16" rx="2" />
      <path d="M4.5 7.5 12 13l7.5-5.5" fill="none" stroke="var(--c-grey)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
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
            I&rsquo;m a Senior Product Designer at <Pill bg={C.accent}>Graphy</Pill>. I make <Pill bg={C.yellow}>complex things simple</Pill>,
            then polish them till they&rsquo;re genuinely beautiful.
          </p>
          <p className="mt-5 text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            Part designer, part engineer. I prototype and ship in code with AI, from the Graphy SDK to my own apps. I
            founded Triangirls, I speak at events, and I love rallying a team around a good idea.
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
