/**
 * The figure beside the Work headline.
 *
 * Three bands rather than the AI page's four panels, because this page tells
 * one story in sequence: an on-premises estate moves to Azure, separate
 * estates are consolidated into one, and the availability line runs unbroken
 * through both. Same frame, label and cylinder vocabulary as the AI figure,
 * so they read as a pair without being the same drawing twice.
 */

import { Cylinder, FigureLabel, figureProps } from "./figures";

export default function WorkDiagram() {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="Three strands of the work: an on-premises estate moved to Azure, separate estates consolidated into one, and availability held at 99.99 per cent through the move."
      {...figureProps}
    >
      <rect
        x="0.7"
        y="0.7"
        width="418.6"
        height="418.6"
        rx="3"
        className="fill-paper stroke-rule"
      />
      <path d="M8 140H412M8 280H412" className="stroke-rule" />

      {/* ------------------------------------------- on-premises to Azure */}
      <g transform="translate(210 58)" className="text-graphite">
        {[-25, -5, 15].map((y) => (
          <g key={y}>
            <rect x="-160" y={y} width="62" height="15" rx="3" />
            <circle cx="-151" cy={y + 7.5} r="2.2" className="fill-graphite" stroke="none" />
            <path d={`M-143 ${y + 7.5}h30`} className="stroke-rule" />
          </g>
        ))}

        <path d="M-88 0H8" className="stroke-accent" strokeDasharray="6 6" />
        <path d="M2-5l6 5-6 5" className="stroke-accent" />

        <path d="M58 20a19 19 0 01-2-37.8A28 28 0 01108-24a22 22 0 0122 21.6A19 19 0 01128 20Z" />
        <Cylinder x={95} y={-10} rx={13} />
      </g>
      <FigureLabel x={210} y={120}>On-premises to Azure</FigureLabel>

      {/* ------------------------------------------- estates consolidated */}
      <g transform="translate(210 198)" className="text-graphite">
        {[
          [-152, -30],
          [-152, -2],
          [-152, 26],
          [-108, -16],
          [-108, 12],
        ].map(([x, y]) => (
          <g key={`${x},${y}`}>
            <path d={`M${x + 10} ${y + 4}L40 2`} className="stroke-accent/35" />
            <Cylinder x={x} y={y} rx={9} />
          </g>
        ))}

        <path d="M44-3l6 5-6 5" className="stroke-accent" />
        <Cylinder x={100} y={-14} rx={22} />
      </g>
      <FigureLabel x={210} y={260}>Estates consolidated</FigureLabel>

      {/* ------------------------------------------------ availability held */}
      <g transform="translate(210 338)" className="text-graphite">
        <text
          x="0"
          y="-14"
          textAnchor="middle"
          className="fill-accent font-display text-[26px]"
          stroke="none"
        >
          99.99%
        </text>

        {/* The cutover. The line crosses it without a step — that is the point. */}
        <path d="M0-2V34" className="stroke-accent/55" strokeDasharray="5 5" />
        <path d="M-160 14H160" strokeWidth="1.6" />
        <circle cx="0" cy="14" r="4.5" className="fill-accent stroke-paper" strokeWidth="2" />
        <circle cx="-160" cy="14" r="2.6" className="fill-rule" stroke="none" />
        <circle cx="160" cy="14" r="2.6" className="fill-rule" stroke="none" />
      </g>
      <FigureLabel x={210} y={400}>Availability held</FigureLabel>
    </svg>
  );
}
