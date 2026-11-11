import { useEffect } from "react";

import Reveal from "./Reveal";
import pageMeta from "../data/pageMeta.json";

/**
 * Sets the document title and description for a route.
 *
 * The words live in data/pageMeta.json, not here, because the build reads the
 * same file to stamp them into each route's own HTML file — which is what a
 * link preview or a crawler sees, since neither runs this hook. A `null` title
 * is the home page, which takes the site's full title rather than a prefix.
 */
export function usePageMeta({
  title,
  description,
}: {
  title: string | null;
  description?: string;
}) {
  useEffect(() => {
    document.title = title ? `${title} — ${pageMeta.siteName}` : pageMeta.defaultTitle;
    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [title, description]);
}

/**
 * The standard page opening: the page's name at poster size, then an eyebrow,
 * title and optional lede under a rule. Without a title the poster word is the
 * whole header, and becomes the page's heading itself.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  className = "",
}: {
  eyebrow: string;
  title?: string;
  lede?: string;
  /** Optional figure for the space the headline leaves empty on the right. */
  aside?: React.ReactNode;
  /** Mostly for trimming the bottom padding on a header with no lede. */
  className?: string;
}) {
  const words = (
    <div>
      <p className="eyebrow animate-rise">[ {eyebrow} ]</p>
      <h1 className="mt-5 max-w-[20ch] animate-rise font-display text-[2.2rem] font-normal leading-[1.06] tracking-[-0.025em] md:text-[3.3rem]">
        {title}
      </h1>
      {lede && (
        <p className="copy mt-8 max-w-prose animate-rise text-[1.15rem] md:text-[1.25rem]">
          {lede}
        </p>
      )}
    </div>
  );

  const poster = "poster animate-rise text-[clamp(3.6rem,14.5vw,12rem)] text-ink";

  if (!title) {
    return (
      <header
        className={`mx-auto max-w-shell px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14 ${className}`}
      >
        <h1 className={poster}>
          {eyebrow}
          <span aria-hidden className="text-accent">
            .
          </span>
        </h1>
      </header>
    );
  }

  return (
    <header
      className={`mx-auto max-w-shell px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14 ${className}`}
    >
      {/* The page's name at poster size. The sentence below is the real
          heading; this is the cover it sits under, so it is hidden from
          screen readers rather than read out twice. */}
      <p aria-hidden className={poster}>
        {eyebrow}
        <span className="text-accent">.</span>
      </p>

      <div className="mt-10 border-t border-rule pt-10 md:mt-14 md:pt-14">
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
      </div>
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
          {eyebrow && (
            <div className="flex items-center gap-5">
              <p className="eyebrow shrink-0">{eyebrow}</p>
              <span aria-hidden className="h-px flex-1 bg-rule" />
            </div>
          )}
          {title && (
            <h2 className="mt-6 max-w-[24ch] font-display text-[1.9rem] font-normal leading-[1.1] tracking-[-0.02em] md:text-[2.7rem]">
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
