/**
 * The figure beside the tutoring band.
 *
 * It draws the band's own claim rather than a lectern or an open book: a
 * question branches into several explanations, the prepared one is dashed and
 * goes nowhere in particular, and the one that lands is somewhere else. Same
 * frame and caption vocabulary as the Work and AI figures.
 *
 * Deliberately not another line chart — those two pages already have one each,
 * and a third would make the set look like one idea repeated.
 */

import { FigureLabel, figureProps } from "./figures";

/** Where each explanation ends up along the bottom. */
const BRANCHES = [72, 164, 256, 348];
const PREPARED = 164;
const LANDS = 256;

export default function TutoringDiagram() {
  return (
    <svg
      viewBox="0 0 420 330"
      role="img"
      aria-label="A question branching into four explanations: the prepared one is dashed, and the one that lands is a different branch."
      {...figureProps}
    >
      <rect
        x="0.7"
        y="0.7"
        width="418.6"
        height="328.6"
        rx="3"
        className="fill-paper stroke-rule"
      />

      <g className="text-graphite">
        {/* The question. */}
        <circle cx="210" cy="58" r="15" />
        <circle cx="210" cy="58" r="4.5" className="fill-graphite" stroke="none" />

        {BRANCHES.map((x) => {
          const lands = x === LANDS;
          const prepared = x === PREPARED;
          return (
            <path
              key={x}
              d={`M210 73C210 140 ${x} 150 ${x} 213`}
              className={lands ? "stroke-accent" : "stroke-rule"}
              strokeWidth={lands ? 1.8 : 1.4}
              strokeDasharray={prepared ? "6 6" : undefined}
            />
          );
        })}

        {BRANCHES.map((x) => {
          const lands = x === LANDS;
          return (
            <circle
              key={x}
              cx={x}
              cy={228}
              r="15"
              className={lands ? "fill-accent-soft/70 stroke-accent" : "stroke-rule"}
            />
          );
        })}

        {/* The one that lands. */}
        <path d={`M${LANDS - 6} 228l4.5 4.5 8-9`} className="stroke-accent" strokeWidth="1.8" />

        <text
          x={PREPARED}
          y="262"
          textAnchor="middle"
          className="fill-muted font-sans text-[11px] uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          Prepared
        </text>
        <text
          x={LANDS}
          y="262"
          textAnchor="middle"
          className="fill-accent font-sans text-[11px] uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          Lands
        </text>
      </g>

      <FigureLabel x={210} y={302}>The explanation that works</FigureLabel>
    </svg>
  );
}
