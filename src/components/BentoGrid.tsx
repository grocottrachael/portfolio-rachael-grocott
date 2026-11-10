import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const card = 'group relative rounded-xl overflow-hidden transition-all';
const linkCard = `${card} hover:shadow-lg cursor-pointer`;
const contact =
  'col-span-2 bg-neutral-100 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 transition-all';

function Arrow() {
  return (
    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight className="w-3 h-3 text-neutral-700" />
    </div>
  );
}

function External(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

export function BentoGrid() {
  return (
    <div className="w-full md:w-[50vw] mx-auto">
      <div className="grid grid-cols-6 gap-3">
        {/* SWATCHMAKER: featured, spans 2 rows */}
        <External
          href="https://swatchmaker.uk/"
          className={`${linkCard} col-span-6 md:col-span-4 md:row-span-2 bg-neutral-100`}
        >
          <div className="h-full p-4 flex flex-col justify-between min-h-[180px] md:min-h-[200px]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="tracking-tight font-medium text-[15px]">SWATCHMAKER</h3>
                <div className="px-2 py-0.5 rounded-full bg-white/80 text-[11px] text-neutral-600">
                  Featured
                </div>
              </div>
              <p className="text-[14px] text-neutral-600">
                A passion project for people to see paint colours from all brands side by side.
              </p>
            </div>
            <ImageWithFallback
              src="/swatchmaker.webp"
              alt="SWATCHMAKER interface"
              className="w-full mt-3 rounded-lg"
            />
            <Arrow />
          </div>
        </External>

        {/* Graphy SDK: current role */}
        <External
          href="https://graphy.dev/"
          className={`${linkCard} col-span-6 md:col-span-2 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-4 flex flex-col justify-between min-h-[120px]`}
        >
          <div>
            <h4 className="text-[15px] tracking-tight mb-1 font-medium">Graphy SDK</h4>
            <p className="text-[14px] text-neutral-300">
              Beautiful, editable charts for developers and their AI agents.
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[12px] text-neutral-300">Working on this now</span>
          </div>
          <Arrow />
        </External>

        {/* Knot a Problem */}
        <External
          href="https://knotaproblem.app/"
          className={`${linkCard} col-span-6 md:col-span-2 bg-[#F3C5CD] p-4 flex flex-col`}
        >
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">Knot a Problem</h4>
          <p className="text-[14px] text-neutral-700">
            Never get stuck reading a crochet pattern again.
          </p>
          <ImageWithFallback
            src="/knot-a-problem.webp"
            alt="Knot a Problem: never get stuck reading a crochet pattern again"
            className="w-full mt-3 rounded-md"
          />
          <Arrow />
        </External>

        {/* Dotties */}
        <External
          href="https://dotties.app/"
          className={`${linkCard} col-span-6 md:col-span-2 bg-[#0A0A0A] text-white p-4`}
        >
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">Dotties</h4>
          <p className="text-[14px] text-neutral-400">
            I built this to help me at work. Turn any image into halftone dots, dithering or ASCII art.
          </p>
          <Arrow />
        </External>

        {/* Crumbs: private and self-hosted, so no link */}
        <div className={`${card} col-span-6 md:col-span-2 bg-[#D4EAE2] p-4`}>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-[15px] tracking-tight font-medium">Crumbs</h4>
            <div className="px-2 py-0.5 rounded-full bg-white/70 text-[11px] text-neutral-600">
              Just for us
            </div>
          </div>
          <p className="text-[14px] text-neutral-700">
            A no-faff calorie diary for our household. Snap your plate and it works it out.
          </p>
        </div>

        {/* Triangirls */}
        <External
          href="https://x.com/triangirlsocial"
          className={`${linkCard} col-span-6 md:col-span-2 bg-neutral-50 p-4`}
        >
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">Triangirls</h4>
          <p className="text-[14px] text-neutral-600">
            Founded and ran a 2000+ member strong community for women in tech, for years.
          </p>
          <Arrow />
        </External>

        {/* graphy.dev: I own the website design */}
        <External
          href="https://graphy.dev/"
          className={`${linkCard} col-span-6 md:col-span-3 bg-neutral-100 p-4`}
        >
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-[15px] tracking-tight font-medium">graphy.dev</h4>
            <div className="px-2 py-0.5 rounded-full bg-white/80 text-[11px] text-neutral-600">Website</div>
          </div>
          <p className="text-[14px] text-neutral-600">
            I own the design of the Graphy developer website, as well as the product.
          </p>
          <Arrow />
        </External>

        {/* Latest work lives on LinkedIn */}
        <External
          href="https://www.linkedin.com/in/rachaelgrocott/recent-activity/all/"
          className={`${linkCard} col-span-6 md:col-span-3 bg-[#FFE3F1] p-4`}
        >
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">My latest work</h4>
          <p className="text-[14px] text-neutral-700">
            I post what I{'\u2019'}m working on as I go. LinkedIn is the place to see it.
          </p>
          <Arrow />
        </External>

        {/* Talks */}
        <div className={`${card} col-span-6 md:col-span-3 bg-neutral-50 p-4`}>
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">Talks & workshops</h4>
          <p className="text-[14px] text-neutral-600">
            I{'\u2019'}ve spoken at loads of events, and I run sessions like{' '}
            <em>How to give and receive feedback</em>.
          </p>
        </div>

        {/* Press */}
        <div className={`${card} col-span-6 md:col-span-3 bg-neutral-50 p-4`}>
          <h4 className="text-[15px] tracking-tight mb-1 font-medium">Press</h4>
          <p className="text-[14px] text-neutral-600">
            Interviewed by VICE. Featured in Samsung{'\u2019'}s Not a School.
          </p>
        </div>

        {/* Contact */}
        <a href="mailto:rachaelgrocott@gmail.com" className={contact}>
          <Mail className="w-4 h-4 text-neutral-700" />
          <span className="text-[15px] font-medium text-neutral-600">Email</span>
        </a>
        <External href="https://github.com/grocottrachael" className={contact}>
          <Github className="w-4 h-4 text-neutral-700" />
          <span className="text-[15px] font-medium text-neutral-600">GitHub</span>
        </External>
        <External href="https://www.linkedin.com/in/rachaelgrocott/" className={contact}>
          <Linkedin className="w-4 h-4 text-neutral-700" />
          <span className="text-[15px] font-medium text-neutral-600">LinkedIn</span>
        </External>
      </div>
    </div>
  );
}
