/*
 * SwatchMaker, rebuilt in code for its card: a wallpaper next to three paint colours,
 * in the app's own fonts (Catchy Mager and DM Sans). Being live, not a screenshot,
 * it stays sharp at any size, and the panels stretch to whatever shape the card is.
 * Sizes are in container units, so it scales like a picture.
 */
const swatches = [
  { brand: 'Lick', name: 'Green 03', note: 'A muted dark grey-green', bg: '#6f7b77', ink: '#FFFFFF' },
  { brand: 'Dulux', name: 'Bracken Salts 5', note: 'A pale, soft warm cream', bg: '#ecdfcb', ink: '#2B2A26' },
  { brand: 'Valspar', name: 'Ode to Joy', note: 'A soft, light stone', bg: '#bcb29c', ink: '#2B2A26' },
];

function Panel({ s, middle }: { s: (typeof swatches)[number]; middle?: boolean }) {
  return (
    <div className={`flex flex-col items-center text-center px-[2cqw] ${middle ? 'justify-center' : 'justify-end pb-[8cqw]'}`} style={{ background: s.bg, color: s.ink }}>
      <span className="sm-sans text-[1.9cqw] opacity-80">{s.brand}</span>
      <span className="sm-serif text-[3.9cqw] leading-[1.1] mt-[0.4cqw] whitespace-nowrap">{s.name}</span>
      <span className="sm-sans text-[1.7cqw] opacity-80 mt-[0.8cqw]">{s.note}</span>
    </div>
  );
}

export default function SwatchMakerScene() {
  return (
    <div role="img" aria-label="SwatchMaker showing a Living Quarters wallpaper next to three paint colours: Lick Green 03, Dulux Bracken Salts 5 and Valspar Ode to Joy" className="[container-type:inline-size] w-full h-full flex flex-col overflow-hidden bg-white border-[6px] border-white">
      <div className="flex items-center gap-[1.4cqw] px-[2.4cqw] h-[8.5cqw] shrink-0 bg-[#F4F2EF]">
        <span className="grid place-items-center w-[4.4cqw] h-[4.4cqw] rounded-[1cqw] bg-[#4A1F24] text-white sm-serif text-[3cqw] leading-none">S</span>
        <span className="flex flex-col leading-tight">
          <span className="sm-serif text-[2.3cqw] text-[#3A1A1E]">SwatchMaker</span>
          <span className="sm-sans text-[1.5cqw] text-[#6B5F5A]">See any paints together before you buy</span>
        </span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-[1.33fr_1fr_1fr] grid-rows-[minmax(0,1fr)]">
        <div className="relative min-h-0">
          <img src="/work/swatchmaker/wallpaper.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="relative grid">
          <Panel s={swatches[0]} />
          <span className="sm-sans absolute left-[2cqw] bottom-[2cqw] whitespace-nowrap rounded-full bg-white/45 px-[1.4cqw] py-[0.7cqw] text-[1.5cqw] text-[#2B2A26]">
            Hit <span className="rounded-[0.6cqw] bg-white/80 px-[0.8cqw] py-[0.2cqw]">Space</span> for new colours
          </span>
        </div>
        <div className="grid grid-rows-2 min-h-0">
          <Panel s={swatches[1]} middle />
          <Panel s={swatches[2]} />
        </div>
      </div>
    </div>
  );
}
