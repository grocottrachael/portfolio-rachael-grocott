import { LiveArrow } from './LiveCharts';

/*
 * A mock-up of how I work: the Claude Code app, with a session editing a real chart through the
 * Graphy SDK, and a preview panel on the right that is the real chart, drawn live.
 * Drawn in this site's colours, not a screenshot.
 */
const recents = ['Difference arrow', 'Annotating edge cases', 'Long label wrapping', 'Empty data states', 'Legend placement'];

export default function ClaudeMock() {
  return (
    <div className="border-[3px] border-[var(--ink)] bg-[#1F1A2E] text-[#EDE8F7] shadow-[0_4px_0_var(--ink)] overflow-hidden text-[12px] leading-[1.5]">
      <div className="grid md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1.15fr)] min-h-[440px]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 border-r border-white/10 bg-[#19152A] p-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-pink)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-yellow)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-green)]" />
            </span>
          </div>
          <span className="font-display text-[17px] mb-2">Code</span>
          <span className="flex items-center gap-2 py-1 text-white/80">
            <span className="text-[14px] leading-none">+</span> New
          </span>
          <span className="py-1 text-white/80">Search</span>
          <span className="mt-3 mb-1 text-[11px] text-white/45">Recents</span>
          {recents.map((r, i) => (
            <span key={r} className={`truncate rounded-md px-2 py-1 -mx-2 ${i === 0 ? 'bg-white/10 text-white' : 'text-white/65'}`}>
              {r}
            </span>
          ))}
        </aside>

        {/* The session */}
        <div className="flex flex-col min-w-0 border-r border-white/10">
          <div className="flex items-center h-10 px-4 border-b border-white/10 font-bold truncate">Difference arrow</div>
          <div className="flex-1 flex flex-col gap-3 p-4">
            <div className="self-end max-w-[92%] rounded-xl bg-white/10 px-3 py-2">
              Add a difference arrow to the downloads chart, from 25 Oct to 1 Nov, showing the percentage change
            </div>
            <p className="text-white/50">Read DownloadsChart.tsx ›</p>
            <p className="text-white/50">
              Edited DownloadsChart.tsx <span className="text-[#9BD3A2]">+5</span> ›
            </p>
            <p>
              Done. I used the SDK&rsquo;s difference arrow, so it works the change out itself: it reads{' '}
              <span className="text-[var(--c-yellow)]">+67.15%</span>. It&rsquo;s live in the preview.
            </p>
            <p>Want me to check it with long labels and an empty week too?</p>
          </div>
          <div className="m-3 mt-auto rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-white/40">
            Reply&hellip;
          </div>
        </div>

        {/* Preview panel: a real, live chart */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center justify-between h-10 px-4 border-b border-white/10">
            <span className="font-bold">Preview</span>
            <span className="text-white/45">localhost:5173</span>
          </div>
          <div className="flex-1 min-h-[360px] p-2 [&>div]:border-0 [&>div]:h-full">
            <LiveArrow />
          </div>
        </div>
      </div>
    </div>
  );
}
