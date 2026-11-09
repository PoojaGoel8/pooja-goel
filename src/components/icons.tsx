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
  | "ai";

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
