import { useState } from "react";

import { journey, type JourneyStop } from "../data/content";
import { MAP_HEIGHT, MAP_WIDTH, countries, points, waypoints } from "./mapPaths";

type Key = JourneyStop["key"];

/** A shallow arc between two points, bowed the short way round. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  // Push the control point out perpendicular to the line.
  const cx = mx + (dy / len) * len * 0.16;
  const cy = my - (dx / len) * len * 0.16;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

function Marker({
  at,
  label,
  active,
  onShape,
  onSelect,
}: {
  at: { x: number; y: number };
  label: string;
  active: boolean;
  /** True when the marker sits on a country that fills with accent when
   *  selected — then the label has to invert, or it is accent on accent. */
  onShape: boolean;
  onSelect: () => void;
}) {
  const label_ = active ? (onShape ? "fill-paper" : "fill-accent") : "fill-graphite";
  const dot = active
    ? onShape
      ? "fill-paper stroke-accent"
      : "fill-accent stroke-paper"
    : "fill-graphite stroke-paper";

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      {/* A generous invisible target: the visible dot is far too small to hit. */}
      <circle cx={at.x} cy={at.y} r={26} fill="transparent" />
      {active && !onShape && (
        <circle cx={at.x} cy={at.y} r={13} className="fill-accent/20 [r:20px] sm:[r:13px]" />
      )}
      <circle cx={at.x} cy={at.y} r={6} className={`${dot} [r:10px] sm:[r:6px]`} strokeWidth={2} />
      <text
        x={at.x}
        y={at.y - 17}
        textAnchor="middle"
        className={["font-sans text-[26px] tracking-wide transition-colors sm:text-[15px]", label_].join(" ")}
      >
        {label}
      </text>
    </g>
  );
}

export default function JourneyMap() {
  const [active, setActive] = useState<Key>("india");
  const stop = journey.find((s) => s.key === active) as JourneyStop;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
      <div>
        {/*
          The map is decorative duplication of the buttons below it: a mouse
          can click a country, but everything it does is reachable from the
          real controls, so it stays out of the accessibility tree rather than
          becoming a second set of tab stops saying the same thing.
        */}
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full"
          aria-hidden="true"
          focusable="false"
        >
          {countries.map((c) => {
            if (!c.key) {
              return (
                <path
                  key={c.id}
                  d={c.d}
                  className="fill-rule/70 stroke-paper"
                  strokeWidth={0.7}
                />
              );
            }

            const on = active === c.key;
            return (
              <path
                key={c.id}
                d={c.d}
                onClick={() => setActive(c.key as Key)}
                className={[
                  "cursor-pointer stroke-paper transition-colors duration-300",
                  on ? "fill-accent" : "fill-accent-soft hover:fill-accent/50",
                ].join(" ")}
                strokeWidth={0.7}
              />
            );
          })}

          {/* The route actually taken: Chennai, Melbourne, then Singapore. */}
          <path
            d={arc(waypoints.chennai, waypoints.melbourne)}
            className="fill-none stroke-accent/45"
            strokeWidth={1.4}
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
          <path
            d={arc(waypoints.melbourne, points.singapore)}
            className="fill-none stroke-accent/45"
            strokeWidth={1.4}
            strokeDasharray="5 6"
            strokeLinecap="round"
          />

          <Marker
            at={points.india}
            label="India"
            active={active === "india"}
            onShape
            onSelect={() => setActive("india")}
          />
          <Marker
            at={points.australia}
            label="Australia"
            active={active === "australia"}
            onShape
            onSelect={() => setActive("australia")}
          />
          <Marker
            at={points.singapore}
            label="Singapore"
            active={active === "singapore"}
            onShape={false}
            onSelect={() => setActive("singapore")}
          />
        </svg>
      </div>

      <div>
        <div role="group" aria-label="Choose a place" className="flex flex-wrap gap-2">
          {journey.map((item) => {
            const on = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(item.key)}
                className={[
                  "rounded-full border px-4 py-2 text-[0.9rem] transition-colors duration-300",
                  on
                    ? "border-accent bg-accent text-paper"
                    : "border-rule text-graphite hover:border-accent hover:text-accent",
                ].join(" ")}
              >
                {item.label}
                <span className={on ? "ml-2 text-paper/70" : "ml-2 text-muted"}>{item.years}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-9">
          <h3 className="font-display text-[1.45rem] font-normal leading-snug">{stop.heading}</h3>
          <p className="copy mt-3 max-w-prose text-[1rem]">{stop.lede}</p>

          <ul className="mt-8 space-y-7 border-t border-rule pt-8">
            {stop.entries.map((entry) => (
              <li key={entry.title}>
                <p className="text-[1.02rem] font-medium leading-snug text-ink">{entry.title}</p>
                <p className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent">
                  {entry.meta}
                </p>
                <p className="mt-3 text-[0.97rem] leading-[1.72] text-graphite">{entry.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
