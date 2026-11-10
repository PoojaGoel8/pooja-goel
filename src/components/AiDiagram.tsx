/**
 * The four-panel figure beside the AI Enablement headline.
 *
 * Drawn here rather than placed as an image so it uses the site's own palette
 * and stays sharp at any size — it is a few kB of SVG against a raster that
 * would need two resolutions and still look foreign next to the type. The
 * stroke weight matches components/icons, so it reads as part of the same set.
 *
 * The four panels are the real strands of the work on this page, not generic
 * AI iconography: the knowledge assistant, agentic monitoring, the automated
 * DBA workflows, and the retrieval groundwork underneath them.
 */

/** A four-point sparkle — the one piece of shorthand repeated in each panel. */
function Spark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-8Q1.2-1.2 8 0Q1.2 1.2 0 8Q-1.2 1.2-8 0Q-1.2-1.2 0-8Z"
      className="fill-accent"
      stroke="none"
    />
  );
}

/** A database cylinder, the shape every panel is ultimately about. */
function Cylinder({ x, y, rx = 21 }: { x: number; y: number; rx?: number }) {
  const ry = rx * 0.35;
  const h = 26;
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={rx} ry={ry} />
      <path d={`M${-rx} 0v${h}c0 ${ry * 1.55} ${rx * 0.47} ${ry} ${rx} ${ry}s${rx} ${-ry * 0.45} ${rx} ${-ry}V0`} />
      <path d={`M${-rx} ${h / 2}c0 ${ry * 1.55} ${rx * 0.47} ${ry} ${rx} ${ry}s${rx} ${-ry * 0.45} ${rx} ${-ry}`} />
    </g>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
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

export default function AiDiagram() {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="Four strands of the work: a knowledge assistant, agentic monitoring, automated workflows, and grounded retrieval."
      className="w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="0.7"
        y="0.7"
        width="418.6"
        height="418.6"
        rx="3"
        className="fill-paper stroke-rule"
      />
      <path d="M210 8V412M8 210H412" className="stroke-rule" />

      {/* ---------------------------------------------- knowledge assistant */}
      <g transform="translate(105 96)" className="text-graphite">
        <Cylinder x={-44} y={-14} rx={18} />
        <path d="M-16 4h14" className="stroke-rule" />
        <path d="M-6 0l4 4-4 4" className="stroke-rule" />
        <path d="M8-18h52a7 7 0 017 7v24a7 7 0 01-7 7H28l-11 11V20H8a7 7 0 01-7-7v-24a7 7 0 017-7z" />
        <circle cx="20" cy="1" r="2.6" className="fill-graphite" stroke="none" />
        <circle cx="34" cy="1" r="2.6" className="fill-graphite" stroke="none" />
        <circle cx="48" cy="1" r="2.6" className="fill-accent" stroke="none" />
        <Spark x={64} y={-44} s={0.85} />
      </g>
      <Label x={105} y={178}>Knowledge assistant</Label>

      {/* ---------------------------------------------- agentic monitoring */}
      <g transform="translate(315 96)" className="text-graphite">
        <path d="M-58-46V34H58" className="stroke-rule" />
        <path d="M-48 20l20-10 18 7 18-33 16 20 24-9" />
        <circle cx="8" cy="-16" r="11" className="fill-accent/15" stroke="none" />
        <circle cx="8" cy="-16" r="5" className="fill-accent stroke-paper" strokeWidth="2" />
        <Spark x={54} y={-42} s={0.85} />
      </g>
      <Label x={315} y={178}>Agentic monitoring</Label>

      {/* ---------------------------------------------- automated workflows */}
      <g transform="translate(105 306)" className="text-graphite">
        {[-30, -4, 22].map((dy) => (
          <g key={dy}>
            <path d={`M-50 ${dy}l5 5 9-11`} className="stroke-accent" />
            <rect x="-26" y={dy - 9} width="72" height="18" rx="4" className="stroke-rule" />
            <path d={`M-18 ${dy}h34`} className="stroke-rule" />
          </g>
        ))}
        <path d="M46-30h6a8 8 0 018 8v36a8 8 0 01-8 8h-6" className="stroke-rule" />
        <path d="M52 17l-6 5 6 5" className="stroke-rule" />
        <Spark x={58} y={-44} s={0.85} />
      </g>
      <Label x={105} y={388}>DBA automation</Label>

      {/* ---------------------------------------------- grounded retrieval */}
      <g transform="translate(315 300)" className="text-graphite">
        <path d="M-26-36L0-6M4-44L0-6M34-30L0-6" className="stroke-accent/40" />
        {[
          [-44, -22],
          [-26, -36],
          [-8, -18],
          [4, -44],
          [20, -26],
          [34, -30],
          [46, -14],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx},${cy}`}
            cx={cx}
            cy={cy}
            r="3.4"
            className={
              cy === -36 || cy === -44 || cy === -30 ? "fill-accent" : "fill-rule"
            }
            stroke="none"
          />
        ))}
        <Cylinder x={0} y={-4} rx={21} />
        <Spark x={56} y={-48} s={0.85} />
      </g>
      <Label x={315} y={388}>Grounded retrieval</Label>
    </svg>
  );
}
