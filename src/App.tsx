import { ArrowUpRight } from 'lucide-react';

/* Solid brand marks (Simple Icons), rather than outline icons */
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
import { C } from './components/Shapes';
import profileImage from './assets/rachael-avatar.webp';
import { usePath } from './router';
import { caseStudies } from './content/caseStudies';
import { CaseStudy } from './pages/CaseStudy';

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

const button =
  'chunky';

function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] md:flex">
      {/* Who I am: pinned on the left while the blocks scroll on the right */}
      <aside className="md:w-[34%] md:flex-none md:sticky md:top-0 md:h-screen p-2.5 pb-0 md:p-3">
        {/* A block of its own, so the white gutters run round it like the grid */}
        <div className="h-full md:overflow-y-auto bg-[var(--c-grey)] px-5 md:px-[3vw] py-10 md:py-[6vh] flex flex-col gap-6 md:gap-7 md:justify-center">
        <div>
        <img
          src={profileImage}
          alt="Rachael"
          width={64}
          height={64}
          className="mb-5 w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-[3px] border-[var(--ink)]"
        />
        <h1 className="whitespace-nowrap font-display leading-none text-[9vw] md:text-[clamp(26px,2.5vw,46px)]">
          Hiya, I&rsquo;m Rachael!
        </h1>
        </div>

        <div>
          <p className="font-bold text-[24px] md:text-[clamp(19px,1.55vw,28px)] leading-[1.32] tracking-[-0.015em]">
            I&rsquo;m a Senior Product Designer at <Pill bg={C.accent}>Graphy</Pill>. I make complex things simple, then
            polish them till they&rsquo;re <Pill bg={C.yellow}>genuinely beautiful</Pill>.
          </p>
          <p className="mt-5 text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            Part designer, part engineer. I prototype and ship in code with AI, from the Graphy SDK to my own apps. I
            founded Triangirls, I speak at events, and I love rallying a team around a good idea.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a href="mailto:rachaelgrocott@gmail.com" className={button}>
            Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
          <a
            href="https://www.linkedin.com/in/rachaelgrocott/"
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            <LinkedinMark /> LinkedIn
          </a>
          <a
            href="https://github.com/grocottrachael"
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            <GithubMark /> GitHub
          </a>
        </div>
        </div>
      </aside>

      <main className="md:flex-1 min-w-0">
        <Work />
      </main>
    </div>
  );
}

export default function App() {
  const path = usePath();
  const study = caseStudies.find((c) => path === `/work/${c.id}`);
  return study ? <CaseStudy study={study} /> : <Home />;
}
