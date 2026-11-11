import { useState } from 'react';
import { GraphProvider, createSpec, pipe, geom, scale, config, styles, style, annotation } from '@graphysdk/react';
import { EditableGraphRenderer } from '@graphysdk/react/editable';

/*
 * A working point-and-edit prototype, using the real Graphy SDK's editor.
 * Click a bar, an axis or the legend and its controls open right there.
 * Data: @graphysdk/react weekly downloads from npm's public API.
 */

const weekly: [string, number][] = [
  ['2026-08-16', 3262], ['2026-08-23', 1533], ['2026-08-30', 8103], ['2026-09-06', 1736],
  ['2026-09-13', 3207], ['2026-09-20', 3606], ['2026-09-27', 5721], ['2026-10-04', 6837],
  ['2026-10-11', 5200], ['2026-10-18', 3963], ['2026-10-25', 5860], ['2026-11-01', 9795],
];

const data = {
  columns: [
    { key: 'week', label: 'Week' },
    { key: 'downloads', label: 'Downloads' },
  ],
  rows: weekly.map(([week, downloads]) => ({ week, downloads })),
};

const ink = '#2B2340';

const house = styles({
    defaults: [
      style.graph({ fill: '#FFFDF9', textColor: ink, fontFamily: 'Silka, system-ui, sans-serif', cornerRadius: 0 }),
      style.heading({ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 800, textColor: ink }),
      style.geom.bar({ fill: '#C3B3EE', stroke: ink, strokeWidth: 2, cornerRadius: 0 }),
      style.gridLine({ stroke: '#E4DED6', dashArray: [] }),
    style.panelBorder({ strokeWidth: 0 }),
    style.tickLabel({ fontFamily: 'Silka, system-ui, sans-serif', fontWeight: 500, textColor: 'rgba(43, 35, 64, 0.7)', textOutlineWidth: 0 }),
    style.axisLabel({ fontFamily: 'Silka, system-ui, sans-serif', fontWeight: 500, textColor: '#2B2340' }),
    style.annotation.differenceArrow({ stroke: ink, strokeWidth: 2 }),
    ],
  });

const base = (title: string) =>
  pipe(
    createSpec({ x: 'week', y: 'downloads' }),
    geom.bar(),
    scale.x(),
    scale.y(),
    config({ content: { title, showTitle: true, subtitle: 'Graphy React SDK, weekly npm downloads', showSubtitle: true } })
  );

const specs = {
  edit: pipe(base('Try it: click a bar'), house),
  annotate: pipe(
    base('Try it: drag the arrow'),
    annotation.differenceArrow({
      start: { anchorValue: '2026-10-25' },
      end: { anchorValue: '2026-11-01' },
      label: 'relativeDifference',
    }),
    house
  ),
};

export default function LiveEdit({ mode = 'edit' }: { mode?: 'edit' | 'annotate' }) {
  const start = specs[mode];
  const [spec, setSpec] = useState(start);
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="h-[460px] border-[3px] border-[var(--ink)] bg-[var(--paper)]">
        <GraphProvider key={key} spec={spec} data={data} onSpecChange={setSpec}>
          <EditableGraphRenderer mode={mode} />
        </GraphProvider>
      </div>
      <button
        type="button"
        className="mt-3 text-[14px] font-bold underline underline-offset-4"
        onClick={() => {
          setSpec(start);
          setKey((k) => k + 1);
        }}
      >
        Reset the chart
      </button>
    </div>
  );
}
