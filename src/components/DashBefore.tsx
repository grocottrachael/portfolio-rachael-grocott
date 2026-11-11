/*
 * Geckoboard TV dashboards, redrawn in code with made-up names and numbers.
 * Before: a customer dashboard from before grouping, every widget the same weight.
 * After: the same kind of dashboard with groups, the most important number biggest.
 * Sizes are in container units, so each scales like a screenshot.
 */
const people = [['Amy Clarke', 4547], ['Ben Ortiz', 5589], ['Chloe Hart', 384], ['Dev Patel', 10725], ['Ella Moss', 1182], ['Finn Doyle', 5677]] as const;
const people2 = [['Amy Clarke', 730], ['Ben Ortiz', 1049], ['Chloe Hart', 4709], ['Gita Rao', 2770], ['Dev Patel', 7906], ['Ella Moss', 3660], ['Finn Doyle', 8959]] as const;
const stages = [['Counts', 42], ['Hot prospect', 105], ['Order sent', 13], ['Order signed', 5], ['Output', 5], ['To invoice', 11]] as const;
const gbp = (n: number) => '£' + n.toLocaleString('en-GB');

const tile = 'bg-[#2E2E30] p-[1.8cqw] flex flex-col min-h-0 overflow-hidden';

function Bars({ rows, max, money = true }: { rows: readonly (readonly [string, number])[]; max: number; money?: boolean }) {
  return (
    <ul className="flex-1 flex flex-col justify-around">
      {rows.map(([name, v]) => (
        <li key={name}>
          <div className="flex justify-between"><span>{name}</span><span>{money ? gbp(v) : v}</span></div>
          <div className="mt-[0.3cqw] h-[0.4cqw] bg-white/10"><div className="h-full bg-[#4DA3E8]" style={{ width: `${(v / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

function Big({ value, label, grow }: { value: string; label: string; grow: number }) {
  return (
    <div className={`${tile} justify-center`} style={{ flex: grow }}>
      <p className="flex items-baseline gap-[1.2cqw]"><span className="text-[4.2cqw] leading-none">{value}</span><span className="text-[1.7cqw] leading-tight">{label}</span></p>
    </div>
  );
}

const col = 'flex flex-col gap-[0.7cqw] min-h-0';

export function DashBefore() {
  return (
    <div className="[container-type:inline-size] border-[3px] border-[var(--ink)] bg-[#111] text-white/90 font-sans">
      <div className="aspect-[1173/640] flex flex-col p-[0.7cqw] gap-[0.7cqw] text-[1.3cqw] leading-tight">
        <div className="flex-1 grid grid-cols-3 gap-[0.7cqw] min-h-0">
          <div className={col}>
            <div className={`${tile} items-center`} style={{ flex: 1.1 }}>
              <span className="self-start">GPM total – this month</span>
              <span className="text-[3.4cqw] leading-none mt-[0.6cqw]">£28,107</span>
              <svg viewBox="0 0 100 54" className="w-[34%] mt-[0.8cqw]"><path d="M10 50a40 40 0 0 1 80 0" fill="none" stroke="#DDD" strokeWidth="12" /><path d="M50 50 60 14" stroke="#DDD" strokeWidth="3" /></svg>
            </div>
            <div className={tile} style={{ flex: 1.6 }}><Bars rows={people} max={11000} /></div>
            <Big value="£6,930" label="Unaccounted" grow={0.55} />
          </div>
          <div className={col}>
            <div className={`${tile} justify-center`} style={{ flex: 1.1 }}>
              <span className="text-[6.2cqw] leading-none">15:19</span>
              <span className="text-[1.9cqw] mt-[0.8cqw]">Wednesday<br />25 Jul 2018</span>
            </div>
            <div className={`${tile} justify-center items-center text-[2.4cqw] font-bold text-white/60`} style={{ flex: 0.55 }}>Logo</div>
            <div className={tile} style={{ flex: 1.6 }}><span className="text-[1.6cqw] mb-[0.4cqw]">Opp stages</span><Bars rows={stages} max={110} money={false} /></div>
          </div>
          <div className={col}>
            <Big value="£29,786" label="Pipeline – this month" grow={0.55} />
            <div className={tile} style={{ flex: 2.15 }}><Bars rows={people2} max={9500} /></div>
            <Big value="£30,284" label="Pipeline – next month" grow={0.55} />
          </div>
        </div>
        <div className="flex items-center justify-between px-[1cqw] py-[1cqw] text-[1.7cqw]"><span>Sales dashboard</span><span className="text-[1cqw] text-white/50">Powered by Geckoboard</span></div>
      </div>
    </div>
  );
}

/* A little line chart: a white line, gridlines, and a dotted end for the unfinished period */
function Line({ pts }: { pts: number[] }) {
  const n = pts.length, x = (i: number) => (i / (n - 1)) * 100, y = (v: number) => 34 - v * 30;
  const d = pts.slice(0, -1).map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="w-full h-[5.5cqw] mt-[0.6cqw]">
      {[2, 18, 34].map((g) => <line key={g} x1="0" x2="100" y1={g} y2={g} stroke="white" strokeOpacity=".2" strokeWidth=".4" />)}
      <polyline points={d} fill="none" stroke="white" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <polyline points={`${x(n - 2)},${y(pts[n - 2])} ${x(n - 1)},${y(pts[n - 1])}`} fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const up = <span className="inline-block w-0 h-0 border-x-[0.9cqw] border-x-transparent border-b-[1.1cqw] border-b-[#6CCB5F] mr-[0.6cqw]" />;
const down = <span className="inline-block w-0 h-0 border-x-[0.9cqw] border-x-transparent border-t-[1.1cqw] border-t-[#E5484D] mr-[0.6cqw]" />;
const atile = 'bg-[#2F3E4C] p-[1.6cqw] flex flex-col min-h-0 overflow-hidden relative';
const period = (t: string) => <span className="absolute top-[1.4cqw] right-[1.6cqw] text-[1.3cqw] text-white/80">▣ {t}</span>;

export function DashAfter() {
  return (
    <div className="[container-type:inline-size] border-[3px] border-[var(--ink)] bg-[#1E2730] text-white font-sans">
      <div className="aspect-[1121/630] grid grid-cols-[53fr_27fr_18fr] gap-[0.8cqw] p-[0.8cqw] text-[1.3cqw] leading-tight">
        <div className="grid grid-rows-[62fr_38fr] gap-[0.8cqw] min-h-0">
          <div className={`${atile} items-center justify-between`}>
            {period('30d')}
            <div className="text-center mt-[2cqw]"><p className="text-[10cqw] leading-none font-light">2,878</p><p className="text-[2.4cqw] mt-[0.6cqw]">MAU, last 30 days</p></div>
            <div className="w-full grid grid-cols-3 items-end text-center text-[1.15cqw] uppercase">
              <div><svg viewBox="0 0 60 20" className="w-[80%] mx-auto"><polyline points="0,14 6,6 10,16 14,3 18,15 22,10 26,17 30,6 34,12 40,4 44,14 50,3 56,2 60,14" fill="none" stroke="white" strokeWidth="1" /></svg><p className="mt-[0.4cqw]">Trend</p></div>
              <div><p className="text-[3.4cqw] normal-case text-[#6CCB5F]">{up}31%</p><p className="mt-[0.4cqw]">vs previous</p></div>
              <div><div className="h-[1.6cqw] bg-white/20 w-[80%] mx-auto"><div className="h-full w-[12%] bg-white" /></div><p className="mt-[0.4cqw]">Goal</p></div>
            </div>
          </div>
          <div className={`${atile} justify-center`}>
            <span className="absolute top-[1.2cqw] left-1/2 -translate-x-1/2 text-[2cqw]">Sign-ups</span>{period('30d')}
            <div className="grid grid-cols-2 items-center mt-[2cqw]">
              <div className="text-center"><p className="text-[7.5cqw] leading-none font-light">459</p><p className="text-[3cqw] text-[#6CCB5F] mt-[0.6cqw]">{up}16%</p></div>
              <ul className="space-y-[1.2cqw] text-[1.6cqw]">
                {[['web', 880], ['iOS', 379], ['Mac', 71]].map(([k, v]) => (
                  <li key={k} className="flex items-center gap-[1cqw]"><span className="w-[5cqw]">{k}</span><span className="h-[0.5cqw] bg-white/80" style={{ width: `${(+v / 880) * 13}cqw` }} /><span className="text-[1.3cqw]">{v}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${atile} justify-between`}>
          <span className="text-[2.2cqw]">Website</span>{period('90d')}
          {[['Active users by week', '9,819', '123%', false, [.5, .45, .45, .5, .5, .6, .58, .6, .7, .8, .9, .1]], ['Total web visitors', '9,819', '123%', false, [.05, .08, .1, .12, .2, .35, .3, .38, .6, .65, .75, .1]], ['Organic web visitors', '35.86%', '123%', true, [.3, .25, .2, .25, .22, .35, .3, .38, .5, .65, .8, .15]]].map(([t, v, c, good, pts]) => (
            <div key={t as string}>
              <p className="text-[1.15cqw] uppercase font-medium">{t as string}</p>
              <p className="mt-[0.4cqw] text-[1.6cqw]">{v as string} <span className={good ? 'text-[#6CCB5F]' : 'text-[#E5484D]'}>{good ? up : down}{c as string}</span> vs previous</p>
              <Line pts={pts as number[]} />
            </div>
          ))}
        </div>
        <div className="grid grid-rows-[33fr_67fr] gap-[0.8cqw] min-h-0">
          <div className={atile}>
            <span className="text-[2cqw]">Web</span>{period('30d')}
            <p className="mt-[0.8cqw] text-[2.8cqw] leading-none">8.5%</p><p className="text-[1.5cqw]">Converted new visitors</p>
            <p className="mt-auto text-[2cqw] text-[#E5484D]">{down}0.4%</p>
          </div>
          <div className={`${atile} justify-between`}>
            <span className="text-[2cqw]">Web</span>{period('7d')}
            <div><p className="text-[2.8cqw] leading-none">9.9%</p><p className="text-[1.5cqw]">Conversion</p><p className="mt-[0.8cqw] text-[2cqw] text-[#E5484D]">{down}0.4%</p></div>
            <div><p className="text-[2.8cqw] leading-none">59.9%</p><p className="text-[1.5cqw]">Bounce rate</p>
              <div className="mt-[1cqw] h-[0.9cqw] bg-white/20 rounded-full"><div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#2BB3E8] to-[#6CCB5F]" /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBefore;
