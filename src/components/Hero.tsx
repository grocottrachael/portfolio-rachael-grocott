import { Arches, Bands, Flower, Ovals, Eyes, Stairs, StairsBall } from './Shapes';

export function Hero() {
  return (
    <header className="relative grid grid-cols-2 md:grid-cols-3">
      <div className="relative aspect-square md:aspect-[66/70]">
        <Arches />
      </div>
      <div className="relative aspect-square md:aspect-[66/70]">
        <Bands />
      </div>
      <div className="relative aspect-square md:aspect-[66/70]">
        <Flower />
      </div>
      <div className="relative aspect-square md:aspect-[66/70]">
        <Ovals />
      </div>
      <div className="relative aspect-square md:aspect-[66/70]">
        <Eyes />
      </div>
      <div className="relative aspect-square md:aspect-[66/70]">
        <Stairs />
        <StairsBall />
      </div>

      {/* Sits on the line between the first and second rows, like the original */}
      <h1 className="pointer-events-none absolute left-0 top-1/3 md:top-1/2 -translate-y-[88%] px-3 md:px-2 leading-[0.82] uppercase">
        <span className="block font-bold text-[3.4vw] md:text-[1.6vw] tracking-tight mb-[0.6vw]">Hiya! I&rsquo;m</span>
        <span className="block font-black text-[11vw] md:text-[7.6vw] tracking-[-0.02em]">Rachael Grocott</span>
      </h1>
    </header>
  );
}
