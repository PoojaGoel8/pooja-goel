/**
 * Shared vocabulary for the page figures.
 *
 * Both the AI Enablement and Work figures are drawn rather than placed as
 * images: they use the site's palette, match the 1.4 stroke weight of
 * components/icons, and stay sharp at any size. These are the pieces they
 * have in common, so the two read as one family.
 */

/** A database cylinder — the shape most of this site is ultimately about. */
export function Cylinder({ x, y, rx = 21 }: { x: number; y: number; rx?: number }) {
  const ry = rx * 0.35;
  const h = rx * 1.24;
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={rx} ry={ry} />
      <path
        d={`M${-rx} 0v${h}c0 ${ry * 1.55} ${rx * 0.47} ${ry} ${rx} ${ry}s${rx} ${-ry * 0.45} ${rx} ${-ry}V0`}
      />
      <path
        d={`M${-rx} ${h / 2}c0 ${ry * 1.55} ${rx * 0.47} ${ry} ${rx} ${ry}s${rx} ${-ry * 0.45} ${rx} ${-ry}`}
      />
    </g>
  );
}

/** The small caption under each panel, in the same key as the page eyebrows. */
export function FigureLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="fill-muted font-sans text-[13px] uppercase"
      style={{ letterSpacing: "0.1em" }}
    >
      {children}
    </text>
  );
}

/** Shared attributes for a figure's root svg. */
export const figureProps = {
  className: "w-full",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
