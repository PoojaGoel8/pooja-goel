import { useId, useState } from "react";

import { volunteering } from "../data/content";

/**
 * Volunteering as a timeline over an accordion.
 *
 * The timeline is a real chart, not decoration: bars sit at their actual
 * months, so the two roles that ran concurrently in 2021 visibly overlap and
 * the current one visibly reaches the right-hand edge. Clicking a bar opens
 * its row.
 *
 * The chart is aria-hidden and mouse-only. Everything it does is reachable
 * from the rows beneath it, which are real buttons, so it does not become a
 * second set of tab stops saying the same thing. It is also hidden below md:
 * its type is sized in viewBox units, and on a phone the labels would be
 * about four pixels tall.
 */

const FIRST_YEAR = 2021;
const LAST_YEAR = 2026;
const START = FIRST_YEAR * 12;
const SPAN = (LAST_YEAR - FIRST_YEAR + 1) * 12 - 1;

const W = 1000;
const TRACK_X = 282;
const TRACK_W = 698;
const ROW_H = 34;
const TOP = 20;
const AXIS_Y = TOP + volunteering.length * ROW_H + 16;
const H = AXIS_Y + 24;

const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const now = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
})();

const xAt = (ym: string) =>
  TRACK_X + Math.min(1, Math.max(0, (monthIndex(ym) - START) / SPAN)) * TRACK_W;

export default function Volunteering() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hidden w-full md:block"
        aria-hidden="true"
        focusable="false"
      >
        {Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => {
          const year = FIRST_YEAR + i;
          const x = xAt(`${year}-01`);
          return (
            <g key={year}>
              <path d={`M${x} ${TOP - 6}V${AXIS_Y}`} className="stroke-rule" strokeWidth="1" />
              <text
                x={x}
                y={AXIS_Y + 18}
                textAnchor="middle"
                className="fill-muted font-sans text-[14px]"
              >
                {year}
              </text>
            </g>
          );
        })}

        {volunteering.map((item, i) => {
          const on = i === open;
          const x1 = xAt(item.from);
          const x2 = xAt(item.to ?? now);
          const y = TOP + i * ROW_H;
          return (
            <g key={item.role} className="cursor-pointer" onClick={() => setOpen(i)}>
              <rect x="0" y={y - 4} width={W} height={ROW_H - 4} fill="transparent" />
              <text
                x="4"
                y={y + 15}
                className={[
                  "font-sans text-[15px] transition-colors",
                  on ? "fill-accent" : "fill-graphite",
                ].join(" ")}
              >
                {item.role}
              </text>
              <rect
                x={x1}
                y={y + 4}
                width={Math.max(10, x2 - x1)}
                height="14"
                rx="7"
                className={on ? "fill-accent" : "fill-accent-soft stroke-rule"}
                strokeWidth="1"
              />
              {item.to === null && (
                <circle cx={x2} cy={y + 11} r="4" className="fill-accent stroke-paper" strokeWidth="2" />
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-2 border-b border-rule md:mt-10">
        {volunteering.map((item, i) => (
          <Row key={item.role} item={item} open={i === open} onToggle={() => setOpen(i)} />
        ))}
      </div>
    </div>
  );
}

function Row({
  item,
  open,
  onToggle,
}: {
  item: (typeof volunteering)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div className="border-t border-rule">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group grid w-full gap-x-10 gap-y-2 py-7 text-left md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_auto]"
        >
          <span>
            <span className="block text-[1.05rem] font-medium leading-snug text-ink">
              {item.role}
            </span>
            <span className="mt-1.5 block text-[0.88rem] text-graphite">{item.org}</span>
          </span>

          <span className="self-center text-[0.97rem] leading-relaxed text-graphite">
            {item.summary}
          </span>

          <span className="flex items-center gap-5 self-center">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent">
              {item.period}
            </span>
            <span
              aria-hidden
              className={[
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                open
                  ? "rotate-180 border-accent bg-accent text-paper"
                  : "border-rule text-graphite group-hover:border-accent group-hover:text-accent",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 9l7 7 7-7" />
              </svg>
            </span>
          </span>
        </button>
      </h3>

      <div
        id={id}
        className={[
          "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-w-prose space-y-5 pb-9">
            {item.body.map((paragraph) => (
              <p key={paragraph} className="text-[1rem] leading-[1.75] text-graphite">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
