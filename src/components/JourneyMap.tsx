import { useState } from "react";

import { asset } from "../lib/asset";
import { journey, type JourneyEntry, type JourneyStop } from "../data/content";
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
      <circle cx={at.x} cy={at.y} r={40} fill="transparent" />
      {active && !onShape && (
        <circle cx={at.x} cy={at.y} r={13} className="fill-accent/20 [r:30px] sm:[r:13px]" />
      )}
      <circle cx={at.x} cy={at.y} r={6} className={`${dot} [r:16px] sm:[r:6px]`} strokeWidth={2} />
      <text
        x={at.x}
        y={at.y - 17}
        textAnchor="middle"
        className={[
          // The offset has to grow with the type below sm, or the bigger
          // mobile dot sits on top of its own label.
          "font-sans text-[43px] tracking-wide transition-colors [transform:translateY(-24px)]",
          "sm:text-[17px] sm:[transform:translateY(0px)]",
          label_,
        ].join(" ")}
      >
        {label}
      </text>
    </g>
  );
}

export default function JourneyMap() {
  const [active, setActive] = useState<Key>("australia");
  const stop = journey.find((s) => s.key === active) as JourneyStop;
  const split = stop.groups.length > 1;

  return (
    <div>
      {/*
        The map is decorative duplication of the buttons below it: a mouse can
        click a country, but everything it does is reachable from the real
        controls, so it stays out of the accessibility tree rather than
        becoming a second set of tab stops saying the same thing.
      */}
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full"
        aria-hidden="true"
        focusable="false"
      >
        {/* Keyed by position as well: a few Natural Earth shapes have no id. */}
        {countries.map((c, i) => {
          if (!c.key) {
            return (
              <path key={`${c.id}-${i}`} d={c.d} className="fill-rule/70 stroke-paper" strokeWidth={0.9} />
            );
          }

          const on = active === c.key;
          return (
            <path
              key={`${c.id}-${i}`}
              d={c.d}
              onClick={() => setActive(c.key as Key)}
              className={[
                "cursor-pointer stroke-paper transition-colors duration-300",
                on ? "fill-accent" : "fill-accent-soft hover:fill-accent/50",
              ].join(" ")}
              strokeWidth={0.9}
            />
          );
        })}

        {/* The route actually taken: Chennai, Melbourne, then Singapore. */}
        <path
          d={arc(waypoints.chennai, waypoints.melbourne)}
          className="fill-none stroke-accent/45"
          strokeWidth={1.8}
          strokeDasharray="7 9"
          strokeLinecap="round"
        />
        <path
          d={arc(waypoints.melbourne, points.singapore)}
          className="fill-none stroke-accent/45"
          strokeWidth={1.8}
          strokeDasharray="7 9"
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

      <div
        role="group"
        aria-label="Choose a place"
        className="mt-10 flex flex-wrap justify-center gap-2.5"
      >
        {journey.map((item) => {
          const on = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(item.key)}
              className={[
                "rounded-full border px-5 py-2.5 text-[0.95rem] transition-colors duration-300",
                on
                  ? "border-accent bg-accent text-paper"
                  : "border-rule text-graphite hover:border-accent hover:text-accent",
              ].join(" ")}
            >
              {item.label}
              <span className={on ? "ml-2.5 text-paper" : "ml-2.5 text-muted"}>
                {item.years}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-14 border-t border-rule pt-12">
        <div className="mx-auto max-w-prose text-center">
          <h3 className="font-display text-[1.6rem] font-normal leading-snug md:text-[1.9rem]">
            {stop.heading}
          </h3>
          <p className="copy mt-4 text-[1.02rem]">{stop.lede}</p>
        </div>

        {split ? (
          <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {stop.groups.map((group) => (
              <div key={group.title}>
                <h4 className="eyebrow mb-7">{group.title}</h4>
                <ul className="space-y-10">
                  {group.entries.map((entry) => (
                    <Entry key={entry.title} entry={entry} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* A single group is the whole panel, so its title would only repeat
             the heading above it. Its entries become the grid directly. */
          <ul className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
            {stop.groups[0].entries.map((entry) => (
              <Entry key={entry.title} entry={entry} boxed />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * `boxed` sets an entry in its own card. Singapore's entries are side-by-side
 * themes rather than a timeline, and without an edge each one ran into its
 * neighbour.
 */
function Entry({ entry, boxed = false }: { entry: JourneyEntry; boxed?: boolean }) {
  return (
    <li
      className={
        boxed
          ? "flex gap-4 rounded-[3px] border border-rule bg-shell p-6 md:p-8"
          : "flex gap-4"
      }
    >
      {/* The organisation is named in the line under the title, so the logo
          is decoration and stays out of the accessibility tree. */}
      {entry.logo && (
        <img
          src={asset(entry.logo)}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="mt-0.5 h-10 w-10 shrink-0 rounded-[6px] object-contain"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[1.05rem] font-medium leading-snug text-ink">{entry.title}</p>
        <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent">
          {entry.meta}
        </p>

        {entry.body && (
          <p className="mt-3.5 text-[0.97rem] leading-[1.72] text-graphite">{entry.body}</p>
        )}

        {/* Singapore's entries come in two halves, labelled so the reader can
            see where the market ends and the claim about her begins. */}
        {entry.market && (
          <div className="mt-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
              The market
            </p>
            <p className="mt-1.5 text-[0.97rem] leading-[1.72] text-graphite">{entry.market}</p>
          </div>
        )}

        {entry.fit && (
          <div className="mt-5 border-l-2 border-accent pl-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-accent">
              What I bring
            </p>
            <p className="mt-1.5 text-[0.97rem] leading-[1.72] text-ink">{entry.fit}</p>
          </div>
        )}

        {entry.points && (
          <ul className="mt-4 space-y-3">
            {entry.points.map((point) => (
              <li key={point} className="flex gap-3 text-[0.95rem] leading-[1.7] text-graphite">
                <span aria-hidden className="mt-[0.72em] h-px w-3.5 shrink-0 bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
