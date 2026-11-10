import { LiveArrow } from './LiveCharts';

/*
 * A mock-up of how I work: a chat in Claude on the left, and the artefact it made on the right,
 * which is a real chart drawn live by the Graphy SDK. Drawn in this site's style, not a screenshot.
 */
export default function ClaudeMock() {
  return (
    <div className="border-[3px] border-[var(--ink)] bg-white shadow-[0_4px_0_var(--ink)] overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 h-10 border-b-2 border-[var(--ink)] bg-[var(--c-grey)]">
        <span className="w-3 h-3 rounded-full border-2 border-[var(--ink)] bg-[var(--c-pink)]" />
        <span className="w-3 h-3 rounded-full border-2 border-[var(--ink)] bg-[var(--c-yellow)]" />
        <span className="w-3 h-3 rounded-full border-2 border-[var(--ink)] bg-[var(--c-green)]" />
        <span className="ml-3 text-[13px] font-bold">Claude</span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* The chat */}
        <div className="flex flex-col gap-4 p-4 md:p-5 bg-[#FBF8F3] md:border-r-2 border-[var(--ink)] text-[14px] leading-[1.5]">
          <div className="self-end max-w-[90%] rounded-2xl rounded-br-md bg-[var(--c-grey)] px-4 py-3">
            Using the Graphy SDK, put a difference arrow on our weekly downloads, from 25 Oct to 1 Nov.
          </div>
          <div className="max-w-[95%] text-[var(--ink-soft)]">
            <p>
              Here&rsquo;s the real chart with the arrow on it. The SDK works the change out itself: up 67% on the week before.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border-2 border-[var(--ink)] bg-white px-3 py-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--c-accent)] border-2 border-[var(--ink)]" aria-hidden>
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 13V8M8 13V3M13 13V6" />
              </svg>
            </span>
            <span>
              <span className="block font-bold">Weekly downloads</span>
              <span className="block text-[12px] text-[var(--ink-soft)]">Artefact · React</span>
            </span>
          </div>
          <div className="mt-auto rounded-xl border-2 border-[var(--ink)]/25 bg-white px-4 py-3 text-[var(--ink-soft)]/70">
            Reply to Claude&hellip;
          </div>
        </div>

        {/* The artefact: a real, live chart */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 h-11 border-y-2 md:border-t-0 border-[var(--ink)] text-[13px]">
            <span className="font-bold truncate">Weekly downloads</span>
            <span className="flex rounded-full border-2 border-[var(--ink)] overflow-hidden text-[12px] font-bold">
              <span className="px-3 py-0.5 bg-[var(--c-accent)]">Preview</span>
              <span className="px-3 py-0.5">Code</span>
            </span>
          </div>
          <div className="flex-1 min-h-[380px] p-3 md:p-4 [&>div]:border-0 [&>div]:h-full">
            <LiveArrow />
          </div>
        </div>
      </div>
    </div>
  );
}
