import { useMemo } from 'react';
import { GraphProvider, GraphRenderer, createSpec, pipe, geom, scale, config, styles, style } from '@graphysdk/react';

/*
 * Real Graphy charts, drawn live by the Graphy SDK, styled to this site.
 * Data: @graphysdk/react weekly downloads from npm's public API (api.npmjs.org),
 * weeks starting Sunday, 16 Aug to 1 Nov 2026.
 */

const weekly: [string, number][] = [
  ['2026-08-16', 3262], ['2026-08-23', 1533], ['2026-08-30', 8103], ['2026-09-06', 1736],
  ['2026-09-13', 3207], ['2026-09-20', 3606], ['2026-09-27', 5721], ['2026-10-04', 6837],
  ['2026-10-11', 5200], ['2026-10-18', 3963], ['2026-10-25', 5860], ['2026-11-01', 9795],
];

const toData = (rows: [string, number][], label: string) => ({
  columns: [
    { key: 'week', label: 'Week' },
    { key: 'downloads', label },
  ],
  rows: rows.map(([week, downloads]) => ({ week, downloads })),
});

const ink = '#2B2340';
/* This site's look, as a Graphy stylesheet */
const house = styles({
  defaults: [
    style.graph({ fill: '#FFFDF9', textColor: ink, fontFamily: 'Silka, system-ui, sans-serif', cornerRadius: 0 }),
    style.heading({ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 800, textColor: ink }),
    style.headline.item.number({ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 800, textColor: ink }),
    style.geom.bar({ fill: '#C3B3EE', stroke: ink, strokeWidth: 2, cornerRadius: 0 }),
    style.geom.area({ fill: '#C3B3EE', stroke: ink, strokeWidth: 2.5 }),
    style.gridLine({ stroke: '#E4DED6' }),
  ],
});

function Chart({ kind }: { kind: 'weekly' | 'total' }) {
  const { spec, data } = useMemo(() => {
    const weeklyChart = kind === 'weekly';
    return {
      data: toData(weekly, 'Downloads'),
      spec: pipe(
        createSpec({ x: 'week', y: 'downloads' }),
        weeklyChart ? geom.bar() : geom.area(),
        scale.x(),
        scale.y(),
        config({
          content: {
            title: weeklyChart ? 'Downloads, week by week' : 'Downloads since August',
            showTitle: true,
            source: { label: 'npm', url: 'https://www.npmjs.com/package/@graphysdk/react' },
            showSource: true,
          },
          headline: weeklyChart ? { show: 'current', compareWith: 'previous' } : { show: 'total' },
        }),
        house
      ),
    };
  }, [kind]);
  return (
    <div className="h-[440px] border-[3px] border-[var(--ink)] shadow-[0_4px_0_var(--ink)]">
      <GraphProvider spec={spec} data={data}>
        <GraphRenderer />
      </GraphProvider>
    </div>
  );
}

export default function LiveCharts() {
  return (
    <div className="grid gap-5">
      <Chart kind="weekly" />
      <Chart kind="total" />
    </div>
  );
}
