import { useId } from "react";

/**
 * The route as three map pins down a dotted line — India, Australia,
 * Singapore — each with its flag in the pin head and its name beside it.
 *
 * Purely a picture of a sentence the page already says: the list is
 * aria-hidden, and the section keeps a visually hidden heading with the
 * same three names, so a screen reader hears them once.
 *
 * The flags are drawn here rather than taken from emoji, which Windows
 * renders as bare letters. Each is composed for a circle the way round flag
 * icons usually are: Australia keeps the Union Jack top-left, the
 * Commonwealth Star below it and the Southern Cross on the right.
 */

type Place = "india" | "australia" | "singapore";

const STOPS: { key: Place; name: string }[] = [
  { key: "india", name: "India" },
  { key: "australia", name: "Australia" },
  { key: "singapore", name: "Singapore" },
];

/** A star as a path: `points` tips, inner radius 4/9 of outer as on the Australian flag. */
function star(cx: number, cy: number, r: number, points: number, inner = (r * 4) / 9) {
  const d: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 ? inner : r;
    const angle = -Math.PI / 2 + (Math.PI * i) / points;
    d.push(`${(cx + radius * Math.cos(angle)).toFixed(2)} ${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${d.join("L")}Z`;
}

/* Each flag is drawn in a 28 x 28 box. */

function India() {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 24;
    return `M14 14L${(14 + 3.6 * Math.cos(a)).toFixed(2)} ${(14 + 3.6 * Math.sin(a)).toFixed(2)}`;
  }).join("");
  return (
    <>
      <rect width="28" height="9.34" fill="#FF9933" />
      <rect y="9.33" width="28" height="9.34" fill="#FFFFFF" />
      <rect y="18.66" width="28" height="9.34" fill="#138808" />
      <circle cx="14" cy="14" r="3.6" fill="none" stroke="#000080" strokeWidth="0.7" />
      <path d={spokes} stroke="#000080" strokeWidth="0.25" />
      <circle cx="14" cy="14" r="0.7" fill="#000080" />
    </>
  );
}

function Australia({ id }: { id: string }) {
  return (
    <>
      <rect width="28" height="28" fill="#00008B" />
      <clipPath id={`${id}-canton`}>
        <rect width="14" height="14" />
      </clipPath>
      <g clipPath={`url(#${id}-canton)`}>
        <path d="M0 0L14 14M14 0L0 14" stroke="#FFFFFF" strokeWidth="2.8" />
        <path d="M0 0L14 14M14 0L0 14" stroke="#C8102E" strokeWidth="0.95" />
        <path d="M7 0V14M0 7H14" stroke="#FFFFFF" strokeWidth="4.6" />
        <path d="M7 0V14M0 7H14" stroke="#C8102E" strokeWidth="2.8" />
      </g>
      <g fill="#FFFFFF">
        <path d={star(7, 21, 4.2, 7)} />
        <path d={star(21, 23.6, 2.2, 7)} />
        <path d={star(16.6, 14.6, 2, 7)} />
        <path d={star(21, 5.6, 2, 7)} />
        <path d={star(25.2, 12.4, 2, 7)} />
        <path d={star(23.2, 17, 1.1, 5)} />
      </g>
    </>
  );
}

function Singapore() {
  const stars = [0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (Math.PI * 2 * i) / 5;
    return star(11.7 + 2.5 * Math.cos(a), 7.6 + 2.5 * Math.sin(a), 0.95, 5, 0.38);
  });
  return (
    <>
      <rect width="28" height="14" fill="#EF3340" />
      <rect y="14" width="28" height="14" fill="#FFFFFF" />
      <circle cx="8" cy="7.6" r="5" fill="#FFFFFF" />
      <circle cx="10" cy="7.6" r="4.6" fill="#EF3340" />
      <path d={stars.join("")} fill="#FFFFFF" />
    </>
  );
}

function Pin({ place }: { place: Place }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 52" className="h-[62px] w-12 shrink-0 overflow-visible" aria-hidden focusable="false">
      <path
        d="M20 51C20 51 2 32 2 20a18 18 0 0 1 36 0C38 32 20 51 20 51Z"
        className="fill-accent"
      />
      <clipPath id={`${id}-head`}>
        <circle cx="14" cy="14" r="14" />
      </clipPath>
      <g transform="translate(6 6)" clipPath={`url(#${id}-head)`}>
        {place === "india" && <India />}
        {place === "australia" && <Australia id={id} />}
        {place === "singapore" && <Singapore />}
      </g>
      {/* A thin ring between pin and flag, so a red flag never melts into the orange. */}
      <circle cx="20" cy="20" r="14.4" fill="none" className="stroke-paper" strokeWidth="1.3" />
    </svg>
  );
}

/*
 * Fixed geometry, so the curve can be drawn once without measuring anything.
 * A pin is 48 x 62 px; each row is ROW px tall; each pin sits `x` px in from
 * the left, which staggers them and lets the route swing between them.
 */
const ROW = 112;
const PIN_W = 48;
const PIN_H = 62;
const X = [0, 44, 6];

/** One leg: from a pin's tip, curving down to the top of the next pin's head. */
function leg(i: number) {
  const x1 = X[i] + PIN_W / 2;
  const y1 = i * ROW + PIN_H;
  const x2 = X[i + 1] + PIN_W / 2;
  const y2 = (i + 1) * ROW + 3;
  const bend = (y2 - y1) * 0.75;
  return `M${x1} ${y1}C${x1} ${y1 + bend} ${x2} ${y2 - bend} ${x2} ${y2}`;
}

export default function RoutePins() {
  const height = (STOPS.length - 1) * ROW + PIN_H;
  return (
    <ol aria-hidden className="relative mt-7 md:mt-9" style={{ height }}>
      {/* The route, behind the pins. Round caps on a zero-length dash make dots. */}
      <svg
        className="pointer-events-none absolute left-0 top-0 overflow-visible"
        width={Math.max(...X) + PIN_W}
        height={height}
        focusable="false"
      >
        <path
          d={STOPS.slice(0, -1).map((_, i) => leg(i)).join("")}
          fill="none"
          className="stroke-accent/70"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0 7"
        />
      </svg>

      {STOPS.map((stop, i) => (
        <li
          key={stop.key}
          className="absolute left-0 flex items-start gap-5"
          style={{ top: i * ROW, transform: `translateX(${X[i]}px)` }}
        >
          <Pin place={stop.key} />
          <span className="flex h-12 items-center whitespace-nowrap font-display text-[1.9rem] font-normal leading-none tracking-[-0.02em] md:text-[2.6rem]">
            {stop.name}
          </span>
        </li>
      ))}
    </ol>
  );
}
