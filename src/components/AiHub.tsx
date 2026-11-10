import { useState } from "react";

import { aiWork } from "../data/content";
import { Icon } from "./icons";

/**
 * The AI work as a dial rather than a list: five nodes around a hub, each
 * opening its own panel.
 *
 * Every panel stays in the DOM. They are stacked in one grid cell and the
 * inactive ones are hidden with `visibility`, not unmounted — so the page is
 * still whole for a search engine, for find-in-page, and for anyone who
 * arrives before the JavaScript does. Stacking also means the block is always
 * as tall as its tallest panel, so switching nodes never jogs the page.
 *
 * The nodes are real buttons positioned on the circle, not SVG shapes with
 * click handlers: they tab, they take Enter and Space, and they carry their
 * own accessible names. The ring behind them is decoration.
 */

const COUNT = aiWork.length;
const RADIUS = 34;

/** Clockwise from the top. */
function nodeAt(i: number) {
  const angle = ((-90 + (360 / COUNT) * i) * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
}

export default function AiHub() {
  const [active, setActive] = useState(0);
  const here = nodeAt(active);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:items-center lg:gap-20">
      <div className="relative mx-auto aspect-square w-full max-w-[27rem]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="50" cy="50" r={RADIUS} className="fill-none stroke-rule" strokeWidth="0.35" />
          <line
            x1="50"
            y1="50"
            x2={here.x}
            y2={here.y}
            className="stroke-accent/50 transition-all duration-500"
            strokeWidth="0.4"
          />
          <circle cx="50" cy="50" r="15" className="fill-accent-soft/60 stroke-rule" strokeWidth="0.35" />
        </svg>

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent">
          <Icon name="ai" className="h-7 w-7" />
        </span>

        {aiWork.map((item, i) => {
          const at = nodeAt(i);
          const on = i === active;
          return (
            <button
              key={item.title}
              type="button"
              aria-pressed={on}
              aria-label={`${item.short}: ${item.title}`}
              onClick={() => setActive(i)}
              style={{ left: `${at.x}%`, top: `${at.y}%` }}
              className={[
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap",
                // The pills sit at a fixed percentage of the dial, so on a narrow
                // column the widest of them runs off the right edge. Smaller
                // below sm buys back the few pixels needed.
                "rounded-full border px-2.5 py-1.5 text-[0.78rem] transition-colors duration-300",
                "sm:px-3.5 sm:py-2 sm:text-[0.85rem]",
                on
                  ? "border-accent bg-accent text-paper"
                  : "border-rule bg-paper text-graphite hover:border-accent hover:text-accent",
              ].join(" ")}
            >
              <span className={on ? "font-mono text-[0.68rem] text-paper" : "font-mono text-[0.68rem] text-muted"}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.short}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {aiWork.map((item, i) => {
          const on = i === active;
          return (
            <article
              key={item.title}
              aria-hidden={!on}
              className={[
                "col-start-1 row-start-1 transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
                on ? "visible opacity-100" : "invisible opacity-0",
              ].join(" ")}
            >
              <p className="font-mono text-[0.8rem] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 max-w-[22ch] font-display text-[1.6rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[2rem]">
                {item.title}
              </h3>
              <p className="copy mt-6 max-w-prose text-[1.05rem]">{item.body}</p>

              {item.results.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2.5">
                  {item.results.map((result) => (
                    <li
                      key={result}
                      className="rounded-full border border-accent/30 bg-accent-soft/40 px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
