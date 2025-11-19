import { Github, Linkedin, Dribbble, Mail, ArrowUpRight } from 'lucide-react';
import swatchmakerImage from 'figma:asset/097568e367fac9cdd907192892156aefc3964ebd.png';

export function BentoGrid() {
  return (
    <div className="w-full md:w-[50vw] mx-auto">
      {/* Bento grid - portrait oriented */}
      <div className="grid grid-cols-6 gap-3">
        {/* Row 1 & 2 */}
        {/* Large Project Card - spans 2 rows */}
        <a 
          href="https://swatchmaker.uk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 md:row-span-2 group relative bg-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer order-1 md:order-none"
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

            <img 
              src={swatchmakerImage} 
              alt="SWATCHMAKER interface" 
              className="w-full mt-3 rounded-lg"
            />

            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-3 h-3 text-neutral-700" />
            </div>
          </div>
        </a>

        {/* Project Card 2 - Design System */}
        <a 
          href="https://x.com/triangirlsocial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-2 md:aspect-square group bg-neutral-50 rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer min-h-[85px] md:min-h-0 flex flex-col relative order-3 md:order-none"
        >
          <h4 className="text-xs tracking-tight mb-1.5 font-medium text-[15px]">Triangirls</h4>
          <div className="text-[10px] text-neutral-500 space-y-0.5">
            <div className="text-[14px] text-[rgb(82,82,82)]">Founded a 2000+ member strong community for women in Tech.</div>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-3 h-3 text-neutral-700" />
          </div>
        </a>

        {/* Combined Mobile App + Skills */}
        <div className="col-span-6 md:col-span-2 md:row-span-2 bg-neutral-50 rounded-xl p-4 flex flex-col md:min-h-[200px] order-4 md:order-none">
          <div>
            <h4 className="text-xs tracking-tight mb-1.5 font-medium text-[15px]">Skills</h4>
            <div className="text-[10px] text-neutral-500 space-y-0.5">
              <div className="text-[14px] text-[rgb(82,82,82)]">Clear IA • Intuitive UX • DX • Visual Polish • Fast AI Prototyping • Design Systems • Interaction Design • Research & Testing • Product Thinking • Cross-team Collaboration • Clear Communication</div>
            </div>
          </div>
        </div>

        {/* Row 3: Availability - under e-commerce */}
        <a 
          href="https://graphy.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 group relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-xl p-4 flex items-center justify-between min-h-[75px] md:min-h-[80px] hover:shadow-lg transition-all cursor-pointer order-2 md:order-none"
        >
          <div>
            <h4 className="text-[15px] tracking-wider text-[rgb(255,255,255)] mb-0.5 font-medium">Graphy</h4>
            <p className="text-xs tracking-tight mb-1 text-[14px] text-[rgb(195,195,195)]">An AI-powered tool for turning data into clear, beautiful stories.</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] text-neutral-300">Currently working here</span>
            </div>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-3 h-3 text-neutral-700" />
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:rachaelgrocott@gmail.com"
          className="col-span-2 bg-neutral-100 text-neutral-700 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 transition-all order-4 md:order-none"
        >
          <Mail className="w-4 h-4" />
          <span className="text-[15px] font-medium text-[rgb(82,82,82)]">Email</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/grocottrachael"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 bg-neutral-100 text-neutral-700 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 transition-all order-5 md:order-none"
        >
          <Github className="w-4 h-4" />
          <span className="text-[15px] font-medium text-[rgb(82,82,82)]">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/rachaelgrocott/"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 bg-neutral-100 text-neutral-700 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-200 transition-all order-6 md:order-none"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-[15px] font-medium text-[rgb(82,82,82)]">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}