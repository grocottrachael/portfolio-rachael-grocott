import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { C } from './components/Shapes';

function Pill({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span className="inline-block rounded-full px-[0.35em] leading-[1.15] box-decoration-clone" style={{ background: bg }}>
      {children}
    </span>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section className="px-5 md:px-10 py-16 md:py-24">
        <p className="max-w-[22ch] md:max-w-[26ch] font-bold text-[30px] md:text-[clamp(36px,4.2vw,64px)] leading-[1.08] tracking-[-0.02em]">
          I&rsquo;m a Senior Product Designer at <Pill bg={C.blue}>Graphy</Pill>. I make complex things simple, then
          polish them till they&rsquo;re <Pill bg={C.pink}>genuinely beautiful</Pill>.
        </p>
        <p className="mt-8 max-w-[52ch] text-[18px] md:text-[21px] leading-relaxed text-[#181818]/75">
          I&rsquo;m all in on AI and use it to build my own products, start to finish. I founded Triangirls, I speak
          at events, and I love rallying a team around a good idea.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:rachaelgrocott@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#181818] text-white px-6 py-3 text-[16px] font-bold transition-transform hover:-translate-y-0.5"
          >
            Say hiya <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
          <a
            href="https://www.linkedin.com/in/rachaelgrocott/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[16px] font-bold transition-transform hover:-translate-y-0.5"
            style={{ background: C.grey }}
          >
            <Linkedin className="w-4 h-4" aria-hidden /> LinkedIn
          </a>
          <a
            href="https://github.com/grocottrachael"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[16px] font-bold transition-transform hover:-translate-y-0.5"
            style={{ background: C.grey }}
          >
            <Github className="w-4 h-4" aria-hidden /> GitHub
          </a>
        </div>
      </section>

      <Work />

      <footer className="px-5 md:px-10 py-16 md:py-24 bg-[#181818] text-white">
        <a
          href="mailto:rachaelgrocott@gmail.com"
          className="group inline-flex items-end gap-3 font-black uppercase leading-[0.85] text-[16vw] md:text-[9vw] tracking-[-0.02em]"
        >
          Say hiya
          <ArrowUpRight
            className="w-[0.6em] h-[0.6em] transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
            style={{ color: C.yellow }}
            aria-hidden
          />
        </a>
        <p className="mt-6 text-[18px] text-white/60">rachaelgrocott@gmail.com</p>
      </footer>
    </div>
  );
}
