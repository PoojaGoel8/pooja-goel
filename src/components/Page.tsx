import { useEffect } from "react";

import Reveal from "./Reveal";
import { site } from "../data/content";

/** Sets the document title and description for a route. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} — ${site.name}`;
    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [title, description]);
}

/** The standard page opening: eyebrow, title, and an optional lede. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Optional figure for the space the headline leaves empty on the right. */
  aside?: React.ReactNode;
  /** Mostly for trimming the bottom padding on a header with no lede. */
  className?: string;
}) {
  const words = (
    <div>
      <p className="eyebrow animate-rise">{eyebrow}</p>
      <h1 className="mt-5 max-w-[20ch] animate-rise font-display text-[2.6rem] font-normal leading-[1.08] tracking-[-0.015em] md:text-[3.9rem]">
        {title}
      </h1>
      {lede && (
        <p className="copy mt-8 max-w-prose animate-rise text-[1.15rem] md:text-[1.25rem]">
          {lede}
        </p>
      )}
    </div>
  );

  return (
    <header
      className={`mx-auto max-w-shell px-6 pb-14 pt-20 md:px-10 md:pb-20 md:pt-28 ${className}`}
    >
      {aside ? (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center lg:gap-16">
          {words}
          {/* Below lg the headline already has the full width, so the figure
              sits under it at a size that does not dominate the page. */}
          <div className="mx-auto w-full max-w-[22rem] animate-rise lg:max-w-none">{aside}</div>
        </div>
      ) : (
        words
      )}
    </header>
  );
}

/** A titled section with a hairline rule above it. */
export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-shell px-6 py-16 md:px-10 md:py-24 ${className}`}>
      {(eyebrow || title) && (
        <Reveal className="mb-12 md:mb-16">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && (
            <h2 className="mt-4 max-w-[24ch] font-display text-[1.9rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[2.6rem]">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}

/**
 * Marks copy that is still waiting on content. Renders only in development, so
 * a TODO can never reach the published site.
 */
export function Pending({ children }: { children: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span className="my-2 block rounded border border-dashed border-accent/50 bg-accent-soft/40 px-3 py-2 font-mono text-[0.78rem] leading-relaxed text-accent">
      {children.replace(/^\/\/\s*/, "")}
    </span>
  );
}

/** Renders a paragraph list, routing TODO markers to <Pending>. */
export function Copy({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="copy max-w-prose">
      {paragraphs.map((text, i) =>
        text.trimStart().startsWith("//") ? (
          <Pending key={i}>{text}</Pending>
        ) : (
          <p key={i} className={i === 0 ? "" : "mt-5"}>
            {text}
          </p>
        ),
      )}
    </div>
  );
}
