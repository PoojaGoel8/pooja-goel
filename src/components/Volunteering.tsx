import { useRef, useState } from "react";

import { volunteerOrgs, volunteering } from "../data/content";
import { asset } from "../lib/asset";

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
 *
 * The list is grouped by organisation under each one's logo, so the roles
 * read as "three at the university, one at STEM Sisters" rather than as a
 * single timeline.
 */

type OrgKey = keyof typeof volunteerOrgs;

/** The organisation's logo, or its initials in a badge of the same size. */
function OrgBadge({ org, className = "h-10 w-10" }: { org: OrgKey; className?: string }) {
  const { name, logo, initials } = volunteerOrgs[org];
  if (logo) {
    return (
      <img
        src={asset(logo)}
        alt={`${name} logo`}
        width={40}
        height={40}
        className={`${className} shrink-0 rounded-[6px] object-contain`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`${className} flex shrink-0 items-center justify-center rounded-[6px] bg-ink font-poster text-[0.95rem] uppercase text-paper`}
    >
      {initials}
    </span>
  );
}

/** Organisations in the order their first role appears in the data. */
const groups = volunteering.reduce<{ org: OrgKey; items: number[] }[]>((acc, item, i) => {
  const group = acc.find((g) => g.org === item.orgKey);
  if (group) group.items.push(i);
  else acc.push({ org: item.orgKey, items: [i] });
  return acc;
}, []);

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
      <div className="space-y-9">
        {groups.map(({ org, items }) => (
          <div key={org} role="group" aria-label={volunteerOrgs[org].name}>
            <div className="mb-3 flex items-center gap-3.5 border-b border-rule pb-3.5">
              <OrgBadge org={org} />
              <span className="font-display text-[1.1rem] leading-snug text-ink">
                {volunteerOrgs[org].name}
              </span>
            </div>

            <div className="space-y-1.5">
              {items.map((i) => {
                const item = volunteering[i];
                const on = i === active;
                return (
                  <button
                    key={item.role}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(i)}
                    className={[
                      "group block w-full rounded-[3px] border px-4 py-3.5 text-left transition-colors duration-300",
                      on
                        ? "border-accent/45 bg-accent-soft/40"
                        : "border-transparent hover:border-rule hover:bg-paper",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "block text-[1.02rem] font-medium leading-snug transition-colors duration-300",
                        on ? "text-accent" : "text-ink",
                      ].join(" ")}
                    >
                      {item.role}
                    </span>
                    {item.unit && (
                      <span className="mt-1 block text-[0.88rem] leading-snug text-graphite">
                        {item.unit}
                      </span>
                    )}
                    <span className="mt-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
                      {item.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
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
              <p className="flex items-center gap-3 text-[0.9rem] text-graphite">
                <OrgBadge org={item.orgKey} className="h-7 w-7" />
                <span>
                  {volunteerOrgs[item.orgKey].name}
                  {item.unit && <span className="text-muted"> · {item.unit}</span>}
                </span>
              </p>
              <h3 className="mt-5 max-w-[20ch] font-display text-[1.5rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[1.9rem]">
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

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                tabIndex={on ? undefined : -1}
                className="mt-8 inline-flex items-center gap-2 py-1.5 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-accent underline decoration-accent/40 underline-offset-[5px] transition-colors hover:decoration-accent"
              >
                {item.linkLabel}
                <span aria-hidden>↗</span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
