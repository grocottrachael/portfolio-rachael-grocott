import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { Work } from './components/Work';
import { C } from './components/Shapes';
import profileImage from './assets/rachael-avatar.webp';

function Pill({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="whitespace-nowrap rounded-full px-[0.32em] py-[0.06em]"
      style={{ background: `color-mix(in srgb, ${bg} 45%, white)` }}
    >
      {children}
    </span>
  );
}

const button =
  'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] md:flex">
      {/* Who I am: pinned on the left while the blocks scroll on the right */}
      <aside className="md:w-[34%] md:flex-none md:sticky md:top-0 md:h-screen md:overflow-y-auto px-5 md:px-[3vw] py-10 md:py-[6vh] flex flex-col gap-8 md:gap-10 md:justify-center">
        <div>
        <img
          src={profileImage}
          alt="Rachael"
          width={64}
          height={64}
          className="mb-5 w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-[3px] border-[#F05BA6]"
        />
        <h1 className="uppercase leading-[0.85]">
          <span className="block font-bold text-[16px] md:text-[clamp(14px,1.1vw,20px)] tracking-tight mb-2">
            Hiya! I&rsquo;m
          </span>
          <span className="block font-black text-[14vw] md:text-[clamp(40px,4.5vw,84px)] tracking-[-0.02em]">
            Rachael
            <br />
            Grocott
          </span>
        </h1>
        </div>

        <div>
          <p className="font-bold text-[24px] md:text-[clamp(19px,1.55vw,28px)] leading-[1.32] tracking-[-0.015em]">
            I&rsquo;m a Senior Product Designer at <Pill bg={C.blue}>Graphy</Pill>. I make complex things simple, then
            polish them till they&rsquo;re <Pill bg={C.pink}>genuinely beautiful</Pill>.
          </p>
          <p className="mt-5 text-[17px] md:text-[clamp(15px,1.05vw,18px)] leading-relaxed text-[var(--ink-soft)]">
            I&rsquo;m all in on AI and use it to build my own products, start to finish. I founded Triangirls, I speak
            at events, and I love rallying a team around a good idea.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a href="mailto:rachaelgrocott@gmail.com" className={`${button} bg-[var(--ink)] text-[var(--paper)]`}>
            Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
          <a
            href="https://www.linkedin.com/in/rachaelgrocott/"
            target="_blank"
            rel="noopener noreferrer"
            className={button}
            style={{ background: C.grey }}
          >
            <Linkedin className="w-4 h-4" aria-hidden /> LinkedIn
          </a>
          <a
            href="https://github.com/grocottrachael"
            target="_blank"
            rel="noopener noreferrer"
            className={button}
            style={{ background: C.grey }}
          >
            <Github className="w-4 h-4" aria-hidden /> GitHub
          </a>
        </div>
      </aside>

      <main className="md:flex-1 min-w-0">
        <Work />
      </main>
    </div>
  );
}
