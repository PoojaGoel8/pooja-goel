/**
 * Inline icon set, drawn rather than pulled from a library — six glyphs do not
 * justify a dependency, and inline SVG inherits the accent colour and scales
 * with the type.
 *
 * All are 24x24, stroked not filled, so they sit at the same visual weight as
 * the surrounding text.
 */

export type IconName =
  | "database"
  | "pulse"
  | "migration"
  | "shield"
  | "automation"
  | "ai"
  | "palette"
  | "frame"
  | "note"
  | "hammock"
  | "book"
  | "compass"
  | "signal"
  | "spark";

const paths: Record<IconName, React.ReactNode> = {
  // Stacked storage — databases and cloud estates.
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
      <path d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
    </>
  ),
  // A monitoring trace — operations and reliability.
  pulse: (
    <>
      <path d="M2.5 12.5h4l2.4-6.4 4.2 12.3 2.3-5.9h6.1" />
    </>
  ),
  // Two passing arrows — moving an estate, and tuning what is left.
  migration: (
    <>
      <path d="M3.5 8.5h13" />
      <path d="M13 5l3.5 3.5L13 12" />
      <path d="M20.5 15.5h-13" />
      <path d="M11 12l-3.5 3.5L11 19" />
    </>
  ),
  // Shield with a keyhole — access control and governance.
  shield: (
    <>
      <path d="M12 2.8l7.2 3v5.3c0 4.5-3 8.4-7.2 10.1-4.2-1.7-7.2-5.6-7.2-10.1V5.8l7.2-3z" />
      <circle cx="12" cy="10.6" r="1.5" />
      <path d="M12 12.1v2.6" />
    </>
  ),
  // Angle brackets — scripts, pipelines and tooling.
  automation: (
    <>
      <path d="M7.5 7.5L3 12l4.5 4.5" />
      <path d="M16.5 7.5L21 12l-4.5 4.5" />
      <path d="M13.8 5.5l-3.6 13" />
    </>
  ),
  // A small graph — models connected to the data underneath them.
  ai: (
    <>
      <circle cx="12" cy="4.8" r="2.1" />
      <circle cx="5" cy="18" r="2.1" />
      <circle cx="19" cy="18" r="2.1" />
      <path d="M12 6.9v3.8" />
      <path d="M12 10.7L6.4 16.3" />
      <path d="M12 10.7l5.6 5.6" />
    </>
  ),

  // A palette and its wells — face painting.
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.3 0 2.1-.8 2.1-1.9 0-.6-.25-1.05-.6-1.45-.35-.4-.6-.85-.6-1.4 0-1.1.85-1.95 1.95-1.95H16c2.75 0 5-2.25 5-5C21 5.6 17 3 12 3z" />
      <circle cx="7.6" cy="11.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.1" cy="7.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.9" cy="7.4" r="1" fill="currentColor" stroke="none" />
    </>
  ),

  // A portrait in its frame — commissioned work.
  frame: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.2" />
      <circle cx="12" cy="9.6" r="2.2" />
      <path d="M7.6 17.8c1.1-2.2 2.6-3.3 4.4-3.3s3.3 1.1 4.4 3.3" />
    </>
  ),

  // Beamed notes — dance.
  note: (
    <>
      <circle cx="7" cy="17.8" r="2.3" />
      <circle cx="17.2" cy="15.4" r="2.3" />
      <path d="M9.3 17.8V6.4l10.2-2.2v11.2" />
      <path d="M9.3 9.6l10.2-2.2" />
    </>
  ),

  // Fabric slung from a rig — aerial. A shallow, wide arc: a deeper curve
  // reads as a funnel at this size.
  hammock: (
    <>
      <path d="M3 5.5h18" />
      <path d="M7 5.5Q7 15.5 12 15.5Q17 15.5 17 5.5" />
    </>
  ),

  // A compass rose — mentoring, which is mostly pointing.
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z" />
    </>
  ),

  // Carrying something outward — the ambassador work.
  signal: (
    <>
      <circle cx="12" cy="12" r="2.3" />
      <path d="M7.9 7.9a5.8 5.8 0 000 8.2" />
      <path d="M16.1 16.1a5.8 5.8 0 000-8.2" />
      <path d="M5 5a9.9 9.9 0 000 14" />
      <path d="M19 19a9.9 9.9 0 000-14" />
    </>
  ),

  // A small star and a smaller one — the thing you hope to set off.
  spark: (
    <>
      <path d="M10 3.4l1.7 4.4 4.4 1.7-4.4 1.7L10 15.6l-1.7-4.4L3.9 9.5l4.4-1.7z" />
      <path d="M17.6 14.6l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),

  // An open book — tutoring.
  book: (
    <>
      <path d="M12 6.6C10.4 5.3 8.3 4.6 6 4.6H3.6v12.8H6c2.3 0 4.4.7 6 2" />
      <path d="M12 6.6c1.6-1.3 3.7-2 6-2h2.4v12.8H18c-2.3 0-4.4.7-6 2" />
      <path d="M12 6.6v14.8" />
    </>
  ),
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
