import { useRef, useState } from "react";

import { volunteering } from "../data/content";
import { Icon } from "./icons";

/**
 * Volunteering as a list beside a panel, not an accordion.
 *
 * Expanding downward pushed the detail below the fold, so choosing a role
 * showed you nothing. The panel sits alongside instead and swaps in place.
 * On a narrow screen it falls under the list, where it can be below the
 * fold — so picking a role there nudges the page just far enough to bring
 * the top of the panel into view, and leaves the list on screen above it.
 *
 * All four panels stay in the DOM, stacked in one grid cell with the
 * inactive ones hidden by `visibility`. The page stays whole for a search
 * engine and for find-in-page, and the block is always as tall as its
 * tallest panel, so switching never moves the page under the reader.
 */

export default function Volunteering() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);

  const choose = (i: number) => {
    setActive(i);

    const top = panel.current?.getBoundingClientRect().top;
    if (top === undefined) return;

    // Only when the panel has not made it onto the screen. Side by side, or
    // already in view, this does nothing at all.
    const peek = 200;
    if (top > window.innerHeight - peek) {
      window.scrollBy({ top: top - (window.innerHeight - peek) });
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
      <div role="group" aria-label="Choose a role" className="space-y-2">
        {volunteering.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.role}
              type="button"
              aria-pressed={on}
              onClick={() => choose(i)}
              className={[
                "group flex w-full items-start gap-4 rounded-[3px] border px-4 py-4 text-left transition-colors duration-300",
                on
                  ? "border-accent/45 bg-accent-soft/40"
                  : "border-transparent hover:border-rule hover:bg-paper",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  on ? "bg-accent text-paper" : "bg-accent-soft/60 text-accent",
                ].join(" ")}
              >
                <Icon name={item.icon} className="h-[1.05rem] w-[1.05rem]" />
              </span>

              <span className="min-w-0">
                <span
                  className={[
                    "block text-[1.02rem] font-medium leading-snug transition-colors duration-300",
                    on ? "text-accent" : "text-ink",
                  ].join(" ")}
                >
                  {item.role}
                </span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-graphite">
                  {item.org}
                </span>
                <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
                  {item.period}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div ref={panel} className="grid">
        {volunteering.map((item, i) => {
          const on = i === active;
          return (
            <article
              key={item.role}
              aria-hidden={!on}
              className={[
                "col-start-1 row-start-1 transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
                on ? "visible opacity-100" : "invisible opacity-0",
              ].join(" ")}
            >
              <h3 className="max-w-[20ch] font-display text-[1.5rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[1.9rem]">
                {item.role}
              </h3>
              <p className="copy mt-5 max-w-prose text-[1.05rem]">{item.summary}</p>

              <div className="mt-6 max-w-prose space-y-5 border-t border-rule pt-6">
                {item.body.map((paragraph) => (
                  <p key={paragraph} className="text-[1rem] leading-[1.75] text-graphite">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
