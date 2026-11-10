import { useId, useState } from "react";

import Reveal from "../components/Reveal";
import { Copy, PageHeader, Pending, Section, usePageMeta } from "../components/Page";
import {
  alsoDelivered,
  caseStudies,
  recommendations,
  site,
  type CaseStudy,
} from "../data/content";

const isTodo = (line: string) => line.trimStart().startsWith("//");

/**
 * A section of a case study that opens on click.
 *
 * The body is always in the DOM — collapsed with a 0fr grid row rather than
 * unmounted — so it is still there for anyone reading the page with search,
 * with find-in-page, or without JavaScript having run. `visibility` is part of
 * the transition so it only flips to hidden once the row has finished closing;
 * hiding it immediately would cut the animation off, and leaving it visible
 * would let a keyboard land on links inside a shut panel.
 */
function Disclosure({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-t border-rule">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={[
              "eyebrow transition-colors duration-300",
              open ? "text-accent" : "group-hover:text-accent",
            ].join(" ")}
          >
            {label}
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
        </button>
      </h3>

      <div
        id={id}
        className={[
          // The clipping belongs on the child, not here: `overflow: hidden` on
          // the grid container gives it a definite block size, and the 1fr row
          // then resolves against zero and the panel never opens.
          "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-w-prose pb-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Outcomes({ outcome }: { outcome: CaseStudy["outcome"] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-rule py-8 lg:grid-cols-4">
      {outcome.map((item) => (
        <div key={item.label}>
          <dt className="font-display text-[2rem] font-normal leading-none tracking-[-0.02em]">
            {item.value}
          </dt>
          <dd className="mt-2.5 text-[0.85rem] leading-relaxed text-muted">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Study({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article id={study.slug} className="scroll-mt-28 border-t border-rule pt-12 md:pt-16">
      <Reveal>
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-[0.8rem] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="max-w-[22ch] font-display text-[1.9rem] font-normal leading-[1.12] tracking-[-0.01em] md:text-[2.7rem]">
            {study.title}
          </h2>
        </div>
        <p className="copy mt-6 max-w-prose text-[1.1rem]">{study.summary}</p>
      </Reveal>

      <Reveal className="mt-12 border-b border-rule">
        <Disclosure label="The situation">
          <Copy paragraphs={study.context} />
        </Disclosure>

        <Disclosure label="What I did">
          <ul className="space-y-4">
            {study.approach.map((line, i) =>
              isTodo(line) ? (
                <Pending key={i}>{line}</Pending>
              ) : (
                <li key={i} className="flex gap-3.5 text-[1.0625rem] leading-[1.7] text-graphite">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                  <span>{line}</span>
                </li>
              ),
            )}
          </ul>
        </Disclosure>
      </Reveal>

      <Reveal className="mt-14">
        <Outcomes outcome={study.outcome} />
      </Reveal>

      <Reveal className="mt-7">
        <ul className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-rule px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}

export default function Work() {
  usePageMeta(
    "Work",
    "Database migration, high availability and estate consolidation case studies — Azure, SQL Server and acquisition integration.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Migrations, availability, and the estate underneath both."
        lede="Two pieces of work in detail, because they are the ones where the decisions mattered more than the tooling. Everything here was delivered in a licensed wagering environment, where downtime is a commercial problem and a regulatory one at the same time."
      />

      <div className="mx-auto max-w-shell space-y-20 px-6 pb-8 md:space-y-28 md:px-10">
        {caseStudies.map((study, i) => (
          <Study key={study.slug} study={study} index={i} />
        ))}
      </div>

      <Section eyebrow="Also delivered" title="The rest of the record.">
        <div className="grid gap-px overflow-hidden rounded-[2px] bg-rule md:grid-cols-3">
          {alsoDelivered.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="flex h-full flex-col bg-paper p-7 md:p-8">
                <h3 className="font-display text-[1.2rem] font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-[1.7] text-graphite">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Recommendations />
    </>
  );
}

/** Renders nothing until there are real quotes to show. */
function Recommendations() {
  if (recommendations.length === 0) return null;

  return (
    <section id="recommendations" className="scroll-mt-28 bg-shell">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">Recommendations</p>
          <h2 className="mt-4 max-w-[24ch] font-display text-[1.9rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[2.5rem]">
            In other people's words.
          </h2>
        </Reveal>

        <div className="border-t border-rule">
          {recommendations.map((item) => (
            <Reveal key={item.name}>
              <figure className="grid gap-6 border-b border-rule py-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)] md:gap-14 md:py-14">
                <blockquote className="font-display text-[1.25rem] font-normal leading-[1.45] tracking-[-0.01em] text-ink md:text-[1.5rem]">
                  <span aria-hidden className="text-accent">
                    “
                  </span>
                  {item.quote}
                  <span aria-hidden className="text-accent">
                    ”
                  </span>
                </blockquote>

                <figcaption>
                  <p className="font-medium text-ink">{item.name}</p>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-graphite">{item.role}</p>
                  <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                    {item.relationship}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.95rem] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            More on LinkedIn
            <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
