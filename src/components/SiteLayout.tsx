import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import ContactMenu from "./ContactMenu";
import { SingaporeTime, StatusDot } from "./Console";
import { site } from "../data/content";
import { asset } from "../lib/asset";

/** In reading order. The header lists them all; the pager walks through them. */
const baseNav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/ai-enablement", label: "AI Enablement" },
  { to: "/experience", label: "Experience" },
  { to: "/studio", label: "Studio" },
];

const nav = baseNav;

function Monogram() {
  return (
    <Link
      to="/"
      className="group -my-2 flex items-baseline gap-2 py-2 font-poster text-[1.45rem] uppercase leading-none tracking-[0.01em]"
    >
      <span>{site.name}</span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
      />
    </Link>
  );
}

/**
 * Previous and next page, at the foot of every page and just above the
 * contact footer, so a reader who reaches the end has somewhere to go without
 * climbing back to the header. It wraps round: Studio leads back to Home.
 * Not shown on the not-found page, which has no place in the order.
 */
function Pager({ pathname }: { pathname: string }) {
  // A trailing slash is the same page: /work/ is /work.
  const path = pathname.replace(/\/+$/, "") || "/";
  const here = nav.findIndex((item) => item.to === path);
  if (here === -1) return null;

  const prev = nav[(here - 1 + nav.length) % nav.length];
  const next = nav[(here + 1) % nav.length];
  const number = (item: (typeof nav)[number]) => `0${nav.indexOf(item)}`;

  const card =
    "group flex h-full flex-col justify-between gap-6 bg-paper p-5 transition-colors duration-300 hover:bg-shell sm:p-7 md:p-9";
  const label =
    "whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent sm:text-[0.7rem]";
  const title =
    "font-poster text-[1.55rem] uppercase leading-[0.95] text-ink transition-colors duration-300 group-hover:text-accent sm:text-[2.2rem] md:text-[3rem]";

  return (
    <nav aria-label="More pages" className="mx-auto mt-16 w-full max-w-shell px-6 md:mt-24 md:px-10">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-rule bg-rule">
        <Link to={prev.to} rel="prev" className={card}>
          <span className={label}>
            <span aria-hidden className="mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Previous <span aria-hidden className="hidden text-accent sm:inline">· {number(prev)}</span>
          </span>
          <span className={title}>{prev.label}</span>
        </Link>
        <Link to={next.to} rel="next" className={`${card} items-end text-right`}>
          <span className={label}>
            Next <span aria-hidden className="hidden text-accent sm:inline">· {number(next)}</span>
            <span aria-hidden className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className={title}>{next.label}</span>
        </Link>
      </div>
    </nav>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);

    // A link that arrives with a hash — /studio#tutoring, say — wants that
    // section, not the top of the page. Children have already committed by the
    // time this runs, so the target is in the DOM.
    if (!hash) {
      // `instant` for the same reason as the hash branch below: a bare
      // scrollTo defers to the site-wide smooth scrolling, so a new page
      // would open part-way down the old one and travel to the top.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = hash.slice(1);
    // `instant`, not `auto`: `auto` defers to the CSS `scroll-behavior`, which
    // is smooth site-wide, and an animated jump gets interrupted part-way by
    // lazy images loading as it travels. A deep link should arrive, not travel.
    const align = () =>
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });

    align();

    // On a cold load the document is still growing — web fonts swap in and
    // images decode — which moves the target out from under that first jump.
    // Re-align once things settle, but stop the moment the reader takes over,
    // so the page never yanks itself out of their hands.
    let done = false;
    const realign = () => {
      if (!done) align();
    };
    const release = () => {
      done = true;
    };

    document.fonts?.ready.then(realign);
    window.addEventListener("load", realign, { once: true });
    const timer = window.setTimeout(release, 1200);

    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", release, opts);
    window.addEventListener("touchstart", release, opts);
    window.addEventListener("keydown", release, opts);

    return () => {
      done = true;
      window.clearTimeout(timer);
      window.removeEventListener("load", realign);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [pathname, hash]);

  // Escape closes the phone menu, the way it closes any other overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-4 md:px-10">
          <Monogram />

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    "relative font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span aria-hidden className="mr-1.5 text-accent">
                      0{i}
                    </span>
                    {item.label}
                    <span
                      aria-hidden
                      className={[
                        "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300",
                        isActive ? "w-full" : "w-0",
                      ].join(" ")}
                    />
                  </>
                )}
              </NavLink>
            ))}

            <a
              href={asset(site.resume)}
              download
              className="group rounded-full border border-rule px-4 py-1.5 text-[0.9rem] text-graphite transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Résumé
              <span
                aria-hidden
                className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>

            <ContactMenu />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={[
                "h-px w-5 bg-ink transition-transform duration-300",
                open ? "translate-y-[3px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-px w-5 bg-ink transition-transform duration-300",
                open ? "-translate-y-[3px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>

        {open && (
          // Capped to the screen and scrollable: with the contact topics open
          // the menu is taller than a short phone, and a sticky header does
          // not scroll with the page, so the last rows were out of reach.
          <nav
            id="mobile-nav"
            aria-label="Site"
            className="max-h-[calc(100dvh-4.85rem)] overflow-y-auto overscroll-contain border-t border-rule px-6 pb-5 pt-2 lg:hidden"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  [
                    "block border-b border-rule/60 py-3 font-poster text-[1.9rem] uppercase leading-tight last:border-0",
                    isActive ? "text-accent" : "text-graphite",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Stacked, not a flex row: the menu panel is full width and
                would otherwise be squeezed to the width of its button. */}
            <div className="mt-5 space-y-3">
              <a
                href={asset(site.resume)}
                download
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full border border-rule px-5 py-2 text-[1rem] text-graphite"
              >
                Résumé <span aria-hidden className="ml-1.5">↓</span>
              </a>

              <ContactMenu variant="stacked" onPick={() => setOpen(false)} />
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <Pager pathname={pathname} />

      <footer className="relative mt-16 overflow-hidden md:mt-20 border-t border-rule bg-shell">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 h-[26rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]"
        />
        <div className="relative mx-auto max-w-shell px-6 pb-10 pt-16 md:px-10 md:pt-24">
          <div className="flex items-center gap-5">
            <p className="eyebrow shrink-0">[ Contact ]</p>
            <span aria-hidden className="h-px flex-1 bg-rule" />
          </div>

          <p
            aria-hidden
            className="poster mt-8 text-[clamp(4.2rem,17vw,15rem)] text-ink"
          >
            Say hello<span className="text-accent">.</span>
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block break-all py-1.5 font-display text-[1.35rem] text-ink underline decoration-accent/50 decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent md:text-[2.2rem]"
          >
            {site.email}
          </a>

          <div className="mt-14 grid gap-8 border-t border-rule pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="flex flex-wrap gap-x-7 gap-y-1 font-mono text-[0.74rem] uppercase tracking-[0.12em]">
              <a
                href={asset(site.resume)}
                download
                className="py-1.5 text-graphite transition-colors hover:text-accent"
              >
                Résumé ↓
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="py-1.5 text-graphite transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="py-1.5 text-graphite transition-colors hover:text-accent"
              >
                Instagram ↗
              </a>
            </div>

            <p className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              <StatusDot />
              <span>
                {site.location} · <SingaporeTime />
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            <p>
              © {new Date().getFullYear()} {site.name} · {site.role}
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="py-1.5 transition-colors hover:text-accent"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
