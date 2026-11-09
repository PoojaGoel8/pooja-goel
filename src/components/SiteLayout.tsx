import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { site } from "../data/content";
import { asset } from "../lib/asset";

const baseNav = [
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
      className="group flex items-baseline gap-2.5 font-display text-[1.3rem] font-medium leading-none tracking-tight"
    >
      <span>{site.name}</span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 translate-y-[-0.15rem] rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
      />
    </Link>
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
      window.scrollTo(0, 0);
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

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-5 md:px-10">
          <Monogram />

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative text-[0.95rem] transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
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
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
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
          <nav className="border-t border-rule px-6 pb-5 pt-2 md:hidden">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "block border-b border-rule/60 py-3 text-[1.05rem] last:border-0",
                    isActive ? "text-accent" : "text-graphite",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="rule-top mt-24 bg-shell">
        <div className="mx-auto max-w-shell px-6 py-14 md:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-2xl leading-tight">{site.name}</p>
              <p className="mt-1.5 text-[0.95rem] text-muted">
                {site.role} · {site.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
              <a
                href={asset(site.resume)}
                download
                className="inline-flex items-center gap-2 text-graphite underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Résumé
                <span aria-hidden>↓</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-graphite underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-graphite underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                LinkedIn
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-graphite underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Instagram
              </a>
            </div>
          </div>

          <p className="mt-12 text-[0.8rem] text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
